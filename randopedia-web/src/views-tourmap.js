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

    setPolylinesFromMapPaths: function() {
        var mapPaths = this.get('controller').get('mapPaths');
        if(!mapPaths){ return; }
        
        var self = this;
        
        for (var i = 0; i < mapPaths.length; i++) {
            var path = mapPaths[i];
            var polyline = [];

            for (var j = 0; j < path.length; j++) {
                var points = path[j];
                polyline.push(new google.maps.LatLng(points[0], points[1]));
            }
            
            var line = new google.maps.Polyline({
                path: polyline,
                strokeColor: '#ff0000',
                strokeWeight: 2,
            });
            
            this.get('currentMapPolylines').push(line);
            line.setMap(this.get('map'));
        }
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
        this.get('map').setCenter(self.setZoomAndCenter());
        this.setMapSize();
        this.setPolylinesFromMapPaths();
        
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

    setPolylinesFromMapPaths: function() {
        var mapPaths = this.get('controller.model.mapPaths');
        if(!mapPaths){ return; }
        
        var self = this;
        
        var onPathChanged =  function (polyline){
            if(!self.get('drawingManager')){ return; }
            self.get('drawingManager').setDrawingMode(null);
            self.savePolylinesToController();
        };
        
        for (var i = 0; i < mapPaths.length; i++) {
            var path = mapPaths[i];
            var polyline = [];

            for (var j = 0; j < path.length; j++) {
                var points = path[j];
                polyline.push(new google.maps.LatLng(points[0], points[1]));
            }
            
            var line = new google.maps.Polyline({
                path: polyline,
                strokeColor: '#ff0000',
                strokeWeight: 2,
                clickable: true,
                draggable: true,
                editable: true,
                zIndex: 1,
                geodesic: true
            });                

            var polylinePath = line.getPath();
            google.maps.event.addListener(polylinePath, 'set_at', onPathChanged); 
            google.maps.event.addListener(polylinePath, 'insert_at', onPathChanged); 

            this.get('currentMapPolylines').push(line);
            line.setMap(this.get('map'));
        }
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
    
    savePolylinesToController: function() {
        var rawArray = [];
        
        for (var i = 0; i < this.get('currentMapPolylines').length; i++) {
            var pathArray = this.get('currentMapPolylines')[i].getPath().getArray();
            rawArray[i] = [];
            for (var j = 0; j < pathArray.length; j++) {
                rawArray[i].push([pathArray[j].lat(), pathArray[j].lng()]);
            }
        }
        this.get('controller').send('updatePaths', rawArray);
    },
    
    addPolyline: function(polyline) {
        this.get('currentMapPolylines').push(polyline);
        this.savePolylinesToController();
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
        this.setPolylinesFromMapPaths();
        
        redrawMap = function() {
            self.setMapSize();
            google.maps.event.trigger(self.get('map'), 'resize');
            self.setZoomAndCenter();
        };
 
        var onPathChanged =  function (polyline){
            self.get('drawingManager').setDrawingMode(null);
            self.savePolylinesToController();
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

/**
 * View showing the clustered tour map
 */
App.TourClusterMapView = Ember.View.extend({
    templateName: 'tourclustermap-view',
    mapRootElement: null,
    map: null,
    markers: [],
    
    didInsertElement: function() {
        this.set('markers', []);
        if(this.get('controller.toursLoaded')){
            this.initTours();
        }
    },
    
    initTours: function() {
        console.log('initTours');
        if(!this.get('controller.toursLoaded')){ return; }
        
        var self = this;
        this.get('controller').get('tours').forEach(function(tour){
            var mapPaths = tour.get('mapPaths');
            if(!mapPaths) { return; }

            var mapPath = mapPaths[0];
            if(!mapPath) { return; }
            
            var firstLatLng = mapPath[0];
            if(!firstLatLng){ return; }

            var marker = new google.maps.Marker({title: tour.get('name'), position: new google.maps.LatLng(firstLatLng[0], firstLatLng[1])});
            
            google.maps.event.addListener(marker, 'click', function() {
                var contentString = 
                    '<div style="background-color:#FFF">'+
                    '<h4><a style="font-size:0.9em;" href=#!/tours/'+ tour.get('id') + '>' + tour.get('name') + '</a></h4>' +
                    '<p>' + 
                    App.Fixtures.resolveNameFromValue('Grades', tour.get('grade'))  + ' | ' +
                    tour.get('timingMin') + '-' + tour.get('timingMax') + 'h | ' +
                    tour.get('elevationGain') + 'm &uarr; ' + tour.get('elevationLoss') + 'm &darr;' +
                    '</p>' +
                    '</div>';
                
                var infowindow = new google.maps.InfoWindow({ content: contentString });
                infowindow.open(self.get('map'), marker);
            });
            
            self.get('markers').push(marker);
        });

        this.initMap();
        $(window).resize();
    },
    
    setMapSize: function() {
        var newWidth = $('.mapContainer').width();
        var newHeight = 500;
        if(newWidth < 600) { newHeight = 400; }
        if(newWidth < 500) { newHeight = 300; }
        this.get('mapRootElement').css({ width: newWidth + 'px', height: newHeight + 'px' });
    },
    
    setZoomAndCenter: function() {
        var markers = this.get('markers');

        if(!markers || markers.length === 0) { return; }

        var bounds = new google.maps.LatLngBounds();
        for(var i = 0; i < markers.length; i++){
            bounds.extend(markers[i].position);  
            this.get('oms').addMarker(markers[i]);
        }
        
        this.get('map').fitBounds(bounds);
    },
    
    initMap: function() {
        var self = this;
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
                center: new google.maps.LatLng(58.0, 13.5),
                zoom: 3,
            };
            
        this.set('map', new google.maps.Map(this.get('mapRootElement').get(0), mapOptions));
        var markerCluster = new MarkerClusterer(this.get('map'), this.get('markers'));
        markerCluster.setMaxZoom(10);
        this.set('oms', new OverlappingMarkerSpiderfier(this.get('map')));
        
        this.setMapSize();

        // Hook up to window resize event to do implicit resize on map canvas
        redrawMap = function() {
            self.setMapSize();
            google.maps.event.trigger(self.get('map'), 'resize');
            self.setZoomAndCenter();
        };
        $(window).on('resize', redrawMap); 
        
        redrawMap();
        
        this.$('#tourMapRootElement').fadeIn(400);
    }
});