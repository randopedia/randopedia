var mongoose = require("mongoose");

var TourSchema = mongoose.Schema(
    {
        name: String,
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
//        mapPaths: DS.attr('raw'),
//        mapGeoJson: DS.attr('raw'),
//        tags: DS.attr('raw'),
//        portfolioImage: DS.belongsTo('image'),
        status: Number
    },
    {
         collection: "tour"
    }
);

module.exports = mongoose.model("Tour", TourSchema);