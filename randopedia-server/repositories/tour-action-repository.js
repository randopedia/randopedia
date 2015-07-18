var mongoose = require('mongoose');
var TourAction = require('../models/tour-action');
var enums = require("../enums");
var Q = require('q');

var tourActionRepository = (function () {
    
    function createTourAction(user, tour, actionType) {
        return {
            userId: user._id.toString(),
            userName: user.userName,
            tourId: tour._id.toString(),
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
        
        if(tour.status === enums.TourStatus.DRAFT && actionType != enums.TourActionType.CREATE) {
            deferred.reject("Only the created action is saved as long as the tour is a draft");
            return;
        }
        
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
    
    function getActionsByUser (ids) {
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
        getActionsByUser: getActionsByUser,
        save : save
    };
    
})();

module.exports = tourActionRepository;
