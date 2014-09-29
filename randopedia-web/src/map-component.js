App.BrowseTourmapComponent = Ember.Component.extend({
    mapRootElement: null,
    map: null,
    markers: [],
    tours: null,
    store: null,
    currentMapObjects: [],
    detailedZoomLevel: 13,
    showRoutesOnZoomLevel: 12,
    
    didInsertElement: function() {
        if(!this.get('store')) {
            App.Utils.log('BrowseTourMap component needs a store, inject store=store');
            return;
        }
        
        if(!this.get('tours')) {
            App.Utils.log('BrowseTourMap component needs tours, inject tours=tours');
            return;
        }
        
        if(!this.get('zoomLevel')) {
            this.set('zoomLevel', 4);
        }
        
        if(!this.get('mapCenter')) {
            this.set('mapCenter', new google.maps.LatLng(58.0, 13.5));
        }
        
        this.addTourMarkers(this.get('tours'));
    },
    
    zoomToTour: function(tour) {

        var lines = this.get('currentMapPolylines');
        
        var tourMapObjects = App.GeoHelper.getGoogleObjectsFromTourGeoJson(tour.get('mapGeoJson'));

        if(!tourMapObjects) { 
            return; 
        }

        var bounds = new google.maps.LatLngBounds();
        
        tourMapObjects.forEach(function(mapObject) {
            for(j = 0; j < mapObject.getPath().length; j++){
                bounds.extend(mapObject.getPath().getArray()[j]);
            } 
        });
        
        this.get('map').fitBounds(bounds);
    },
    
    getTourCenterLatLng: function(geojson) {
        // TODO: This should get the tour centre/summit point (if not exits, do what we do now)
        
        if(!geojson || !geojson.features) {
            return null;
        }
        
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
        
        self.get('tours').forEach(function(tour) {
            var mapObjects = App.GeoHelper.getGoogleObjectsFromTourGeoJson(tour.get('mapGeoJson'));
            mapObjects.forEach(function(mapObject) {
                mapObject.setMap(self.get('map'));
                self.get('currentMapObjects').push(mapObject);
            });
        });
        
        self.set('tourRoutesAreShown', true);
    },
    
    hideTourRoutes: function() {
        var self = this;

        if(!self.get('tourRoutesAreShown')) {
            return;
        }
        
        self.get('currentMapObjects').forEach(function(mapObject) {
            mapObject.setMap(null);
        });
        self.set('currentMapObjects', []);
        self.set('tourRoutesAreShown', false);
    },

    showCurrentPosition: function() {
        var self = this;
        
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var image = 'images/my_position_marker.png';
                var marker = new google.maps.Marker({
                    title: 'My position', 
                    position: pos,
                    map: self.get('map'),
                    //icon: image
                });
                self.get('map').setCenter(pos);
                self.get('map').setZoom(self.get('detailedZoomLevel'));
          }, function(){});
        } else {
            // Browser doesn't support Geolocation
        }
    },

    addTourMarkers: function(tours) {
        var self = this;
        self.set('markers', []);
        tours.forEach(function(tour){

            var tourCenterLatLng = self.getTourCenterLatLng(tour.get('mapGeoJson'));
            if(!tourCenterLatLng){
                return;
            }

            var marker = new google.maps.Marker({ title: tour.get('name'), position: tourCenterLatLng });
            
            google.maps.event.addListener(marker, 'click', function() {
                var map = self.get('map');
                var html = 
                    '<div style="background-color:#fff;width:250px;height:100px">'+
                    '<h4><a style="font-size:0.9em;" href=#!/tours/'+ tour.get('id') + '>' + tour.get('name') + '</a></h4>' +
                    '<p style="font-size:1.1em;">' + 
                    App.Fixtures.resolveNameFromValue('Grades', tour.get('grade'))  + ' | ' +
                    tour.get('timingMin') + '-' + tour.get('timingMax') + 'h | ' +
                    tour.get('elevationGain') + 'm &uarr; ' + tour.get('elevationLoss') + 'm &darr;' +
                    '</p>' +
                    '<div style="margin-top:15px">' +
                    '<a id="zoomToTourLink" style="font-size:1.3em;">View on map</a>' +
                    '<a href=#!/tours/'+ tour.get('id') + ' style="font-size:1.3em;float:right">View tour details</a>' +
                    '</div>' +
                    '</div>';
                
                var infowindow = new google.maps.InfoWindow({ content: html, maxWidth: 600 });
                infowindow.open(map, marker);
                
                google.maps.event.addListener(infowindow,'domready',function(){
                    $('#zoomToTourLink').click(function() {
                        self.zoomToTour(tour);
                    });
                });
            });
            
            self.get('markers').push(marker);
        });

        this.initMap();
        $(window).resize();
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
        markerCluster.setMaxZoom(14);
        self.set('oms', new OverlappingMarkerSpiderfier(this.get('map')));

        google.maps.event.addListener(self.get('map'), 'zoom_changed', function() {
            var newZoomLevel = self.get('map').getZoom();
            
            self.showTourRoutesIfZoomed(newZoomLevel);
            
            self.sendAction('zoomChanged', newZoomLevel);
            
            console.log('Zoom level: ' + newZoomLevel);
        });
        
        google.maps.event.addListener(self.get('map'), 'center_changed', function() {
            self.sendAction('centerChanged', self.get('map').getCenter());
        });
        
        // Hook up to window resize event to do implicit resize on map canvas
        redrawMap = function() {
            google.maps.event.trigger(self.get('map'), 'resize');
        };
        
        $(window).on('resize', redrawMap); 
        
        if(this.get('tour')) {
            self.zoomToTour(this.get('tour'));
        }
        
        self.showTourRoutesIfZoomed(self.get('map').getZoom());
        
    },
    
    actions: {
        toggleMyPosition: function() {
            this.showCurrentPosition();
        }
    }
});
