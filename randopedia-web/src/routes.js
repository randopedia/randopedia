App.Router.map(function() {    
    this.resource('tours');
    this.resource('tour', {path:'/tours/:tour_id'});
    this.resource('tour.edit', {path:'/tours/:tour_id/edit'});
    this.resource('tour.new', {path:'/tours/new'});
    
    this.resource('search');
    this.resource('about');
    this.resource('help');
    this.resource('mytours');
    this.resource('review');
    this.resource('tags');
    this.resource('tag', {path:'tags/:tag_id'});
    this.resource('dashboard');
    
    this.resource('stats');
});

App.BaseRoute = Ember.Route.extend({
    enter: function(router) {
        window.scrollTo(0, 0);
        this._super.apply(this, arguments);
    },
    afterModel : function(model) {
        if(typeof model !== 'undefined' && model !== null) {
            var tourName = model.get('name');
            if(typeof tourName !== 'undefined' && tourName !== null) {
                $(document).attr('title', tourName + ' - Randopedia - The ski tour database');
            } else {
                $(document).attr('title', 'Randopedia - The ski tour database');
            }

            $('head').append('<meta property="og:title" content="' + model.get('name') + '">' );
            var description = model.get('itinerary');
            if(description) {
                $('head').append('<meta property="og:description" content="' + description.replace(/"/g, "&quot;") + '">' );
            }
            $('head').append('<meta property="fb:app_id" content="' + App.Config.facebookAppIdProd + '">' );
            
        } else {
            $(document).attr('title', 'Randopedia - The ski tour database');
        }
    }
});

App.ApplicationRoute = Ember.Route.extend({
    beforeModel: function (transition) {
        if (transition.queryParams.lang) {
            App.language = transition.queryParams.lang;
        }
    },
    setupController: function (controller, model) {
        this.controllerFor('application').verifyLogin();
        this._super(controller, model);
    }
});

App.IndexRoute = App.BaseRoute.extend();

App.StatsRoute = App.BaseRoute.extend({
    model: function() {
        return this.store.find("stat");
    }
});

App.LoadingRoute = Ember.Route.extend();

App.AboutRoute = App.BaseRoute.extend();

App.HelpRoute = App.BaseRoute.extend();

App.MytoursRoute = App.BaseRoute.extend();

App.ReviewRoute = App.BaseRoute.extend();

App.TagsRoute = App.BaseRoute.extend({
    model : function() {
        return this.store.find('tag');
    }
});

App.DashboardRoute = App.BaseRoute.extend({
    setupController : function(controller, model) {
        this._super(controller, model);
        controller.set('tags', this.store.find('tag'));
        controller.set('stat', this.store.find('stat', 1));
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

App.ToursRoute = App.BaseRoute.extend({
    model: function(){
        return this.store.find("tour");
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
    },
    actions: {
        willTransition: function(transition) {
            var controller = this.get('controller');           
            if(controller.get('isDirty') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
                transition.abort(); 
            } else { 
                return true;
            }
        }
    }    
});

App.TourEditRoute = App.BaseRoute.extend({
    renderTemplate: function() {
        this.render('touredit');
    },
    model: function(params) {
        return this.store.find('tour', params.tour_id);
    },
    setupController : function(controller, model) {
        this._super(controller, model);
        controller.set('allTags', this.store.find('tag'));
    },
    beforeModel: function(transition) {
        //TODO: Prevent route if user not logged in  
    },
    actions: {
        willTransition: function(transition) {
            var controller = this.get('controller');
            
            if(controller.get('hasChanges') && !confirm("The tour has unsaved changes, do you want to discard them?")) {
                transition.abort(); 
            
            } else {
               controller.send('cancelEditTour');
               return true;
            }
        }
    }
});

App.TourRoute = App.BaseRoute.extend({
    setupController : function(controller, model){
        this._super(controller, model);
        this.controllerFor('application').set('showNavbarSearch', false);
    },
    model: function(params){
        return this.store.find('tour', params.tour_id);
    }
});
