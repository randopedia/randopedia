import Ember from 'ember';

export default Ember.Controller.extend({
    alert: Ember.inject.service(),

    init: function() {
        var self = this;

        self._super();

        //var onWindowResize = function() {
        //    self.set('isSmallScreen', window.innerWidth < 768);
        //};

        //$(window).on('resize', onWindowResize);
        //onWindowResize();
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
        }
    },
});
