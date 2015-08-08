var mongoose = require("mongoose");

var TourReviewCommentSchema = mongoose.Schema(
    {
        id: String,
        comment: String,
        userId: String,
        userName: String,
        time: Number,
        tour: String     
    },
    {
         collection: "tourReviewComment"
    }
);

module.exports = mongoose.model("TourReviewComment", TourReviewCommentSchema);