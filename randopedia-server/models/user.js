
var mongoose = require("mongoose");

var UserSchema = mongoose.Schema(
    {
        userName : String,
        userId : String,
        longLivedToken : String
    },
    {
         collection: "user"
    }
);

module.exports = mongoose.model("User", UserSchema);
