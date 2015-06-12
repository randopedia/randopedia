var tourRepository = require("../repositories/tour-repository");
var tourActionRepository = require("../repositories/tour-action-repository");
var dataWasher = require("../helpers/data-washer");
var enums = require("../enums");
var Q = require('q');

var tourService = (function () {
   
    function isTourPublishedWhenCreated(tour) {
        return tour.status === enums.TourStatus.PUBLISHED;
    }
        
    function isTourSentToReview(originalTour, tour) {
        return originalTour.status === enums.TourStatus.DRAFT && tour.status === enums.TourStatus.IN_REVIEW;
    }
    
    function isTourPublishedForTheFirstTime(originalTour, tour) {
        return (originalTour.status == enums.TourStatus.DRAFT && tour.status === enums.TourStatus.PUBLISHED) || (originalTour.status === enums.TourStatus.IN_REVIEW && tour.status === enums.TourStatus.PUBLISHED);
    }
     
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
        
    function createTour(tour, user, callback) {
        tour = dataWasher.washTour(tour);
        
        // todo: validate tour data
        
        // todo: get tags from itinerary and save
        
        tourRepository.saveTour(tour).then(function(tour) {
            
            tourActionRepository.save(user, tour, enums.TourActionType.CREATE);
            
            if(isTourPublishedWhenCreated(tour)) {  
                tourActionRepository.save(user, tour, enums.TourActionType.PUBLISH);
            }
            
            if(callback) {
                callback(tour);
            }
            
        }).catch(function(error) {
            console.log(error);
        });
    }
        
    function updateTour(tour, user, callback) {       
        tour = dataWasher.washTour(tour);
        
        // todo: validate tour data
        
        // todo: get tags from itinerary and save
        
        tourRepository.getTour(tour.tourId).then(function(originalTour) {
           
            tourRepository.saveTour(tour).then(function(updatedTour) {
                
                tourActionRepository.save(user, tour, enums.TourActionType.UPDATE);
        
                if(isTourSentToReview(originalTour, tour)) {
                    tourActionRepository.save(user, tour, enums.TourActionType.SENT_TO_REVIEW);
                
                } else if(isTourPublishedForTheFirstTime(originalTour, tour)) {
                    tourActionRepository.save(user, tour, enums.TourActionType.PUBLISH);
                } 
            
                if(callback) {
                    callback(updatedTour);
                }                
            
            });
                
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
    
    function getActions(ids, callback) {
        if(!ids || ids.length === 0) {
            return [];
        }

        tourActionRepository.getActions(ids).then(function(actions) {
            if(callback) {
                callback(actions);
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
        getTourItems: getTourItems,
        getActions: getActions
    };

})();

module.exports = tourService; 
