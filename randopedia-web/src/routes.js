App.Router.map(function() {
	this.resource('toplevels', function(){
        this.resource('toplevel', {path:':toplevel_id'});
	});
	this.resource('area-browse');
	this.resource('area', {path:'/areas/:area_id'});
	
	this.resource('tours');
	this.resource('tour', {path:'/tours/:tour_id'});
	this.resource('tour.edit', {path:'/tours/:tour_id/edit'});
	this.resource('tour.new', {path:'/tours/new'});
	
	this.resource('search');
	this.resource('about');
	this.resource('mytours');
	this.resource('tags');
	this.resource('tag', {path:'tags/:tag_id'});
	
	this.resource('stats');
});

App.BaseRoute = Ember.Route.extend({
    enter: function(router) {
        window.scrollTo(0, 0);
        this._super.apply(this, arguments);
    },
});

App.ApplicationRoute = Ember.Route.extend({
	setupController: function(controller, model){
        this.controllerFor('application').verifyLogin();
        this._super(controller, model);
    },
});

App.IndexRoute = App.BaseRoute.extend();

App.StatsRoute = App.BaseRoute.extend({
	model: function(params) {
		return this.store.find('stats', null);
	}
});

App.LoadingRoute = Ember.Route.extend();

App.AboutRoute = App.BaseRoute.extend();

App.MytoursRoute = App.BaseRoute.extend();

App.SearchRoute = Ember.Route.extend({
    setupController : function(controller, model){
        this._super(controller, model);
 
        if(!this.get('controller').get('query')){
            // Probably caused by a page refresh, would show empty search result so redirect to /index instead
            this.transitionTo('index');
        }
    },
});

App.TagsRoute = App.BaseRoute.extend({
    model : function() {
        return this.store.find('tag');
    }
});

App.TagRoute = App.BaseRoute.extend({
    setupController : function(controller, model){
        this._super(controller, model);

        model.reload();    
    },
    model : function(params) {
        return this.store.find('tag', params.tag_id);
    }
});

App.AreaRoute = App.BaseRoute.extend({
	model: function(params) {
        return this.store.find('area', params.area_id);
	},
    actions: {
        willTransition: function(transition) {
            var controller = this.get('controller');
            if(controller.get('isDirty')) {
                if(confirm('The area has unsaved changes, do you want to discard them?')){
                    controller.send('cancelEdit');
                    return true;
                } else {
                    transition.abort();   
                }
            }
            else {
                if(controller.get('editAreaMode')){
                    controller.send('cancelEdit');
                }
                return true;
            }
        }
    }	
});

App.AreaBrowseRoute = App.BaseRoute.extend({    
    model : function() {
        return this.store.find('toplevel');
    }
});

App.ToursRoute = App.BaseRoute.extend({
    model: function(){
        return this.store.find('tour');
    }
});

App.TourNewRoute = App.BaseRoute.extend({ 
    renderTemplate: function() {
       var controller = this.controllerFor('tourEdit');
       controller.set('model', this.get('controller').get('model'));
       this.render('tournew', { controller: controller });
    },
	model : function(params) {
        return this.store.createRecord('tour');
	}
});

App.TourEditRoute = App.BaseRoute.extend({
    renderTemplate: function() {
        this.render('touredit');
    },
	model: function(params) {
        return this.store.find('tour', params.tour_id);
	},
	beforeModel: function(transition) {
        //TODO: Prevent route if user not logged in  
	},
	actions: {
        willTransition: function(transition) {
            var controller = this.get('controller');
            if(controller.get('hasChanges')) {
                  if(confirm("The tour has unsaved changes, do you want to discard them?")){
                      controller.send('cancelEditTour');
                      return true;
                  } else { transition.abort(); }
            }
            else { return true; }
        }
    }
});

App.TourRoute = App.BaseRoute.extend({
    setupController : function(controller, model){
        this._super(controller, model);

        // When routing from the map, reload is needed since the tour is already loaded but with just a few properties set.
        // Just check itinerary (never loaded in the lite object), reload if null. TODO: What's the proper way to handle a situation like this?
        if(!model.get('itinerary')) {
            model.reload();    
        }
    },
    model: function(params){
        return this.store.find('tour', params.tour_id);
    }
});
