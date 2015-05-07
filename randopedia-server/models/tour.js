var mongoose = require("mongoose");

var TourSchema = mongoose.Schema(
    {
        name: String
    },
    {
         collection: "tour"
    }
);

module.exports = mongoose.model("Tour", TourSchema);