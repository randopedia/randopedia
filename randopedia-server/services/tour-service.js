var tourRepository = require("../repositories/tour-repository");
var dataWasher = require("../helpers/data-washer");
var Q = require('q');

var tourService = (function () {

    function getTour(tourId, callback) {
        tourRepository.getTour(tourId).then(function(tour) {
            if(callback) {
                callback(tour);
            }
        }).catch(function(error) {
            console.log(error);
        });
    }
    
    function getTours(conditions, callback) {
        
        // todo: handle conditions (status etc.)
        
        tourRepository.getTours().then(function(tours) {
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
        
        tourRepository.saveTour(tour).then(function(tour) {
            
            // todo: resolve tour status and save action (history)
            
            if(callback) {
                callback(tour);
            }
            
        }).catch(function(error) {
            console.log(error);
        });
    }
    
    function updateTour(tour, callback) {
        
        tour = dataWasher.washTour(tour);
        
        // todo: validate data
        
        // todo: get tags from itinerary
                
        tourRepository.saveTour(tour).then(function(tour) {
            
            // todo: resolve tour status and save action (history)
            
            if(callback) {
                callback(tour);
            }
            
        }).catch(function(error) {
            console.log(error);
        });
    }        
    
    function getTourItems(callback) {
        tourRepository.getTourItems().then(function(tourItems) {
            if(callback) {
                callback(tourItems);
            }
            
        }).catch(function(error) {
            console.log(error);
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
