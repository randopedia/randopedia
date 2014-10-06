App.Fixtures.MapSymbolTypes = {
    UP_DOWN_TRACK: 10,
    UP_TRACK: 11,
    DOWN_TRACK: 12,
    SUMMIT_POINT: 20,
};

App.Fixtures.MapObjectStyles = {
    DEFAULT_PATH_WIDTH: 3,
    SELECTED_PATH_WIDTH: 5,
    DEFAULT_PATH_COLOR: '#990000',
    UP_PATH_COLOR: '#343434',
    DOWN_PATH_COLOR: '#EE0000',
    SELECTED_PATH_COLOR: 'blue'
};

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

    roundCoordinate: function(latOrLng) {
        return Math.round(latOrLng * 1000000) / 1000000;
    },
    
    getGeoJsonFromGoogleObjects: function (googleMapObjects) {

        // TODO: Currently only supporting polylines

        var geojson = {
            type: "FeatureCollection",
            features: []
        };

        for (var i = 0; i < googleMapObjects.length; i++) {
            var polyline = googleMapObjects[i];
            var polylinePath = polyline.getPath();

            geojson.features.push({
                type: "Feature",
                rando_type: polyline.get('rando_type'),
                geometry: {
                    type: "LineString",
                    coordinates: App.GeoHelper.googleLatLngArrayToGeoJsonCoordinates(polylinePath),
                }
            });
        }

        return geojson;
    },

    getGoogleObjectsFromTourGeoJson: function (geojson, makeEditable) {
        var self = this;
        var mapObjects = [];

        if (!geojson || !App.GeoHelper.validateGeoJson(geojson)) {
            return mapObjects;
        }

        for(var i = 0; i < geojson.features.length; i++) {

            var feature = geojson.features[i];
            var geometry = feature.geometry;

            if(geometry.type === "LineString"){
                var polylinePath = App.GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);
                var polyline = self.getGooglePolyline(polylinePath, feature.rando_type, makeEditable);
                mapObjects.push(polyline);
            }
        }
        return mapObjects;
    },

    getGooglePolyline: function (path, randoType, makeEditable) {
        if (!randoType) {
            randoType = App.Fixtures.MapSymbolTypes.UP_DOWN_TRACK;
        }

        var polyline;

        if (!makeEditable) {
            polyline = new google.maps.Polyline({
                path: path,
                clickable: false,
                draggable: false,
                editable: false,
                zIndex: 1,
                geodesic: true
            });
        } else {
            polyline = new google.maps.Polyline({
                path: path,
                clickable: true,
                draggable: true,
                editable: true,
                zIndex: 1,
                geodesic: true
            });
        }

        polyline.set('rando_type', randoType);
        polyline.setOptions({ strokeWeight: App.Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH });

        //var lineSymbol = {
        //    path: 'M 0,-0.5 0,0.5',
        //    strokeWeight: 2,
        //    strokeOpacity: 1,
        //    scale: 4
        //};
        
        //var icon = {
        //    icon: lineSymbol,
        //    offset: '100%',
        //    repeat: '20px'
        //};

        switch (randoType) {
            case App.Fixtures.MapSymbolTypes.UP_DOWN_TRACK:
                polyline.setOptions({
                     strokeColor: App.Fixtures.MapObjectStyles.DEFAULT_PATH_COLOR
                });
                break;
            case App.Fixtures.MapSymbolTypes.UP_TRACK:
                polyline.setOptions({
                    strokeColor: App.Fixtures.MapObjectStyles.UP_PATH_COLOR,
                });
                break;
            case App.Fixtures.MapSymbolTypes.DOWN_TRACK:
                polyline.setOptions({
                    strokeColor: App.Fixtures.MapObjectStyles.DOWN_PATH_COLOR,
                });
                break;
        }

        return polyline;
    }
});