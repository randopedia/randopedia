import Ember from 'ember';
import Fixtures from '../utils/fixtures';
import GeoHelper from '../utils/geo-helper';

export default Ember.Component.extend({
    alert: Ember.inject.service(),
    properties: Ember.inject.service(),
    text: Ember.inject.service(),

    settings: {
        detailedZoomLevel: 13,
        showRoutesOnZoomLevel: 12,
        defaultMapCenter: new google.maps.LatLng(58.0, 13.5),
        defaultZoomLevel: 4,
        defaultMapTypeId: google.maps.MapTypeId.TERRAIN,
        mapRootElementId: '#tourMapRootElement'
    },

    mapRootElement: null,
    map: null,
    markers: [],
    tours: [],
    currentTourMapObjects: [],
    myPositionMarker: null,
    myPositionWatchId: null,
    selectedTour: null,
    showOnlySelectedToursPaths: false,
    isShowingPaths: false,

    didInsertElement() {
        this._super(...arguments);

        if (!this.get('zoomLevel')) {
            this.set('zoomLevel', this.settings.defaultZoomLevel);
        }

        if (!this.get('mapCenter')) {
            this.set('mapCenter', this.settings.defaultMapCenter);
        }

        if (!this.get('mapTypeId')) {
            this.set('mapTypeId', this.settings.defaultMapTypeId);
        }

        this.addTourMarkers(this.get('tours'));
    },

    zoomAndHighlightTour: function (tour) {
        this.zoomToTour(tour);
        this.openInfoWindow(tour);
    },

    openInfoWindow: function (tour) {
        this.highlightTour(tour);
        this.set('selectedTour', tour);
    },

    closeInfoWindow: function() {
        this.unhighlightTour(this.get('selectedTour'));
        this.set('showOnlySelectedToursPaths', false);
        this.toggleOtherToursPaths(); // Why isn't this triggered automatically by the observes statement?
        this.set('selectedTour', null);
    },

    toggleInfoWindow: function (tour) {
        // No selected tour, open
        if (!this.get('selectedTour')) {
            this.openInfoWindow(tour);
            return;
        }
        // Same tour as current selected, close
        if (this.get('selectedTour.id') === tour.get('id')) {
            this.closeInfoWindow();
            return;
        }
        // Close current and open new selected tour
        this.closeInfoWindow();
        this.openInfoWindow(tour);
    },

    findTourMapObject: function(tour) {
        var self = this;
        var tourObjects = self.get('currentTourMapObjects');

        for (var i = 0; i < tourObjects.length; i++) {
            if (tourObjects[i].tourId === tour.get('id')) {
                return tourObjects[i];
            }
        }
        return null;
    },

    highlightedPaths: [],

    highlightTour: function (tour) {
        var self = this;
        var tourMapObject = self.findTourMapObject(tour);

        tourMapObject.paths.forEach(function(polyline) {

            var path = polyline.getPath();

            var shadow = new google.maps.Polyline({
                path: path,
                strokeColor: 'yellow',
                strokeOpacity: 0.4,
                strokeWeight: 8
            });

            shadow.setMap(self.get('map'));

            self.get('highlightedPaths').push(shadow);
        });
    },

    unhighlightTour: function(tour) {
        var self = this;
        self.get('highlightedPaths').forEach(function (polyline) {
            polyline.setMap(null);
        });
        self.set('highlightedPaths', []);
    },

    zoomToTour: function (tour) {
        var self = this;
        var map = self.get("map");
        var tourMapObject = self.findTourMapObject(tour);

        GeoHelper.setMapTypeIfDefaultDiffersFromCurrent(map, tour.get("country"));

        if (tourMapObject.paths.length > 0) {
            var bounds = new google.maps.LatLngBounds();
            tourMapObject.paths.forEach(function (polyline) {
                for (var j = 0; j < polyline.getPath().length; j++) {
                    bounds.extend(polyline.getPath().getArray()[j]);
                }
            });
            map.fitBounds(bounds);

        } else if (tourMapObject.marker !== null) {
            map.setZoom(self.settings.detailedZoomLevel);
            map.setCenter(tourMapObject.marker.position);

        } else {
            map.setZoom(self.settings.defaultZoomLevel);
            map.setCenter(self.settings.defaultMapCenter);
        }
    },

    toggleOtherToursPaths: function () {
        var self = this;
        if (self.get('showOnlySelectedToursPaths')) {
            self.hideTourRoutes(true);
        } else {
            self.showTourRoutes();
        }
    }.observes('showOnlySelectedToursPaths'),

    getDefaultTourCenterLatLng: function(geojson) {
        for(var i = 0; i < geojson.features.length; i++) {

            var geometry = geojson.features[i].geometry;

            if(geometry.type === "LineString"){
                var array = GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);
                return array[0];
            }
        }
        return null;
    },

    showTourRoutesIfZoomed: function () {
        var self = this;

        if (self.get('isShowingPaths')) {
            if (!self.get('isPathsAlreadyShown')) {
                self.showTourRoutes();
            }
        } else {
            self.hideTourRoutes();
        }
    },

    showTourRoutes: function() {
        var self = this;
        if (!self.get('isShowingPaths')) {
            return;
        }
        self.get('currentTourMapObjects').forEach(function (tourMapObject) {
            if (!self.get('showOnlySelectedToursPaths') || (tourMapObject.tourId === self.get('selectedTour').get('id'))) {
                tourMapObject.paths.forEach(function (polyline) {
                    polyline.setMap(self.get('map'));
                });
            }
        });
        self.set('isPathsAlreadyShown', true);
    },

    hideTourRoutes: function(dontHideSelectedTour) {
        var self = this;
        self.get('currentTourMapObjects').forEach(function (tourMapObject) {
            if (!dontHideSelectedTour || (tourMapObject.tourId !== self.get('selectedTour').get('id'))) {
                tourMapObject.paths.forEach(function (polyline) {
                    polyline.setMap(null);
                });
            }
        });
        self.set('isPathsAlreadyShown', false);
    },

    showCurrentPosition: function() {
        var self = this;

        if (!navigator.geolocation) {
            self.get("alert").showErrorMessage('Cannot show your location, seems like your browser doesnt support geolocation.');
            return;
        }

        if(self.get('myPositionMarker')) {
            self.get('myPositionMarker').setMap(null);
            self.set('myPositionMarker', null);
        }

        if (self.get('myPositionWatchId')) {
            navigator.geolocation.clearWatch(self.get('myPositionWatchId'));
            self.set('myPositionWatchId', null);
        }

        self.set('waitingForPosition', true);
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var pinIcon = new google.maps.MarkerImage(
                '/assets/images/my_position_marker.png',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new google.maps.Size(40, 40));

            self.set('myPositionMarker', new google.maps.Marker({
                title: self.get('text').getText("map_myPosition"),
                position: pos,
                map: self.get('map'),
                icon: pinIcon
            }));

            var html =
                '<div style="background-color:#fff;width:200px;height:100px">' +
                '<h4>' + self.get('text').getText("map_myPosition") + '</h4>' +
                '<p style="font-size:1.1em;">' +
                'Lat: ' + GeoHelper.roundCoordinate(pos.lat()) + '<br>' +
                'Lng: ' + GeoHelper.roundCoordinate(pos.lng()) +
                '</p>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({ content: html, maxWidth: 600 });

            google.maps.event.addListener(self.get('myPositionMarker'), 'click', function () {
                infowindow.open(self.get('map'), self.get('myPositionMarker'));
            });

            self.get('map').setCenter(pos);
            self.get('map').setZoom(self.settings.detailedZoomLevel);

            function onWatchPositionUpdate(newPosition) {
                self.get('myPositionMarker').set('position', new google.maps.LatLng(newPosition.coords.latitude, newPosition.coords.longitude));
            }

            function onWatchPositionError(err) {
                var errMsg;

                if (err.code === 1) {
                    errMsg = "Access is denied.";
                    console.log("Location error: " + errMsg);

                } else if (err.code === 2) {
                    errMsg = "Position is unavailable.";
                    console.log("Location error: " + errMsg);

                } else {
                    errMsg = "Unknown error.";
                    console.log("Location error: " + errMsg);
                }

                self.get("alert").showErrorMessage(self.get('text').getText("error_getLocation") + " Error message: " + err.code + " - " + errMsg);
                self.set('waitingForPosition', false);
            }

            var watchOptions = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 10000
            };

            var id = navigator.geolocation.watchPosition(onWatchPositionUpdate, onWatchPositionError, watchOptions);
            self.set('myPositionWatchId', id);
            self.set('waitingForPosition', false);

        }, function(error) {
            console.log("Error when getting position: " + error);
            self.get("alert").showErrorMessage(self.get('text').getText("error_getLocation"));
            self.set('waitingForPosition', false);
        });
    },

    addTourMarkers: function(tours) {
        var self = this;
        self.set('markers', []);
        tours.forEach(function (tour) {

            if (!GeoHelper.validateGeoJson(tour.get('mapGeoJson'))) {
                return;
            }

            var tourPaths = [];
            var tourCenterLatLng = null;
            var mapObjects = GeoHelper.getGoogleObjectsFromTourGeoJson(tour.get('mapGeoJson'));
            mapObjects.forEach(function (mapObject) {
                if (mapObject.get('rando_type') === Fixtures.MapSymbolTypes.SUMMIT_POINT) {
                    tourCenterLatLng = mapObject.position;
                } else {
                    // Assume paths
                    tourPaths.push(mapObject);
                }
            });

            if (!tourCenterLatLng) {
                tourCenterLatLng = self.getDefaultTourCenterLatLng(tour.get('mapGeoJson'));
            }

            var markerImage = new google.maps.MarkerImage(
                'assets/images/skier-marker.png',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new google.maps.Size(50, 50));

            var marker = new google.maps.Marker({
                title: tour.get('name'),
                position: tourCenterLatLng,
                icon: markerImage
            });

            google.maps.event.addListener(marker, 'click', function () {
                self.toggleInfoWindow(tour);
            });

            self.get('currentTourMapObjects').push({
                tourId: tour.get('id'),
                marker: marker,
                paths: tourPaths
            });
            self.get('markers').push(marker);
        });

        self.initMap();
        $(window).resize();
    },

    initMap: function() {
        var self = this;
        self.set('mapRootElement', self.$(self.settings.mapRootElementId));

        var properties = this.get('properties');
        var tour = properties.getTourForMapView();

        var mapOptions = {
            mapTypeId: self.get("mapTypeId"),
            mapTypeControl: true,
            mapTypeControlOptions: {
                mapTypeIds: GeoHelper.mapTypeControlOptions,
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scaleControl: true,
            scaleControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scrollwheel: true,
            panControl: true,
            streetViewControl:false,
            overviewMapControl:true,
            rotateControl:false,
            center: self.get('mapCenter'),
            zoom: self.get('zoomLevel')
        };

        var map = new google.maps.Map(this.get('mapRootElement').get(0), mapOptions);
        GeoHelper.setMapTypes(map);
        self.set('map', map);

        var markerCluster = new MarkerClusterer(map, this.get('markers'));
        markerCluster.setMaxZoom(self.settings.showRoutesOnZoomLevel - 3);

        google.maps.event.addListener(map, 'zoom_changed', function () {
            var newZoomLevel = self.get('map').getZoom();

            self.set('isShowingPaths', newZoomLevel >= self.settings.showRoutesOnZoomLevel);
            self.showTourRoutesIfZoomed();
            self.sendAction('zoomChanged', newZoomLevel);
        });

        google.maps.event.addListener(map, 'center_changed', function () {
            self.sendAction('centerChanged', map.getCenter());
        });

        google.maps.event.addListener(map, 'maptypeid_changed', function () {
            self.sendAction('mapTypeIdChanged', map.getMapTypeId());
        });

        // Hook up to window resize event to do implicit resize on map canvas
        var redrawMap = function() {
            google.maps.event.trigger(map, 'resize');
        };

        $(window).on('resize', redrawMap);

        if (tour) {
            var defaultMapTypeForCountry = GeoHelper.getDefaultMapTypeIdForCountry(tour.get("country"));
            if (map.getMapTypeId() !== defaultMapTypeForCountry) {
                map.setMapTypeId(defaultMapTypeForCountry);
            }

            self.zoomAndHighlightTour(tour);

            properties.setTourForMapView(null);
        }

        self.showTourRoutesIfZoomed(map.getZoom());
        
    },

    showTourInfo: Ember.computed("selectedTour", function() {
        return this.get('selectedTour') !== null;
    }),

    actions: {
        toggleMyPositionAction: function() {
            this.showCurrentPosition();
        },
        closeInfoWindowAction: function () {
            this.closeInfoWindow();
        },
        zoomToSelectedTourAction: function() {
            this.zoomToTour(this.get('selectedTour'));
        }
    }
});
