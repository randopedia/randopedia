var mongoose = require('mongoose');
var TourAction = require('../models/tour-action');
var Q = require('q');

var tourActionRepository = (function () {
    
    function createTourAction(user, tour, actionType) {
        return {
            userId: user.userId,
            userName: user.userName,
            tourId: tour.tourId,
            time: new Date().getTime(),
            type: actionType,
            comment: tour.publishComment
        }    
    }
    
    function save (user, tour, actionType) {
        var deferred = Q.defer();
        var tourAction = createTourAction(user, tour, actionType);
        
        TourAction.create(tourAction, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });  
            
        return deferred.promise;
    }

    function getActions (ids) {
        var deferred = Q.defer();
        TourAction.find({_id: { $in: ids }}, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });  
        
        return deferred.promise;
    }

    return {
        getActions : getActions,
        save : save
    };
    
})();

module.exports = tourActionRepository;