var userRepository = require('../repositories/user-repository');
var tagRepository = require('../repositories/tag-repository');
var tourRepository = require('../repositories/tour-repository');
var enums = require("../enums");
var Q = require('q');

var statsService = (function() {

    function getTourCount(status, callback) {
        
        tourRepository.getTourCount().then(function(count) {
            if(callback) {
                callback(count);
            }            
            
        }).catch(function (error) {
            console.log(error);
        });       
    }

    function getStats(callback) {
        var tourCountPromise = tourRepository.getTourCount(enums.TourStatus.PUBLISHED);
        var userCountPromise = userRepository.getUserCount();
        var draftCountPromise = tourRepository.getTourCount(enums.TourStatus.DRAFT);
        
        var allPromise = Q.all([tourCountPromise, draftCountPromise, userCountPromise]);

        allPromise.spread(function(tourCountResult, draftCountPromise,  userCountResult) {
            var stats = {};
            stats.id = '1';
            stats.publishedTours = tourCountResult;
            stats.registeredUsers = userCountResult;
            stats.tourDrafts = draftCountPromise;
            callback(stats);
        }, function(error) {
            console.log('stats error');
        });
        
    }
    
    return {
        getTourCount : getTourCount,
        getStats : getStats
    };
    
})();

module.exports = statsService;
