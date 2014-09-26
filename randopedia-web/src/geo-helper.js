App.GeoHelper = Ember.Object.create({
    
    validateGeoJson: function(geojson) {
        if(!geojson.features || geojson.features.length === 0) {
            return false;
        }
        if(!geojson.features[0].geometry) {
            return false;
        }    
        return true;
    },
    
    geoJsonCoordinatesToGoogleLatLngArray: function(coordinates) {
        var array = [];
        for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i];
            array.push(new google.maps.LatLng(coordinate[1], coordinate[0]));
        }    
        return array;
    },

    googleLatLngArrayToGeoJsonCoordinates: function(array) {
        var coordinates = [];
        array.forEach(function(latlng) {
            coordinates.push([latlng.lng(), latlng.lat()]);
        });
        return coordinates;
    },

    getGoogleObjectsFromTourGeoJson: function(geojson) {
        var mapObjects = [];
        if(!geojson || !App.GeoHelper.validateGeoJson(geojson)) {
            return mapObjects;
        } 
 
        for(var i = 0; i < geojson.features.length; i++) {
            
            var geometry = geojson.features[i].geometry;
            
            if(geometry.type === "LineString"){

                var polylinePath = App.GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);        
                var polyline = new google.maps.Polyline({
                    path:  polylinePath,
                    strokeColor: '#ff0000',
                    strokeWeight: 2
                });
                mapObjects.push(polyline);
            }
        }
        return mapObjects;
    },
});