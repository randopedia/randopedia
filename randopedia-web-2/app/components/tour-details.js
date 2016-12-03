import Ember from 'ember';
import Fixtures from '../utils/fixtures';
import GeoHelper from '../utils/geo-helper';

export default Ember.Component.extend({
    login: Ember.inject.service(),
    language: Ember.inject.service(),
    alert: Ember.inject.service(),
    properties: Ember.inject.service(),

    actions: {
        viewTourOnMap: function() {
            this.get('properties').setTourForMapView(this.get('tour'));
            this.get('router').transitionTo('index');
        },
        downloadGpxFile: function () {
            var saveSuccess = GeoHelper.saveAsGpx(this.get("tour.mapGeoJson"), this.get("tour.name"), this.get("tour.itinerary"));
            if (!saveSuccess) {
                alert.showErrorMessage("Could not save gpx file. Most likely because your browser does not support the File API.");
            }
        }
    },

    summitPoint: Ember.computed('tour', function() {
        return GeoHelper.getSummitPoint(this.get("tour.mapGeoJson"));
    }),

    isPublished: Ember.computed('tour', function() {
        return this.get("tour.status") === Fixtures.TourStatus.PUBLISHED;
    }),

    isDraft: Ember.computed('tour', function() {
        return this.get("tour.status") === Fixtures.TourStatus.DRAFT;
    }),

    isInReview: Ember.computed('tour', function () {
        return this.get("tour.status") === Fixtures.TourStatus.IN_REVIEW;
    }),

    isDeleted: Ember.computed('tour', function() {
        return this.get("tour.status") === Fixtures.TourStatus.DELETED;
    }),

    hasImages: Ember.computed('tour', function(){
        if(!this.get("tour.images")){
            return false;
        }
        return this.get("tour.images.length") > 0;
    }),

    hasMapData: Ember.computed('tour', function () {
        return GeoHelper.validateGeoJson(this.get("tour.mapGeoJson"));
    }),

    hasPaths: Ember.computed('tour', function() {
        return GeoHelper.geojsonContainsPath(this.get("tour.mapGeoJson"));
    }),

    haveNoHazards: Ember.computed('tour', function() {
        return !this.get("tour.haveHazards");
    }),

    doesNotRequireTools: Ember.computed('tour', function() {
        return !this.get("tour.requiresTools");
    }),

    markedItinerary: Ember.computed('tour', function() {
        if(!this.get("tour.itinerary")){
            return null;
        }
        var linkedItinerary = this.get("tour.itinerary").replace(/#(\S*)/g,"<a href=\"/tags/$1\">#$1</a>");
        return marked(linkedItinerary);
    }),

    checkIfIncomplete: function() {
        return false;

        //var warningCount = 0;
        //if (!App.Validate.isNotNullOrEmpty(this.get("tour.shortDescription"))) { warningCount++; }
        //if (!this.get("tour.grade")) { warningCount++; }
        //if (!App.Validate.isPosNumber(this.get("tour.elevationMax"))) { warningCount++; }
        //if (!this.get("tour.timeOfYearFrom")) { warningCount++; }
        //if (!this.get("tour.timeOfYearTo")) { warningCount++; }
        //if (!GeoHelper.geojsonContainsPath(this.get("tour.mapGeoJson"))) { warningCount++; }
        //if (!GeoHelper.geojsonContainsSummitPoint(this.get("tour.mapGeoJson"))) { warningCount++; }
        //if (!App.Validate.lengthOrNull(this.get("tour.itinerary"), 100, 8000, false)) { warningCount++; }
        //this.set("isIncomplete", warningCount > 0);
    }
});
