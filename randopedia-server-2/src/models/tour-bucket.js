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
        status: Number,
        isIncomplete: Boolean,
        tags: Object,
        tourImages: Object,
        portfolioImage: Object,
        actions: Object,
        comments: Object,
        updatedStamp: Date
    }

);

var TourBucket = mongoose.Schema(
  {
    no: TourSchema,
    eng: TourSchema
  },
  {
       collection: "tour-bucket"
  }
)

module.exports = mongoose.model("TourBucket", TourBucket);
