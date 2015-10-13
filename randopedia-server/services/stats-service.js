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
        var statPromise = tourRepository.getTourStats();
        
        var allPromise = Q.all([tourCountPromise, draftCountPromise, userCountPromise, statPromise]);

        allPromise.spread(function(tourCountResult, draftCountPromise,  userCountResult, statPromise) {
            var stats = {};
            stats.id = '1';
            stats.publishedTours = tourCountResult;
            stats.registeredUsers = userCountResult;
            stats.tourDrafts = draftCountPromise;
            stats.totalGain = statPromise.totalGain;
            stats.totalLoss = statPromise.totalLoss;
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
