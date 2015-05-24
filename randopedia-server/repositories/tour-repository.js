var mongoose = require("mongoose");
var Tour = require("../models/tour");
var Q = require("q");

var TourStatus = {
    PUBLISHED:  1,
    DRAFT:      2,
    DELETED:    3,
    IN_REVIEW:  4
};

var tourRepository = (function () {

    function handleError(err, errorCallback) {
        console.log(err);
        if(errorCallback) {
            errorCallback(err);
        }
    }
    
    function documentToTour(doc) {
        var tour = doc.toObject();
        tour.id = tour.clientId;
        return tour;
    }
    
    function documentsToTours(documents) {
        if(!documents || documents.length === 0) {
            return { tours: [] };
        }
        
        var entities = [];
        documents.forEach(function(doc) {
            entities.push(documentToTour(doc));
        }, this);

        return { tourItems: entities };
    }
    
    function findUniqueClientId(tour) {
        // todo: implement... :P
        
        return tour.name;
/* JAVA
    private String findUniqueClientId(Tour tour) {
        String startClientId = RandoNameUtils.getTextId(tour.getName());
        String clientId = startClientId;
        int startIter = 1;
        Tour duplicate = findTourByClientId(startClientId);
        while(duplicate != null) {
            clientId = startClientId + "_" + startIter;
            duplicate = findTourByClientId(clientId);
            startIter++;
        }
        return clientId;
    } */        
    }
    
    function getTour(tourId, callback) {
        Tour.find({ clientId: tourId }, function (err, result) {
            if (err) {
                handleError(err);
                return;
            }
            
            if (callback) {
                if(result.length === 0) {
                    callback(null);
                    return;
                }
                callback( {tour: documentToTour(result[0])} );
            }
        });
    }

    function getToursWithTag(tagName) {
        var deferred = Q.defer();

        Tour.find({tags : tagName}, function (err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });
        return deferred.promise;
    };
    
    function getTours(callback) {
        // todo: ...
    }
    
    function saveTour(tour, callback, errorCallback) {
        if(!tour.id) {
            tour.clientId = findUniqueClientId(tour);
            
            Tour.create(tour, function(err, result) {
                if(err) {
                    handleError(err, errorCallback);
                    return;
                }
                if(callback) {
                    callback(documentToTour(result));
                }                
            });  
        
        } else {
            Tour.findOneAndUpdate({clientId: tour.id}, tour, function(err, result) {
                if(err) {
                    handleError(err, errorCallback);
                    return;
                }
                if(callback) {
                    callback(documentToTour(result));
                }
            }); 
        }
    }
    
    function getTourItems(callback) {
        var itemFields = "mapGeoJson name grade elevationLoss elevationGain timingMin timingMax shortDescription clientId";

        Tour.find({status: TourStatus.PUBLISHED}, itemFields, function (err, result) {
            if (err) {
                handleError(err);
                return;
            }
            
            if (callback) {
                callback(documentsToTours(result));
            }
        });
    }

    return {
        getTour: getTour,
        getTours: getTours,
        saveTour: saveTour,        
        getTourItems: getTourItems,
        getToursWithTag : getToursWithTag
    };

})();

module.exports = tourRepository; 
