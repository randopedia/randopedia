import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    properties: service(),

    actions: {
        mapZoomChanged: function(zoomLevel) {
            this.set('properties.zoomLevel', zoomLevel);
        },
        mapCenterChanged: function(centerLatLng) {
            this.set('properties.mapCenter', centerLatLng);
        },
        mapTypeIdChanged: function(mapTypeId) {
            this.set('properties.mapTypeId', mapTypeId);
        },       
        reloadTourItems: function() {
            this.set('model', this.get('store').findAll('tourItem'));
        }
    }
});
