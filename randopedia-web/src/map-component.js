App.BrowseTourmapComponent = Ember.Component.extend({
    mapRootElement: null,
    map: null,
    markers: [],
    mapInitialzed: false,
    tours: null,
    toursLoaded: false,
    store: null,
    root: null,
    
    didInsertElement: function() {
        if(!this.get('store')) {
            App.Utils.log('BrowseTourMap component needs a store, inject store=store');
            return;
        }
        
        if(!this.get('tours')) {
            App.Utils.log('BrowseTourMap component needs tours, inject tours=tours');
            return;
        }
        
        this.addTourMarkers(this.get('tours'));
    },
    
    getFirstLatLng: function(geojson) {
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
    
    addTourMarkers: function(tours) {
        var self = this;
        self.set('markers', []);
        tours.forEach(function(tour){

            var tourCenterLatLng = self.getFirstLatLng(tour.get('mapGeoJson'));
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
                        var bounds = new google.maps.LatLngBounds();
                        bounds.extend(marker.position);  
                        self.get('oms').addMarker(marker);
                        self.get('map').fitBounds(bounds);
                    });
                });
            });
            
            self.get('markers').push(marker);
        });

        this.initMap();
        $(window).resize();
    },
    
    setZoomAndCenter: function() {
        var markers = this.get('markers');

        if(!markers || markers.length === 0) { 
            return;
        }

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
                scrollwheel: true,
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

        // Hook up to window resize event to do implicit resize on map canvas
        redrawMap = function() {
            google.maps.event.trigger(self.get('map'), 'resize');
            self.setZoomAndCenter();
        };
        $(window).on('resize', redrawMap); 
        
        redrawMap();
        
        this.$('#tourMapRootElement').fadeIn(400);
        
        this.set('mapInitialzed', true);
    }
});
