var mongoose = require("mongoose");

var UserSchema = mongoose.Schema(
    {
        name: String
    },
    {
         collection: "user"
    }
);

module.exports = mongoose.model("User", UserSchema);