var mongoose = require('mongoose');
var tagModel = require('../models/tag');
var Q = require('q');

var tagRepository = (function () {

    function getTag(tagName) {
        var deferred = Q.defer();
        tagModel.findOne({'tag':tagName}, function(err, tag) {
            if(err) {
                deferred.reject(err);
            } else {
                var tagObject = null;
                if(tag) {
                    tagObject = tag.toObject();
                }
                deferred.resolve(tagObject);
            }
        });
        return deferred.promise;
    }
    
    function getTags() {
        var deferred = Q.defer();
        tagModel.find(function(err, tags) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(tags);
            }
        });
        return deferred.promise;
    }

    return {
        getTags : getTags,
        getTag : getTag
    };
    
})();

module.exports = tagRepository;
