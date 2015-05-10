var tourRepository = require("../repositories/tour-repository");

var tourService = (function () {

    function getTour(tourId, callback) {
        return tourRepository.get(tourId, function(tour) {
            if(callback) {
                callback(tour);
            }
        });
    }
    
    function getTourItems(callback) {
        return tourRepository.getTourItems(function(tourItems) {
            if(callback) {
                callback(tourItems);
            }
        });
    }    

    return {
        get: getTour,
        getTourItems: getTourItems
    };

})();

module.exports = tourService; 