var mongoose = require("mongoose");
var Q = require("q");
var Tour = require("../models/tour");
var common = require("../helpers/common");
var enums = require("../enums");

var tourRepository = (function () {

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
    
    function findUniqueClientId(tourName, currentCounter) {
        var uniqueClientId = common.getTextId(tourName);
        var counter = currentCounter ? currentCounter : 1;
        
        return getTour(tourName).then(function(tour) {
            if(!tour) {
                return uniqueClientId;
            }
            
            uniqueClientId = uniqueClientId + "_" + counter;
            counter++;
            return findUniqueClientId(uniqueClientId, counter);
        
        }).catch(function(error) {
            console.log(error);
        });      
    }
    
    function getTour(tourId) {
        var deferred = Q.defer();
        
        Tour.find({ clientId: tourId }, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                if(result.length > 0) {
                    deferred.resolve({tour: documentToTour(result[0])});
                } else {
                    deferred.resolve(null);
                }
            }
        });
        
        return deferred.promise;
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
    
    function getTours() {
        // todo: ...
    }
    
    function saveTour(tour) {
        var deferred = Q.defer();
        
        if(!tour.id) {
            tour.clientId = findUniqueClientId(tour.name);
            
            Tour.create(tour, function(err, result) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(documentToTour(result));
                }
            });  
        
        } else {
            Tour.findOneAndUpdate({clientId: tour.id}, tour, function(err, result) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(documentToTour(result));
                }
            }); 
        }
        
        return deferred.promise;
    }
    
    function getTourItems() {
        var itemFields = "mapGeoJson name grade elevationLoss elevationGain timingMin timingMax shortDescription clientId";
        var deferred = Q.defer();

        Tour.find({status: enums.TourStatus.PUBLISHED}, itemFields, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToTours(result));
            }
        });
        
        return deferred.promise;
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
