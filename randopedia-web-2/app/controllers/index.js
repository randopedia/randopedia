import Ember from 'ember';

export default Ember.Controller.extend({
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
        reloadTourItems: function() {
            console.log("reloadTourItems");
            this.set('model', this.get('store').findAll('tourItem'));
        }
    }
});
