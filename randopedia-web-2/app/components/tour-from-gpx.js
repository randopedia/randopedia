import Component from '@ember/component';
import GpxUploadHelper from '../utils/gpx-upload-helper';
import togeojson from 'togeojson';
import moment from 'moment';

export default Component.extend({

  loadingGpxData: false,
  gpxDataWasLoaded: false,

  didInsertElement() {
    console.log('insert element', Object.keys(moment));
  },

  change: function (evt) {
      console.log('file upload event');
      this.set('loadingGpxData', true);
      if (window.File && window.FileReader && window.FileList && window.Blob) {
          var self = this;
          var input = evt.target;
          if (input.files) {
              for (var i = 0; i < input.files.length; i++) {
                  self.readFile(input.files[i]);
              }
          }
      } else {
          this.get("alert").showErrorMessage('Could not import gpx file. Most likely because your browser does not support the File API.');
      }
  },

  readFile: function (data) {
      let self = this;

      if (data) {
          var reader = new FileReader();
          reader.onloadend = function () {
              let geoJson = GpxUploadHelper.getGeoJSONFromReader(reader);
              self.importGeoJson(geoJson);
          };
          reader.readAsText(data);
      }
  },

  importGeoJson: function(geojson) {
      let self = this;

      if (!GpxUploadHelper.validateGeoJson(geojson)) {
          self.set('loadingGpxData', false);
          self.set('gpxDataIsInvalid', true);
          return;
      }
      console.log('gpx data was uploaded');
      this.set('loadingGpxData', false);
      this.set('gpxDataWasLoaded', true);
  }
});
