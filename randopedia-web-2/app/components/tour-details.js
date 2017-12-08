import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import Fixtures from '../utils/fixtures';
import GeoHelper from '../utils/geo-helper';

export default Component.extend({
    login: service(),
    language: service(),
    alert: service(),
    properties: service(),

    actions: {
        viewTourOnMap: function() {
            this.set('properties.tourForMapView', this.get('tour'));
            this.get('router').transitionTo('index');
        },
        downloadGpxFile: function () {
            var saveSuccess = GeoHelper.saveAsGpx(this.get("tour.mapGeoJson"), this.get("tour.name"), this.get("language").translateProperty(this, "tour.itinerary"));
            if (!saveSuccess) {
                alert.showErrorMessage("Could not save gpx file. Most likely because your browser does not support the File API.");
            }
        }
    },

    markedDescription: computed('tour', function() {
        var desc = this.get("language").translateProperty(this, "tour.itinerary");       
        var descWithLinks = !desc ? "" : desc.replace(/#(\S*)/g,"<a href=\"/tags/$1\">#$1</a>");
        return marked(descWithLinks);
    }),

    accessPoint: computed('tour', function() {
        return this.get("language").translateProperty(this, "tour.accessPoint");
    }),

    hazardsDescription: computed('tour', function() {
        return this.get("language").translateProperty(this, "tour.hazardsDescription");
    }),

    toolsDescription: computed('tour', function() {
        return this.get("language").translateProperty(this ,"tour.toolsDescription");
    }),            

    summitPoint: computed('tour', function() {
        return GeoHelper.getSummitPoint(this.get("tour.mapGeoJson"));
    }),

    isPublished: computed('tour', function() {
        return this.get("tour.status") === Fixtures.TourStatus.PUBLISHED;
    }),

    isDraft: computed('tour', function() {
        return this.get("tour.status") === Fixtures.TourStatus.DRAFT;
    }),

    isInReview: computed('tour', function () {
        return this.get("tour.status") === Fixtures.TourStatus.IN_REVIEW;
    }),

    isDeleted: computed('tour', function() {
        return this.get("tour.status") === Fixtures.TourStatus.DELETED;
    }),

    hasImages: computed('tour', function(){
        if(!this.get("tour.images")){
            return false;
        }
        return this.get("tour.images.length") > 0;
    }),

    hasMapData: computed('tour', function () {
        return GeoHelper.validateGeoJson(this.get("tour.mapGeoJson"));
    }),

    hasPaths: computed('tour', function() {
        return GeoHelper.geojsonContainsPath(this.get("tour.mapGeoJson"));
    }),

    haveNoHazards: computed('tour', function() {
        return !this.get("tour.haveHazards");
    }),

    doesNotRequireTools: computed('tour', function() {
        return !this.get("tour.requiresTools");
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
