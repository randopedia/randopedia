/**
 * View showing the tour map.
 */
App.TourMapView = Ember.View.extend({
    templateName: 'tourmap-view',
    mapRootElement: null,
    map: null,
    currentMapPolylines: null,
    
    didInsertElement: function() {
        this.initMap();
    },

    setMapSize: function() {
        var newWidth = $('.mapContainer').width();
        var newHeight = 500;
        if(newWidth < 600) { newHeight = 400; }
        if(newWidth < 500) { newHeight = 300; }
        this.get('mapRootElement').css({ width: newWidth + 'px', height: newHeight + 'px' });
    },
    
    parseGeoJson: function() {
        var self = this;
        var geojson = self.get('controller.model.mapGeoJson');
        if(!geojson || !App.GeoHelper.validateGeoJson(geojson)) {
            return;
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
                self.get('currentMapPolylines').push(polyline);
                polyline.setMap(self.get('map'));
            }
        }        
    },
    
    setZoomAndCenter: function() {
        var lines = this.get('currentMapPolylines');

        if(!lines || lines.length === 0) { 
            return; 
        }

        var bounds = new google.maps.LatLngBounds();
        for(var i = 0; i < lines.length; i++){
            for(j = 0; j < lines[i].getPath().length; j++){
                bounds.extend(lines[i].getPath().getArray()[j]);
            }     
        }
        
        this.get('map').fitBounds(bounds);
    },
    
    initMap: function() {
        var controller = this.get('controller');
        var self = this;

        this.set('currentMapPolylines', []);
        this.set('mapRootElement', this.$('#tourMapRootElement'));

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
                scrollwheel: false,
                panControl: true,
                streetViewControl:false,
                overviewMapControl:false,
                rotateControl:false,
                center: new google.maps.LatLng(30.0, 13.5),
                zoom: 2,
            };
            
        this.set('map', new google.maps.Map(this.get('mapRootElement').get(0), mapOptions));
        
        this.setMapSize();
        
        this.parseGeoJson();
        
        redrawMap = function() {
            self.setMapSize();
            google.maps.event.trigger(self.get('map'), 'resize');
            self.setZoomAndCenter();
        };

        // Fix for redraw map issue. Map is not drawn correctly after a transition
        redrawMap();
        
        // Hook up to window resize event to do implicit resize on map canvas
        $(window).on('resize', redrawMap);        
    }
});

/**
 * View showing an editable version of the tour map
 */
App.TourEditMapView = Ember.View.extend({
    templateName: 'tourmapedit-view',
    mapRootElement: null,
    map: null,
    currentMapPolylines: [],
    drawingManager: null,
    
    actions: {
        deleteRoutes: function() {
            this.get('controller').send('deletePaths');
            this.get('currentMapPolylines').forEach(function(line){
                line.setMap(null);
            });
            this.set('currentMapPolylines', []);
            this.send('closeDeleteRoutes');
        },
        
        closeDeleteRoutes: function() {
            $('#confirmDeleteRoutesReveal').foundation('reveal', 'close');
        }
    },
    
    didInsertElement: function() {
        this.initMap();
    },

    setMapSize: function() {
        var newWidth = $('.mapContainer').width();
        var newHeight = 500;
        if(newWidth < 600) { newHeight = 400; }
        if(newWidth < 500) { newHeight = 300; }
        this.get('mapRootElement').css({ width: newWidth + 'px', height: newHeight + 'px' });
    },
 
    parseGeoJson: function() {
        var self = this;
        
        var geojson = this.get('controller.model.mapGeoJson');
        
        if(!geojson || !App.GeoHelper.validateGeoJson(geojson)){ 
            return; 
        }
        
        var onPathChanged =  function (polyline){
            if(!self.get('drawingManager')){ 
                return; 
            }
            self.get('drawingManager').setDrawingMode(null);
            self.saveGeoJson();
        };

        for(var i = 0; i < geojson.features.length; i++) {
            
            var geometry = geojson.features[i].geometry;
            
            if(geometry.type === "LineString"){

                var polylinePath = App.GeoHelper.geoJsonCoordinatesToGoogleLatLngArray(geometry.coordinates);
                                
                var polyline = new google.maps.Polyline({
                    path:  polylinePath,
                    strokeColor: '#ff0000',
                    strokeWeight: 2,
                    clickable: true,
                    draggable: true,
                    editable: true,
                    zIndex: 1,
                    geodesic: true
                });
                
                var path = polyline.getPath();
                google.maps.event.addListener(path, 'set_at', onPathChanged); 
                google.maps.event.addListener(path, 'insert_at', onPathChanged); 

                this.get('currentMapPolylines').push(polyline);
                polyline.setMap(this.get('map'));
            }
        }
    },
    
    saveGeoJson: function() {
        var self = this;

        var geojson = {
            type: "FeatureCollection",
            features: []
        };
        
        for (var i = 0; i < this.get('currentMapPolylines').length; i++) {
            var polylinePath = this.get('currentMapPolylines')[i].getPath();
            
            geojson.features.push({
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: App.GeoHelper.googleLatLngArrayToGeoJsonCoordinates(polylinePath)
                }
            });
        }
        this.get('controller').send('updateGeoJson', geojson);
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
        this.set('mapRootElement', this.$('#tourMapRootElement'));

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
        
        redrawMap = function() {
            self.setMapSize();
            google.maps.event.trigger(self.get('map'), 'resize');
            self.setZoomAndCenter();
        };
 
        var onPathChanged =  function (polyline){
            self.get('drawingManager').setDrawingMode(null);
            self.saveGeoJson();
        };
        
        google.maps.event.addListener(self.get('drawingManager'), 'polylinecomplete', function(polyline){
            self.get('drawingManager').setDrawingMode(null);
            self.addPolyline(polyline);
            
            var path = polyline.getPath();
            google.maps.event.addListener(path, 'set_at', onPathChanged);
            google.maps.event.addListener(path, 'insert_at', onPathChanged);
        });

        // Fix for making sure the map is redrawn after the section panel containing the map has been activated by a click
        $("a[href='#mapPanel']").bind('click', function(){
            window.setTimeout(redrawMap, 10);
        });
        
        // Fix for redraw map issue. Map is not drawn correctly after a transition or when viewed in, for example, a Foundation section element.
        redrawMap();
       
        // Hook up to window resize event to do implicit resize on map canvas
        $(window).on('resize', redrawMap);        
    }
});
