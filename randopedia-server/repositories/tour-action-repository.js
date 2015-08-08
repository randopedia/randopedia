var mongoose = require('mongoose');
var TourAction = require('../models/tour-action');
var enums = require("../enums");
var tourRepository = require("../repositories/tour-repository");
var Q = require('q');

var tourActionRepository = (function () {
    
    function createTourAction(user, tour, actionType, comment) {
        return {
            userId: user._id.toString(),
            userName: user.userName,
            tourId: tour._id.toString(),
            time: new Date().getTime(),
            type: actionType,
            comment: comment
        }        
    }
    
    function documentsToActions(docs) {
        if(!docs || docs.length === 0) {
            return [];
        }
        
        var actions = [];
        docs.forEach(function(doc) {
            var actionObj = doc.toObject();
            actionObj.id = doc._id.toString();
            actions.push(actionObj); 
        });
        return actions;
    }
    
    function save (user, tour, actionType, comment) {
        var deferred = Q.defer();
        
        if(tour.status === enums.TourStatus.DRAFT && actionType != enums.TourActionType.CREATE) {
            deferred.reject("Only the created action is saved as long as the tour is a draft");
            return;
        }
        
        var tourAction = createTourAction(user, tour, actionType, comment);
        
        TourAction.create(tourAction, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                var createdAction = result.toObject();
                
                if (!tour.actions) {
                    tour.actions = [];
                }
                tour.actions.push(createdAction._id.toString());
                
                tourRepository.saveTour(tour).then(function (updatedTour) {
                    deferred.resolve(createdAction);
                });
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
