import Component from '@ember/component';
import { inject as service } from '@ember/service';
import GpxUploadHelper from '../utils/gpx-upload-helper';

export default Component.extend({
  alert: service(),
  loadingGpxData: false,
  gpxDataWasLoaded: false,

  didInsertElement() {
  },

  change: function (evt) {
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
      this.set('tour.mapGeoJson', geojson);
      this.set('loadingGpxData', false);
      this.set('gpxDataWasLoaded', true);
  },

  actions: {

    saveTour: function() {
      var self = this;
      this.get("tour").save().then(
          function() {
              self.set("havePendingOperations", false);
              self.get("router").transitionTo("tour", self.get("tour"));
          },
          function(error) {
              var status = error.status;
              if(status === 400) {
                  self.get("alert").showErrorMessage("Oh noes, there are validation errors, please try again. ");
              }
              else if(status === 401) {
                  self.get("login").removeToken();
                  self.get("alert").showErrorMessage("Oh noes, you have most likely been logged out. Try to log in again. ");
              }
              else {
                  self.get("alert").showErrorMessage("An error occured when saving the tour, please try again. ");
              }
              self.set("havePendingOperations", false);
          }
      );
    }
  }

});
