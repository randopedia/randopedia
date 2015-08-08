var mongoose = require("mongoose");

var TourActionSchema = mongoose.Schema(
    {
        id: String,
        time: Number,
        userId: String,
        userName: String,
        comment: String,
        type: Number,
        tourId: String
    },
    {
         collection: "tourAction"
    }
);

module.exports = mongoose.model("TourAction", TourActionSchema);