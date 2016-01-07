var tagRepository = require('../repositories/tag-repository');
var tourRepository = require('../repositories/tour-repository');
var Q = require('q');

var tagService = (function() {

    function getTags(callback) {
        tagRepository.getTags().then(function(tags) {
            callback({ 'tags' : tags });

        }, function(error) {
            console.log('error :' + error);
        });
    };

    function getTag(tagName, req, callback) {
        var toursPromise = tourRepository.getToursWithTag(tagName, req);
        var tagPromise = tagRepository.getTag(tagName);
        var allPromise = Q.all([toursPromise, tagPromise]);

        allPromise.spread(function (toursResult, tagResult) {
            if(toursResult && tagResult) {
                var tours = toursResult;
                var tourIds = tours.map(function(tour) {
                    return tour.clientId;
                });
                var tag = tagResult;
                tag.tours = tourIds;
                tag.name = tagName;
                tag.id = tagName;
                callback({ 'tag' : tag });

            } else {
                callback({'tag' : {'id':tagName, 'name': tagName, 'tours':[]}});
            }

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
