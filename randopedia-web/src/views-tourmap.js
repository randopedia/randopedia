App.TourEditMapView = Ember.View.extend({
    templateName: 'tourmapedit-view',
    mapRootElement: null,
    map: null,
    currentMapPolylines: [],
    drawingManager: null,
    selectedPolylines: [],
    mousePositionLat: null,
    mousePositionLng: null,
    
    didInsertElement: function() {
        this.initMap();
    },

    parseGeoJson: function () {
        var self = this;

        var tourMapObjects = App.GeoHelper.getGoogleObjectsFromTourGeoJson(self.get('controller.model.mapGeoJson'), true);

        tourMapObjects.forEach(function (mapObject) {
            self.setupPolylineListeners(mapObject);
            self.get('currentMapPolylines').push(mapObject);
            mapObject.setMap(self.get('map'));
        });
    },

    saveGeoJson: function () {
        var self = this;
        var geojson = App.GeoHelper.getGeoJsonFromGoogleObjects(self.get('currentMapPolylines'));
        self.get('controller').send('updateGeoJson', geojson);
    },

    setZoomAndCenter: function () {
        var lines = this.get('currentMapPolylines');

        if (!lines || lines.length === 0) { return; }

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < lines.length; i++) {
            for (j = 0; j < lines[i].getPath().length; j++) {
                bounds.extend(lines[i].getPath().getArray()[j]);
            }
        }

        this.get('map').fitBounds(bounds);
    },

    setMapSize: function () {
        var self = this;
        var newWidth = $('.mapContainer').width();
        var newHeight = 800;
        self.get('mapRootElement').css({ width: newWidth + 'px', height: newHeight + 'px' });
    },

    setDrawingMode: function (type) {
        var self = this;
        var dm = self.get('drawingManager');

        switch (type) {
            case App.Fixtures.MapSymbolTypes.UP_DOWN_TRACK:
                dm.polylineOptions.strokeColor = App.Fixtures.MapObjectStyles.DEFAULT_PATH_COLOR;
                dm.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
                break;
            case App.Fixtures.MapSymbolTypes.UP_TRACK:
                dm.polylineOptions.strokeColor = App.Fixtures.MapObjectStyles.UP_PATH_COLOR;
                dm.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
                break;
            case App.Fixtures.MapSymbolTypes.DOWN_TRACK:
                dm.polylineOptions.strokeColor = App.Fixtures.MapObjectStyles.DOWN_PATH_COLOR;
                dm.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
                break;
            case App.Fixtures.MapSymbolTypes.SUMMIT_POINT:
                dm.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
                break;
            default:
                dm.setDrawingMode(null);
                break;
        }
    },

    onPolylinePathChanged: function () {
        var self = this;
        if (!self.get('drawingManager')) {
            return;
        }
        self.get('drawingManager').setDrawingMode(null);
        self.saveGeoJson();
    },

    onPolylineClick: function (polyline) {
        var self = this;
        if (polyline.strokeColor === App.Fixtures.MapObjectStyles.SELECTED_PATH_COLOR) {
            switch (polyline.get('rando_type')) {
                case App.Fixtures.MapSymbolTypes.UP_DOWN_TRACK:
                    polyline.setOptions({ strokeColor: App.Fixtures.MapObjectStyles.DEFAULT_PATH_COLOR, strokeWeight: App.Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH });
                    break;
                case App.Fixtures.MapSymbolTypes.UP_TRACK:
                    polyline.setOptions({ strokeColor: App.Fixtures.MapObjectStyles.UP_PATH_COLOR, strokeWeight: App.Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH });
                    break;
                case App.Fixtures.MapSymbolTypes.DOWN_TRACK:
                    polyline.setOptions({ strokeColor: App.Fixtures.MapObjectStyles.DOWN_PATH_COLOR, strokeWeight: App.Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH });
                    break;
            }
            self.get('selectedPolylines').removeObject(polyline);
        } else {
            polyline.setOptions({ strokeColor: App.Fixtures.MapObjectStyles.SELECTED_PATH_COLOR, strokeWeight: App.Fixtures.MapObjectStyles.SELECTED_PATH_WIDTH });
            self.get('selectedPolylines').insertAt(0, polyline);
        }
    },

    setupPolylineListeners: function (polyline) {
        var self = this;
        var path = polyline.getPath();

        google.maps.event.addListener(path, 'set_at', function () {
            self.onPolylinePathChanged();
        });
        google.maps.event.addListener(path, 'insert_at', function () {
            self.onPolylinePathChanged();
        });
        google.maps.event.addListener(polyline, 'click', function () {
            self.onPolylineClick(this);
        });
    },

    addPolyline: function (polyline) {
        var self = this;
        self.get('currentMapPolylines').push(polyline);
        self.saveGeoJson();
    },

    actions: {
        clearDrawingMode: function() {
            this.get('drawingManager').setDrawingMode(null);
        },
        drawUpDownTrack: function () {
            this.setDrawingMode(App.Fixtures.MapSymbolTypes.UP_DOWN_TRACK);
        },
        drawUpTrack: function () {
            this.setDrawingMode(App.Fixtures.MapSymbolTypes.UP_TRACK);
        },
        drawDownTrack: function () {
            this.setDrawingMode(App.Fixtures.MapSymbolTypes.DOWN_TRACK);
        },
        drawSummitPoint: function () {
            this.setDrawingMode(App.Fixtures.MapSymbolTypes.SUMMIT_POINT);
        },
        deleteRoutes: function() {
            var self = this;
            self.get('selectedPolylines').forEach(function(line){
                line.setMap(null);
                var index = self.get('currentMapPolylines').indexOf(line);
                self.get('currentMapPolylines').splice(index, 1);
            });
            
            self.get('selectedPolylines').clear();
            
            self.saveGeoJson();
        }
    },

    isDeletePathsDisabled: function () {
        return !this.get('haveSelectedPaths');
    }.property('selectedPolylines.[]'),

    haveSelectedPaths: function () {
        return this.get('selectedPolylines').length > 0;
    }.property('selectedPolylines.[]'),

    initMap: function () {
        var self = this;

        self.set('currentMapPolylines', []);
        self.set('mapRootElement', self.$('#tourEditMapRootElement'));

        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            scaleControl: true,
            scaleControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scrollwheel: true,
            panControl: true,
            streetViewControl: false,
            overviewMapControl: false,
            rotateControl: false,
            center: new google.maps.LatLng(30.0, 13.5),
            zoom: 2,
        };

        self.set('map', new google.maps.Map(self.get('mapRootElement').get(0), mapOptions));

        self.get('map').setCenter(self.setZoomAndCenter());

        self.set('drawingManager', new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: []
            },
            polylineOptions: {
                strokeColor: App.Fixtures.MapObjectStyles.DEFAULT_PATH_COLOR,
                strokeWeight: App.Fixtures.MapObjectStyles.DEFAULT_PATH_WIDTH,
                editable: true,
                zIndex: 1,
                geodesic: true
            }
        }));

        self.get('drawingManager').setMap(self.get('map'));

        self.setMapSize();
        self.parseGeoJson();

        var redrawMap = function () {
            self.setMapSize();
            google.maps.event.trigger(self.get('map'), 'resize');
            self.setZoomAndCenter();
        };

        google.maps.event.addListener(self.get('drawingManager'), 'polylinecomplete', function (polyline) {

            if (polyline.strokeColor === App.Fixtures.MapObjectStyles.DEFAULT_PATH_COLOR) {
                polyline.set('rando_type', App.Fixtures.MapSymbolTypes.UP_DOWN_TRACK);
            } else if (polyline.strokeColor === App.Fixtures.MapObjectStyles.UP_PATH_COLOR) {
                polyline.set('rando_type', App.Fixtures.MapSymbolTypes.UP_TRACK);
            } else if (polyline.strokeColor === App.Fixtures.MapObjectStyles.DOWN_PATH_COLOR) {
                polyline.set('rando_type', App.Fixtures.MapSymbolTypes.DOWN_TRACK);
            }

            self.get('drawingManager').setDrawingMode(null);

            self.addPolyline(polyline);
            self.setupPolylineListeners(polyline);
        });

        google.maps.event.addListener(self.get('map'), 'mousemove', function (event) {
            self.set('mousePositionLat', App.GeoHelper.roundCoordinate(event.latLng.lat()));
            self.set('mousePositionLng', App.GeoHelper.roundCoordinate(event.latLng.lng()));
        });

        // Hook up to window resize event to do implicit resize on map canvas
        $(window).on('resize', redrawMap);
    },
});
