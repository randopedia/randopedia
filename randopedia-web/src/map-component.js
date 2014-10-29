App.TourMapObject = {
    tourId: 0,
    marker: null,
    paths: null
};

App.BrowseTourmapComponent = Ember.Component.extend({
    mapRootElement: null,
    map: null,
    markers: [],
    tours: null,
    store: null,
    currentTourMapObjects: [],
    detailedZoomLevel: 13,
    showRoutesOnZoomLevel: 12,
    myPositionMarker: null,
    myPositionWatchId: null,
    selectedTour: null,

    didInsertElement: function() {
        if (!this.get('store')) {
            App.Utils.log('BrowseTourMap component needs a store, inject store=store');
            return;
        }

        if (!this.get('tours')) {
            App.Utils.log('BrowseTourMap component needs tours, inject tours=tours');
            return;
        }

        if (!this.get('zoomLevel')) {
            this.set('zoomLevel', 4);
        }

        if (!this.get('mapCenter')) {
            this.set('mapCenter', new google.maps.LatLng(58.0, 13.5));
        }

        this.addTourMarkers(this.get('tours'));
    },

    zoomAndHighlightTour: function(tour) {
        this.zoomToTour(tour);
        this.openInfoWindow(tour);
    },

    openInfoWindow: function (tour) {
        this.highlightTour(tour);
        this.set('selectedTour', tour);
    },

    closeInfoWindow: function() {
        this.unhighlightTour(this.get('selectedTour'));
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

    highlightTour: function (tour) {
        var self = this;
        var tourMapObject = self.findTourMapObject(tour);

        tourMapObject.paths.forEach(function(polyline) {
            polyline.setOptions({ strokeWeight: App.Fixtures.MapObjectStyles.SELECTED_PATH_WIDTH });
        });
    },

    unhighlightTour: function(tour) {
        var self = this;
        var tourMapObject = self.findTourMapObject(tour);

        tourMapObject.paths.forEach(function(polyline) {
            polyline.setOptions({ strokeWeight: App.Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH });
        });
    },

    zoomToTour: function (tour) {
        var self = this;

        var bounds = new google.maps.LatLngBounds();

        var tourMapObject = self.findTourMapObject(tour);

        tourMapObject.paths.forEach(function (polyline) {
            for (var j = 0; j < polyline.getPath().length; j++) {
                bounds.extend(polyline.getPath().getArray()[j]);
            }
        });
        
        self.get('map').fitBounds(bounds);
    },
    
    getDefaultTourCenterLatLng: function(geojson) {
        for(var i = 0; i < geojson.features.length; i++) {
            
            var geometry = geojson.features[i].geometry;
            
            if(geometry.type === "LineString"){
                var array = App.GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);
                return array[0];
            }
        }
        return null;
    },

    showTourRoutesIfZoomed: function(zoom) {
        if(zoom >= this.get('showRoutesOnZoomLevel')) {
            this.showTourRoutes();
        } else {
            this.hideTourRoutes();
        }
    },
    
    showTourRoutes: function() {
        var self = this;
        
        if(self.get('tourRoutesAreShown') === true) {
            return;
        }
        
        self.get('currentTourMapObjects').forEach(function (tourMapObject) {
            if (tourMapObject.paths) {
                tourMapObject.paths.forEach(function(polyline) {
                    polyline.setMap(self.get('map'));
                });
            }
        });
        
        self.set('tourRoutesAreShown', true);
    },
    
    hideTourRoutes: function() {
        var self = this;

        if(!self.get('tourRoutesAreShown')) {
            return;
        }
        
        self.get('currentTourMapObjects').forEach(function (tourMapObject) {
            if (tourMapObject.paths) {
                tourMapObject.paths.forEach(function(polyline) {
                    polyline.setMap(null);
                });
            }
        });
        
        self.set('tourRoutesAreShown', false);
    },

    showCurrentPosition: function() {
        var self = this;

        if (!navigator.geolocation) {
            App.Alerts.showErrorMessage('Cannot show your location, seems like your browser doesnt support geolocation.');
            return;
        }

        if (self.get('myPositionWatchId')) {            
            navigator.geolocation.clearWatch(self.get('myPositionWatchId'));
            self.set('myPositionWatchId', null);
        }

        self.set('waitingForPosition', true);
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var pinIcon = new google.maps.MarkerImage(
                'images/my_position_marker.png',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new google.maps.Size(40, 40));

            self.set('myPositionMarker', new google.maps.Marker({
                title: 'My position', 
                position: pos,
                map: self.get('map'),
                icon: pinIcon
            }));

            var html =
                '<div style="background-color:#fff;width:200px;height:100px">' +
                '<h4>My position</h4>' +
                '<p style="font-size:1.1em;">' +
                'Lat: ' + App.GeoHelper.roundCoordinate(pos.lat()) + '<br>' +
                'Lng: ' + App.GeoHelper.roundCoordinate(pos.lng()) +
                '</p>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({ content: html, maxWidth: 600 });

            google.maps.event.addListener(self.get('myPositionMarker'), 'click', function () {
                infowindow.open(self.get('map'), self.get('myPositionMarker'));
            });

            self.get('map').setCenter(pos);
            self.get('map').setZoom(self.get('detailedZoomLevel'));

            function onWatchPositionUpdate(newPosition) {
                self.get('myPositionMarker').set('position', new google.maps.LatLng(newPosition.coords.latitude, newPosition.coords.longitude));
            }

            var watchOptions = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 10000
            };

            var id = navigator.geolocation.watchPosition(onWatchPositionUpdate, null, watchOptions);
            self.set('myPositionWatchId', id);
            self.set('waitingForPosition', false);

        }, function(error) {
            App.Alerts.showErrorMessage('An error occured when trying to get your location');
            self.set('waitingForPosition', false);
        });
    },

    addTourMarkers: function(tours) {
        var self = this;
        self.set('markers', []);
        tours.forEach(function (tour) {

            if (!App.GeoHelper.validateGeoJson(tour.get('mapGeoJson'))) {
                return;
            }

            var tourPaths = [];
            var tourCenterLatLng = null;
            var mapObjects = App.GeoHelper.getGoogleObjectsFromTourGeoJson(tour.get('mapGeoJson'));
            mapObjects.forEach(function (mapObject) {
                if (mapObject.get('rando_type') === App.Fixtures.MapSymbolTypes.SUMMIT_POINT) {
                    tourCenterLatLng = mapObject.position;
                } else {
                    // Assume paths
                    tourPaths.push(mapObject);
                }
            });
            
            if (!tourCenterLatLng) {
                tourCenterLatLng = self.getDefaultTourCenterLatLng(tour.get('mapGeoJson'));
            }

            var marker = new google.maps.Marker({ title: tour.get('name'), position: tourCenterLatLng });

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
        this.set('mapRootElement', this.$('#tourMapRootElement'));

        var mapOptions = {
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                mapTypeControl: true,
                mapTypeControlOptions: {
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
                overviewMapControl:false,
                rotateControl:false,
                center: self.get('mapCenter'),
                zoom: self.get('zoomLevel'),
            };
            
        self.set('map', new google.maps.Map(this.get('mapRootElement').get(0), mapOptions));
        
        var markerCluster = new MarkerClusterer(this.get('map'), this.get('markers'));
        markerCluster.setMaxZoom(self.get('showRoutesOnZoomLevel') - 3);
        self.set('oms', new OverlappingMarkerSpiderfier(this.get('map')));

        google.maps.event.addListener(self.get('map'), 'zoom_changed', function() {
            var newZoomLevel = self.get('map').getZoom();
            self.showTourRoutesIfZoomed(newZoomLevel);
            self.sendAction('zoomChanged', newZoomLevel);
        });
        
        google.maps.event.addListener(self.get('map'), 'center_changed', function() {
            self.sendAction('centerChanged', self.get('map').getCenter());
        });
        
        // Hook up to window resize event to do implicit resize on map canvas
        var redrawMap = function() {
            google.maps.event.trigger(self.get('map'), 'resize');
        };
        
        $(window).on('resize', redrawMap); 
        
        if(this.get('tour')) {
            self.zoomAndHighlightTour(this.get('tour'));
        }
        
        self.showTourRoutesIfZoomed(self.get('map').getZoom());
        
    },
    
    showTourInfo: function() {
        return this.get('selectedTour') !== null;
    }.property('selectedTour'),

    actions: {
        toggleMyPosition: function() {
            this.showCurrentPosition();
        },
        closeInfoWindowAction: function () {
            this.closeInfoWindow();
        },
        zoomToSelectedTour: function() {
            this.zoomToTour(this.get('selectedTour'));
        }
    }
});
