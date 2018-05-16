var mongoose = require("mongoose");

var TourSchema = mongoose.Schema(
    {
        name: String,
        clientId: String,
        shortDescription: Object,
        elevationGain: Number,
        elevationLoss: Number,
        elevationMax: Number,
        timingMin: Number,
        timingMax: Number,
        grade: Number,
        haveHazards: Boolean,
        hazardsDescription: Object,
        degreesMax: String,
        requiresTools: Boolean,
        toolsDescription: Object,
        aspect: Number,
        timeOfYearFrom: Number,
        timeOfYearTo: Number,
        accessPoint: Object,
        accessPointElevation: Number,
        itinerary: Object,
        mapPaths: Object,
        mapGeoJson: Object,
        country: String,
        status: Number,
        isIncomplete: Boolean,
        tags: Object,
        tourImages: Object,
        portfolioImage: Object,
        actions: Object,
        comments: Object,
        updatedStamp: Date
    },
    {
         collection: "tour"
    }
);

module.exports = mongoose.model("Tour", TourSchema);
