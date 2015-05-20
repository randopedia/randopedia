var tourRepository = require("../repositories/tour-repository");
var dataWasher = require("../helpers/data-washer");

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
        
        tour = dataWasher.washTour(tour);
        
        // todo: validate data
        
        // todo: get tags from itinerary
        
        // todo: find and set client id
        
        return tourRepository.saveTour(tour, function(tour) {
            
            // todo: resolve tour status and save action (history)
            
            if(callback) {
                callback(tour);
            }
        });
    }
    
    function updateTour(tour, callback) {
        
        tour = dataWasher.washTour(tour);
        
        // todo: validate data
        
        // todo: get tags from itinerary
                
        return tourRepository.saveTour(tour, function(tour) {
            
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
