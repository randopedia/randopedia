import Ember from 'ember';

export default Ember.Controller.extend({
    alert: Ember.inject.service(),

    init: function() {
        var self = this;

        self._super();
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
