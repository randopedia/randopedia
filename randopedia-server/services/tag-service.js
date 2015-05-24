var tagRepository = require('../repositories/tag-repository');
var tourRepository = require('../repositories/tour-repository');
var Q = require('q');

var tagService = (function() {

    function getTags(callback) {
        tagRepository.getTags(function(tags) {
            if(callback) {
                callback({'tags' : tags});
            }
        });
    };

    function getTag(tagName, callback) {
        console.log('tag service, getTag');
        // det här är asynkront. Fint att göra kall till getTag
        // och getTour samtidigt och samla upp med ett promise
        tagRepository.getTag(tagName, function(tag) {
            
            tourRepository.getTour('nibbi', function(tours) {
                console.log('hehe');
                tag.tour = tours;
            });

            
            
            if(callback) {
                console.log('returning tag');
                callback({'tag' : tag});
            }
        });

        Q.ninvoke(tourRepository, 'getTour', 'nibbi')
        .then(function(tour) {
            console.log('then...');
        }, function(err) {
            console.log(err);
        });
        
        //tourRepository.getToursWithTag(tagName, function(tours) {
        //});
    };

    return {
        getTags : getTags,
        getTag : getTag
    };
    
})();

module.exports = tagService;
