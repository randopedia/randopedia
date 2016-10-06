import Ember from 'ember';

export default Ember.Controller.extend({
    alert: Ember.inject.service(),

    init: function() {
        var self = this;
        
        self._super();
        self.loadTourItems();
        
        //var onWindowResize = function() {
        //    self.set('isSmallScreen', window.innerWidth < 768);
        //};
        
        //$(window).on('resize', onWindowResize);
        //onWindowResize();
    },
    
    loadTourItems: function() {
        var self = this;

        self.set('liteTours', []);
        // todo: ...
        //self.get('store').findQuery('tourItem', {}).then(function(tourItems) {
        //    self.set('liteTours', tourItems);
        //}, function(error) {
        //    alert.showErrorMessage('Error when loading tours');
        //});
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
            this.get("router").transitionTo("index");
        }
    },
});
