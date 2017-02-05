
var mongoose = require("mongoose");

var UserSchema = mongoose.Schema(
    {
        userName : String,
        userId : String,
        provider: String,
        created: Number,
        lastLogin: Number,
        longLivedToken : String
    },
    {
         collection: "user"
    }
);

module.exports = mongoose.model("User", UserSchema);
