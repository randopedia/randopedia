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

//        $(document).foundation('section', {
//            callback: function(){
//                // Hack to make sure content is loaded correctly, solves issue with Google Maps view not being rendered
//                $(window).resize();
//            }
//        });
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

            var firstLatLng = self.getFirstLatLng(tour.get('mapGeoJson'));
            if(!firstLatLng){
                return;
            }

            var marker = new google.maps.Marker({ title: tour.get('name'), position: firstLatLng });
            
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
//        var newWidth = $('.ember-application').width();
//        var newHeight =  $('.ember-application').height() - 50;
//        console.log('Height: ' + newHeight);
//        this.get('mapRootElement').css({ width: newWidth + 'px', height: newHeight + 'px' });
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
        
        this.set('mapInitialzed', true);
    }
});
