var mongoose = require("mongoose");

var TourSchema = mongoose.Schema(
    {
        name: String,
        clientId: String,
        shortDescription: String,
        elevationGain: Number,
        elevationLoss: Number,
        elevationMax: Number,
        timingMin: Number,
        timingMax: Number,
        grade: Number,
        haveHazards: Boolean,
        hazardsDescription: String,
        degreesMax: String,
        requiresTools: Boolean,
        toolsDescription: String, 
        aspect: Number,
        timeOfYearFrom: Number,
        timeOfYearTo: Number,
        accessPoint: String,
        accessPointElevation: Number,
        itinerary: String,
        mapPaths: Object,
        mapGeoJson: Object,
        country: String,
        tags: Object,
        tourImages: Object,
        portfolioImage: Object,
        status: Number,
        actions: Object,
        comments: Object,
        updatedStamp: Date
    },
    {
         collection: "tour"
    }
);

module.exports = mongoose.model("Tour", TourSchema);
