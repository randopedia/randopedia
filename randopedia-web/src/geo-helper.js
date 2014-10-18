App.GeoHelper = Ember.Object.create({
    
    validateGeoJson: function(geojson) {
        if(!geojson) {
            return false;
        }
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

        var geojson = {
            type: "FeatureCollection",
            features: []
        };

        googleMapObjects.forEach(function(googleMapObject) {
            if (googleMapObject.get('rando_type') === App.Fixtures.MapSymbolTypes.SUMMIT_POINT) {
                geojson.features.push({
                    type: "Feature",
                    rando_type: googleMapObject.get('rando_type'),
                    properties: {name: "Summit point"},
                    geometry: {
                        type: "Point",
                        coordinates: [googleMapObject.position.lng(), googleMapObject.position.lat()],
                    }
                });
            } else {
                // Assume polyline type
                var polylinePath = googleMapObject.getPath();
                geojson.features.push({
                    type: "Feature",
                    rando_type: googleMapObject.get('rando_type'),
                    properties: {name: "Tour path"},
                    geometry: {
                        type: "LineString",
                        coordinates: App.GeoHelper.googleLatLngArrayToGeoJsonCoordinates(polylinePath),
                        
                    }
                });
            }
        });

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

            if(geometry.type === "LineString") {
                var polylinePath = App.GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);
                var polyline = self.getGooglePolyline(polylinePath, feature.rando_type, makeEditable);
                mapObjects.push(polyline);
            } else if (geometry.type === "Point") {
                var marker = self.getGoogleMarker(geometry.coordinates, feature.rando_type, makeEditable, 'Summit point');
                mapObjects.push(marker);
            }

        }
        return mapObjects;
    },

    getGoogleMarker: function (coordinates, randoType, makeDraggable, title) {
        if (!randoType) {
            randoType = App.Fixtures.MapSymbolTypes.SUMMIT_POINT;
        }

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(coordinates[1], coordinates[0]),
            draggable: makeDraggable,
            rando_type: randoType,
            title: title
        });

        return marker;
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

        this.setPolylineDefaultOptions(polyline, randoType);
        return polyline;
    },

    setPolylineDefaultOptions: function (polyline, pathSymbolType) {
        polyline.set('rando_type', pathSymbolType);
        polyline.setOptions({ strokeWeight: App.Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH });

        switch (pathSymbolType) {
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
    },

    saveAsGpx: function(geojson, name, description) {
        var gpx = togpx(geojson, {
            creator: 'randopedia.net',
            metadata: {
                author: 'randopedia.net',
                name: name,
                desc: description
            }
        });

        var blob = new Blob([gpx], { type: "text/plain;charset=utf-8" });
        saveAs(blob, name + ".gpx");
    }
});
