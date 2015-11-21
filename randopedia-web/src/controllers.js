
App.IndexController = Ember.ObjectController.extend({
    needs: ['login'],
    isSmallScreen: true,
    liteTours: null,
    currentMapZoomLevel: null,
    currentMapCenter: null,
    currentMapTypeId: null,
    tourForMapView: null,
    
    init: function() {
        this._super();
        
        var self = this;
        self.loadTourItems();
        
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
        mapTypeIdChanged: function(mapTypeId) {
            this.set('currentMapTypeId', mapTypeId);
        },
        viewTourOnMap: function(tour){
            this.set('tourForMapView', tour);
            this.transitionToRoute('index');
        }
    },
    loadTourItems: function() {
        var self = this;
        self.get('store').findQuery('tourItem', {}).then(function(tourItems) {
            self.set('liteTours', tourItems);
        }, function(error) {
            App.Alerts.showErrorMessage('Error when loading tours');
        });
    },
});

App.AboutController = Ember.ObjectController.extend();

App.ResultController = Ember.ArrayController.extend();

App.TagsController = Ember.ArrayController.extend();

App.DashboardController = Ember.ArrayController.extend({
    needs: ["login"]
});