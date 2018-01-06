import Fixtures from './fixtures';

var GeoHelper = {

    validateGeoJson: function(geojson) {
        if(!geojson) {
            return false;
        }
        if(!geojson.features || geojson.features.length === 0) {
            return false;
        }
        if (!geojson.features[0].geometry || geojson.features[0].geometry.length === 0) {
            return false;
        }

        // TODO: Add when all tours are updated
        //if (!geojson.features[0].properties || !geojson.features[0].properties.name) {
        //    return false;
        //}

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
            if (googleMapObject.get('rando_type') === Fixtures.MapSymbolTypes.SUMMIT_POINT) {
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
                        coordinates: GeoHelper.googleLatLngArrayToGeoJsonCoordinates(polylinePath),

                    }
                });
            }
        });

        return geojson;
    },

    getGoogleObjectsFromTourGeoJson: function (geojson, makeEditable) {
        var self = this;
        var mapObjects = [];

        if (!geojson || !GeoHelper.validateGeoJson(geojson)) {
            return mapObjects;
        }

        for(var i = 0; i < geojson.features.length; i++) {

            var feature = geojson.features[i];
            var geometry = feature.geometry;

            if(geometry.type === "LineString") {
                var polylinePath = GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);
                var polyline = self.getGooglePolyline(polylinePath, feature.rando_type, makeEditable);
                mapObjects.push(polyline);
            } else if (geometry.type === "Point" && feature.rando_type === Fixtures.MapSymbolTypes.SUMMIT_POINT) {
                var marker = self.getGoogleMarker(geometry.coordinates, feature.rando_type, makeEditable, 'Summit point');
                mapObjects.push(marker);
            }

        }
        return mapObjects;
    },

    getGoogleLPathsFromTourGeoJson: function(geojson) {
        var paths = [];

        if (!geojson || !GeoHelper.validateGeoJson(geojson)) {
            return paths;
        }

        for(var i = 0; i < geojson.features.length; i++) {
            var geometry = geojson.features[i].geometry;
            if(geometry.type === "LineString") {
                var path = GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);
                paths.push(path);
            }
        }
        return paths;
    },

    getGoogleMarker: function (coordinates, randoType, makeDraggable, title) {
        if (!randoType) {
            randoType = Fixtures.MapSymbolTypes.SUMMIT_POINT;
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
            randoType = Fixtures.MapSymbolTypes.UP_DOWN_TRACK;
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
        polyline.setOptions({ strokeWeight: Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH });

        switch (pathSymbolType) {
            case Fixtures.MapSymbolTypes.UP_DOWN_TRACK:
                polyline.setOptions({
                    strokeColor: Fixtures.MapObjectStyles.DEFAULT_PATH_COLOR
                });
                break;
            case Fixtures.MapSymbolTypes.UP_TRACK:
                polyline.setOptions({
                    strokeColor: Fixtures.MapObjectStyles.UP_PATH_COLOR,
                });
                break;
            case Fixtures.MapSymbolTypes.DOWN_TRACK:
                polyline.setOptions({
                    strokeColor: Fixtures.MapObjectStyles.DOWN_PATH_COLOR,
                });
                break;
        }
    },

    saveAsGpx: function (geojson, name, description) {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            return false;
        }

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
        return true;
    },

    // Removes all objects that are not LineString. Assumes valid geojson as input.
    cleanImportedGeoJson: function (geojson) {
        // TODO: Implement... :P
        return geojson;
    },

    // Validation helper methods

    geojsonContainsPath: function(geojson) {
        if (!GeoHelper.validateGeoJson(geojson)) {
            return false;
        }

        for (var i = 0; i < geojson.features.length; i++) {
            var feature = geojson.features[i];
            if (feature.geometry.type === "LineString") {
                return true;
            }
        }

        return false;
    },

    geojsonContainsSummitPoint: function (geojson) {
        if (!GeoHelper.validateGeoJson(geojson)) {
            return false;
        }

        for (var i = 0; i < geojson.features.length; i++) {
            var feature = geojson.features[i];
            if (feature.geometry.type === "Point" && feature.rando_type === Fixtures.MapSymbolTypes.SUMMIT_POINT) {
                return true;
            }
        }

        return false;
    },

    getSummitPoint: function (geojson) {
        if (!GeoHelper.validateGeoJson(geojson)) {
            return null;
        }

        for (var i = 0; i < geojson.features.length; i++) {
            var feature = geojson.features[i];
            if (feature.geometry.type === "Point" && feature.rando_type === Fixtures.MapSymbolTypes.SUMMIT_POINT) {
                return {
                    lng: feature.geometry.coordinates[0],
                    lat: feature.geometry.coordinates[1]
                };
            }
        }

        return null;
    },

    // Map types

    mapTypeControlOptions: [
        google.maps.MapTypeId.TERRAIN,
        google.maps.MapTypeId.SATELLITE,
        'osm',
        'norgeskart',
        'eniroair'
    ],

    setMapTypes: function(map) {
        map.mapTypes.set('osm', GeoHelper.mapTypes.osm());
        map.mapTypes.set('norgeskart', GeoHelper.mapTypes.norgeskart());
        map.mapTypes.set('eniroair', GeoHelper.mapTypes.eniroair());
    },

    getDefaultMapTypeIdForCountry: function(country) {
        if (country === "NOR") {
            return "norgeskart";
        }

        return google.maps.MapTypeId.TERRAIN;
    },

    setMapTypeIfDefaultDiffersFromCurrent: function (map, country) {
        var defaultType = GeoHelper.getDefaultMapTypeIdForCountry(country);
        if (defaultType !== map.getMapTypeId()) {
            map.setMapTypeId(defaultType);
        }
    },

    mapTypes: {
        osm: function() {
            return new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    var tilesPerGlobe = 1 << zoom;
                    var x = coord.x % tilesPerGlobe;
                    if (x < 0) {
                        x = tilesPerGlobe+x;
                    }
                    return "http://tile.opentopomap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                minZoom: 5,
                maxZoom: 15,
                name: "OpenTopoMap (Europe)",
            });
        },

        norgeskart: function() {
            return new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    return 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom=' + zoom + '&x=' + coord.x + '&y=' + coord.y;
                },
                tileSize: new google.maps.Size(256, 256),
                isPng: true,
                minZoom: 1,
                maxZoom: 20,
                name: 'Norgeskart (NOR)'
              });
        },

        eniroair: function() {
            return new google.maps.ImageMapType({
                getTileUrl : function(coord, zoom) {
                    var y = coord.y;
                    y = Math.pow(2, zoom) - y - 1;
                    return 'http://map01.eniro.no/geowebcache/service/tms1.0.0/aerial/'  + zoom + '/' + coord.x + '/' + y + '.jpeg';
                },
                tileSize: new google.maps.Size(256, 256),
                isPng: true,
                minZoom: 1,
                maxZoom: 20,
                name: 'Eniro aerial (NOR/SWE)'
            });
        },

        lantmateriet: function() {
            return new google.maps.ImageMapType({
                getTileUrl: function (/* tile , zoom */) {
                    /*
                    var projection = window.mapA.getProjection();
                    var zpow = Math.pow(2, zoom);
                    var ul = new google.maps.Point(tile.x * 256.0 / zpow, (tile.y + 1) * 256.0 / zpow);
                    var lr = new google.maps.Point((tile.x + 1) * 256.0 / zpow, (tile.y) * 256.0 / zpow);
                    var ulw = projection.fromPointToLatLng(ul);
                    var lrw = projection.fromPointToLatLng(lr);
                    //The user will enter the address to the public WMS layer here.  The data must be in WGS84
                    var baseURL = "http://sampleserver1.arcgisonline.com/arcgis/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer?&REQUEST=GetMap&SERVICE=WMS&VERSION=1.3&LAYERS="; //begining of the WMS URL ending with a "?" or a "&".
                    var format = "image%2Fjpeg"; //type of image returned  or image/jpeg
                    //The layer ID.  Can be found when using the layers properties tool in ArcMap
                    var layers = "0";
                    var srs = "EPSG:4326"; //projection to display. This is the projection of google map. Don't change unless you know what you are doing.
                    var bbox = ulw.lat() + "," + ulw.lng() + "," + lrw.lat() + "," + lrw.lng();
                    //Add the components of the URL together
                    var url = baseURL + layers + "&Styles=default" + "&SRS=" + srs + "&BBOX=" + bbox + "&width=256" + "&height=256" + "&format=" + format + "&BGCOLOR=0xFFFFFF&TRANSPARENT=true" + "&reaspect=false" + "&CRS=EPSG:4326";
                    return url;
                    */
                    var url = "http://maps-open.lantmateriet.se/open/topowebb-ccby/v1/wmts?request=GetTiles&version=1.0.0&service=wmts";
                    return url;
                },
                tileSize: new google.maps.Size(256, 256),
                opacity: 1,
                isPng: false,
                minZoom: 1,
                maxZoom: 20,
                name: 'SWE'
            });
        },
    }
};

export default GeoHelper;
