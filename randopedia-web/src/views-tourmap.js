/**
 * View showing an editable version of the tour map
 */
App.TourEditMapView = Ember.View.extend({
    templateName: 'tourmapedit-view',
    mapRootElement: null,
    map: null,
    currentMapPolylines: [],
    drawingManager: null,
    selectedPolylines: [],
    selectedStrokeColor: 'blue',
    mousePositionLat: null,
    mousePositionLng: null,
    
    actions: {
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
    
    isDeletePathsDisabled: function() {
        return !this.get('haveSelectedPaths');
    }.property('selectedPolylines.[]'),
    
    haveSelectedPaths: function() {
        return this.get('selectedPolylines').length > 0;
    }.property('selectedPolylines.[]'),
    
    didInsertElement: function() {
        this.initMap();
    },

    setMapSize: function() {
        var newWidth = $('.mapContainer').width();
        var newHeight = 800;
        this.get('mapRootElement').css({ width: newWidth + 'px', height: newHeight + 'px' });
    },
    
    onPolylinePathChanged: function (){
        var self = this;
        if(!self.get('drawingManager')){ 
            return; 
        }
        self.get('drawingManager').setDrawingMode(null);
        self.saveGeoJson();
    },
    
    onPolylineClick: function (polyline){
        var self = this;
        if(polyline.strokeColor === self.get('selectedStrokeColor')) {
            polyline.setOptions({strokeColor: '#ff0000', strokeWeight: 3});
            self.get('selectedPolylines').removeObject(polyline);
        } else {
            polyline.setOptions({strokeColor: self.get('selectedStrokeColor'), strokeWeight: 5}); 
            self.get('selectedPolylines').insertAt(0, polyline);
        }
    },
 
    setupPolylineListeners: function(polyline) {
        var self = this;
        var path = polyline.getPath();
        google.maps.event.addListener(path, 'set_at', function() {
            self.onPolylinePathChanged();
        }); 
        google.maps.event.addListener(path, 'insert_at', function() {
            self.onPolylinePathChanged();
        }); 
        google.maps.event.addListener(polyline, 'click', function() {
            self.onPolylineClick(this);
        });
    },
    
    parseGeoJson: function() {
        var self = this;
        
        var tourMapObjects = App.GeoHelper.getEditableGoogleObjectsFromTourGeoJson(self.get('controller.model.mapGeoJson'));

        tourMapObjects.forEach(function(mapObject) {
            self.setupPolylineListeners(mapObject);
            self.get('currentMapPolylines').push(mapObject);
            mapObject.setMap(self.get('map'));
        });
    },
    
    saveGeoJson: function() {
        var self = this;

        var geojson = {
            type: "FeatureCollection",
            features: []
        };

        for (var i = 0; i < self.get('currentMapPolylines').length; i++) {
            var polylinePath = self.get('currentMapPolylines')[i].getPath();
            
            geojson.features.push({
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: App.GeoHelper.googleLatLngArrayToGeoJsonCoordinates(polylinePath)
                }
            });
        }
        
        self.get('controller').send('updateGeoJson', geojson);
    },
    
    setZoomAndCenter: function() {
        var lines = this.get('currentMapPolylines');

        if(!lines || lines.length === 0) { return; }

        var bounds = new google.maps.LatLngBounds();
        for(var i = 0; i < lines.length; i++){
            for(j = 0; j < lines[i].getPath().length; j++){
                bounds.extend(lines[i].getPath().getArray()[j]);
            }     
        }
        
        this.get('map').fitBounds(bounds);
    },
    
    addPolyline: function(polyline) {
        this.get('currentMapPolylines').push(polyline);
        this.saveGeoJson();
    },
    
    initMap: function() {
        var controller = this.get('controller');
        var zoom = 14;
        var self = this;

        this.set('currentMapPolylines', []);
        this.set('mapRootElement', this.$('#tourEditMapRootElement'));

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
                streetViewControl:false,
                overviewMapControl:false,
                rotateControl:false,
                center: new google.maps.LatLng(30.0, 13.5),
                zoom: 2,
            };
            
        this.set('map', new google.maps.Map(this.get('mapRootElement').get(0), mapOptions));
        
        this.get('map').setCenter(self.setZoomAndCenter());
            
        this.set('drawingManager', new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [ google.maps.drawing.OverlayType.POLYLINE ]
            },
            polylineOptions: {
              strokeColor: '#ff0000',
              strokeWeight: 2,
              editable: true,
              zIndex: 1,
              geodesic: true
            }
        }));
            
        this.get('drawingManager').setMap(this.get('map'));
        this.setMapSize();
        this.parseGeoJson();
        
        var redrawMap = function() {
            self.setMapSize();
            google.maps.event.trigger(self.get('map'), 'resize');
            self.setZoomAndCenter();
        };
        
        google.maps.event.addListener(self.get('drawingManager'), 'polylinecomplete', function(polyline){
            self.get('drawingManager').setDrawingMode(null);
            self.addPolyline(polyline);
            self.setupPolylineListeners(polyline);
        });
        
        google.maps.event.addListener(self.get('map'), 'mousemove', function(event){
            self.set('mousePositionLat', App.GeoHelper.roundCoordinate(event.latLng.lat()));
            self.set('mousePositionLng', App.GeoHelper.roundCoordinate(event.latLng.lng()));
        });
       
        // Hook up to window resize event to do implicit resize on map canvas
        $(window).on('resize', redrawMap);        
    }
});
