import Service from '@ember/service';

export default Service.extend({
    zoomLevel: 4,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapCenter: new google.maps.LatLng(58.0, 13.5),
    tourForMapView : null
});
