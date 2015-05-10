var mongoose = require("mongoose");
var tourModel = require("../models/tour");

var TourStatus = {
    PUBLISHED:  1,
    DRAFT:      2,
    DELETED:    3,
    IN_REVIEW:  4
};

var tourRepository = (function () {

    function clientifyResultTour(resultTour) {
        var tour = resultTour.toObject();
        tour.id = tour.clientId;
        return tour;
    }

    function clientifyResultTours(resultTours) {
        if(!resultTours || resultTours.length === 0) {
            return { tours: [] };
        }
        
        var entities = [];
        resultTours.forEach(function(item) {
            entities.push(clientifyResultTour(item));
        }, this);

        return { tourItems: entities };
    }
    
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
                callback( {tour: clientifyResultTour(result[0])} );
            }
        });
    }
    
    function getTourItems(callback) {
        var itemFields = "mapGeoJson name grade elevationLoss elevationGain timingMin timingMax shortDescription clientId";

        tourModel.find({status: TourStatus.PUBLISHED}, itemFields, function (err, result) {
            if (err) {
                console.error(err);
            }
            
            if (callback) {
                callback(clientifyResultTours(result));
            }
        });
    }

    return {
        get: getTour,
        getTourItems: getTourItems
    };

})();

module.exports = tourRepository; 