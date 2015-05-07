var tourRepository = require("../repositories/tour-repository");

var tourService = (function () {

    function getTour(tourId, callback) {
        return tourRepository.get(tourId, function(tour) {
            if(callback) {
                callback(tour);
            }
        });
    }

    return {
        get: getTour
    };

})();

module.exports = tourService; 