var mongoose = require("mongoose");
var Tour = require("../models/tour");

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
    
    function getTours(callback) {
        // todo: ...
    }
    
    function saveTour(tour, callback, errorCallback) {
        // console.log("saveTour: " + tour.id);

        Tour.findOneAndUpdate({clientId: tour.id}, tour, { upsert: true }, function(err, result) {
            if(err) {
                handleError(err, errorCallback);
                return;
            }
            //console.log(result);
            if(callback) {
                callback(documentToTour(result));
            }
        });
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
        getTourItems: getTourItems
    };

})();

module.exports = tourRepository; 