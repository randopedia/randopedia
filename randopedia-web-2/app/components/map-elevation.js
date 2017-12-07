import Ember from 'ember';
import GeoHelper from '../utils/geo-helper';
import Fixtures from '../utils/fixtures';

export default Ember.Component.extend({
    zoomLevel: 13,
      
    didRender() {
        this._super(...arguments);

        var self = this;
        google.charts.load('visualization', '1', {packages: ['columnchart']});
        google.charts.setOnLoadCallback(function() {
            self.initMap();
        });
    },
    
    selectPathAndPlotElevation: function (path, elevator, map) {
        var self = this;

        if(self.get("currentSelectedPath")) {
            self.get("currentSelectedPath").setMap(null);
        }
        
        var shadow = new google.maps.Polyline({
            path: path,
            strokeColor: 'yellow',
            strokeOpacity: 0.4,
            strokeWeight: 8
        });
        shadow.setMap(map);
        self.set("currentSelectedPath", shadow);

        elevator.getElevationAlongPath({
            'path': path,
            'samples': 256

        }, self.plotElevation);
    },

    addPathToMap: function (path, elevator, map) {
        // todo: set strokeColor according to current path type like on browse map (up/down etc.)
        var polyline = new google.maps.Polyline({
            path: path,
            strokeColor: Fixtures.MapObjectStyles.DEFAULT_PATH_COLOR,
            map: map
        });

        var self = this;
        google.maps.event.addListener(polyline, 'click', function() {
            self.selectPathAndPlotElevation(path, elevator, map);
        });
    },

    plotElevation: function (elevations, status) {
        var rootChartDiv = document.getElementById('elevation_chart');

        if (status !== 'OK') {
          rootChartDiv.innerHTML = 'Cannot show elevation: request failed because ' + status;
          return;
        }

        var chart = new google.visualization.ColumnChart(rootChartDiv);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (var i = 0; i < elevations.length; i++) {
            data.addRow(['', elevations[i].elevation]);
        }

        chart.draw(data, {
            height: 200,
            legend: 'none',
            titleY: 'Elevation (m)'
        });
    },

    initMap: function() {
        var paths = GeoHelper.getGoogleLPathsFromTourGeoJson(this.get("tour.mapGeoJson"));
        var summitPoint = GeoHelper.getSummitPoint(this.get("tour.mapGeoJson"));
        
        var map = new google.maps.Map(document.getElementById('map_root'), {
            zoom: this.get("zoomLevel"),
            center: summitPoint,
            streetViewControl: false,
            rotateControl: false,
            mapTypeControl: false,
            mapTypeId: 'terrain'
        });


        //todo: Doesn't work for some reason...
        //GeoHelper.setMapTypeIfDefaultDiffersFromCurrent(map, this.get("tour.country"));

        var elevator = new google.maps.ElevationService;
        
        var self = this;
        paths.forEach(function(path) {
            self.addPathToMap(path, elevator, map);
        });

        var bounds = new google.maps.LatLngBounds();
        paths.forEach(function (path) {
            for (var j = 0; j < path.length; j++) {
                bounds.extend(path[j]);
            }
        });
        map.fitBounds(bounds);

        if(paths.length > 0) {
            self.selectPathAndPlotElevation(paths[0], elevator, map);
        }
    }
});
