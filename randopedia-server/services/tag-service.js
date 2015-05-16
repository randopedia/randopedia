var tagRepository = require('../repositories/tag-repository');

var tagService = (function() {

    function getTags(callback) {
        tagRepository.getTags(function(tags) {
            if(callback) {
                callback({tags : tags});
            }
        });
    }

    return {
        getTags : getTags
    };
    
})();

module.exports = tagService;
