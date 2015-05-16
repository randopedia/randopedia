var mongoose = require('mongoose');

var TagSchema = mongoose.Schema(
    {
        tag : String,
        value : Number,
        popularity : Number
    },
    {
        collection : "tag"
    }
);

module.exports = mongoose.model("Tag", TagSchema);
