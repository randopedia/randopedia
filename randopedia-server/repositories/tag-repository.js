var mongoose = require('mongoose');
var tagModel = require('../models/tag');

var tagRepository = (function () {

    function getTag(tagName, callback) {
        tagModel.find({'tag':tagName}, function(err, tag) {
            if(err) {

            }

            if(callback) {
                callback(tag);
            }
        });
    }
    
    function getTags(callback) {
        tagModel.find(function(err, tags) {
            if(err) {
                console.log("could not find tags: " + err);
            }
            if(callback) {
                callback(tags);
            }
        });
    }

    return {
        getTags : getTags,
        getTag : getTag
    };
    
})();

module.exports = tagRepository;
