var mongoose = require("mongoose");

var TourActionSchema = mongoose.Schema(
    {
        id: String,
        time: Number,
        tourId: String,
        userId: String,
        userName: String,
        type: Number,
        comment: String,
        tour: String
    },
    {
         collection: "tourAction"
    }
);

module.exports = mongoose.model("TourAction", TourActionSchema);