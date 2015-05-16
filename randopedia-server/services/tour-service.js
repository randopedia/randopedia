var tourRepository = require("../repositories/tour-repository");

var tourService = (function () {

    function getTour(tourId, callback) {
        return tourRepository.getTour(tourId, function(tour) {
            if(callback) {
                callback(tour);
            }
        });
    }
    
    function getTours(conditions, callback) {
        
        // todo: handle conditions (status etc.)
        
        return tourRepository.getTours(function(tours) {
            if(callback) {
                callback(tours);
            }
        });
    }
        
    function createTour(tour, callback) {
        
        // todo: wash data
        
        // todo: validate data
        
        // todo: get tags from itinerary
        
        return tourRepository.saveTour(tour, function(tour) {
            
            // todo: resolve tour status and save action (history)
            
            if(callback) {
                callback(tour);
            }
        });
    }
    
    function updateTour(tourId, callback) {
        
        // todo: wash data
        
        // todo: validate data
        
        // todo: get tags from itinerary
                
        return tourRepository.saveTour(tourId, function(tour) {
            
            // todo: resolve tour status and save action (history)
            
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
        getTour: getTour,
        getTours: getTours,
        createTour: createTour,
        updateTour: updateTour,
        getTourItems: getTourItems
    };

})();

module.exports = tourService; 