var mongoose = require("mongoose");
var tourModel = require("../models/tour");

var tourRepository = (function () {

    function getTour(tourId, callback) {

        tourModel.find({ clientId: tourId }, function (err, result) {
            if (err) {
                console.error(err);
            }
            
            if (callback) {
                if(result.length === 0) {
                    callback(null);
                    return;
                }
                var tour = result[0].toObject();
                tour.id = tour.clientId;
                callback( {tour: tour} );
            }
        });
    }

    return {
        get: getTour
    };

})();

module.exports = tourRepository; 