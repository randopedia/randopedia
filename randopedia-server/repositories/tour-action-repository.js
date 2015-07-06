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
    
    function documentsToActions(docs) {
        if(!docs || docs.length === 0) {
            return [];
        }
        
        var actions = [];
        docs.forEach(function(doc) {
           actions.push(doc.toObject()); 
        });
        return actions;
    }
    
    function save (user, tour, actionType) {
        var deferred = Q.defer();
        var tourAction = createTourAction(user, tour, actionType);
        
        TourAction.create(tourAction, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result.toObject());
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
                deferred.resolve(documentsToActions(result));
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
