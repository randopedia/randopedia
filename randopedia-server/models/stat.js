var mongoose = require("mongoose");

var StatSchema = mongoose.Schema(
    {
        totalGain : Number,
        totalLoss : Number
    },
    {
        collection : 'stat'
    }
);

module.exports = mongoose.model("Stat", StatSchema);
