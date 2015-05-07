var mongoose = require("mongoose");
var tourModel = require("../models/tour");

var tourRepository = (function () {

    function getTour(tourId, callback) {

        tourModel.find({ clientId: tourId }, function (err, tour) {
            if (err) {
                console.error(err);
            }
            if (callback) {
                callback(tour);
            }
        });
    }

    return {
        get: getTour
    };

})();

module.exports = tourRepository; 