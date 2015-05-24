var tagRepository = require('../repositories/tag-repository');
var tourRepository = require('../repositories/tour-repository');
var Q = require('q');

var tagService = (function() {

    function getTags(callback) {
        tagRepository.getTags().then(function(tags) {
            callback({'tags' : tags});
        }, function(error) {
            console.log('error :' + error);
        });
    };

    function getTag(tagName, callback) {
        console.log('tag service, getTag');

        var toursPromise = tourRepository.getToursWithTag(tagName);
        var tagPromise = tagRepository.getTag(tagName);
        var allPromise = Q.all([toursPromise, tagPromise]);

        allPromise.spread(function(toursResult, tagResult) {
            var tours = toursResult.tourItems;
            var tourIds = tours.map(function(tour) {
                return tour.clientId;
            });

            var tag = tagResult;
            tag.tours = tourIds;

            callback({'tag' : tag});

        }, function(error) {
            console.log('error: ' + error);
        });
    };

    return {
        getTags : getTags,
        getTag : getTag
    };
    
})();

module.exports = tagService;
