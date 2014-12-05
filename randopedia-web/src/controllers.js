
App.IndexController = Ember.ObjectController.extend({
    needs: ['login'],
    isSmallScreen: true,
    liteTours: null,
    currentMapZoomLevel: null,
    currentMapCenter: null,
    tourForMapView: null,
    
    init: function() {
        this._super();
        
        var self = this;
        self.loadLiteTours();
        
        var onWindowResize = function() {
            self.set('isSmallScreen', window.innerWidth < 768);
        };
        
        $(window).on('resize', onWindowResize);
        onWindowResize();
    },
    actions: {
        mapZoomChanged: function(zoomLevel) {
            this.set('currentMapZoomLevel', zoomLevel);
        },
        mapCenterChanged: function(centerLatLng) {
            this.set('currentMapCenter', centerLatLng);
        },
        viewTourOnMap: function(tour){
            this.set('tourForMapView', tour);
            this.transitionToRoute('index');
        }
    },
    loadLiteTours: function() {
        var self = this;
        this.get('store').findQuery('tour', {liteTours: true}).then(function(tours) {
            self.set('liteTours', tours);
        }, function(error) {
            App.Alerts.showErrorMessage('Error when loading tours');
        });
    },
});

App.AboutController = Ember.ObjectController.extend();

App.ResultController = Ember.ArrayController.extend();

App.TagsController = Ember.ArrayController.extend();

App.BreadCrumbController = Ember.ObjectController.extend();
App.register('controller:breadCrumb', App.BreadCrumbController, {
    singleton : false
});

App.BreadCrumbItemController = Ember.ObjectController.extend();
App.register('controller:breadCrumbItem', App.BreadCrumbItemController, {
    singleton : false
});
