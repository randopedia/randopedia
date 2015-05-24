var mongoose = require('mongoose');
var tagModel = require('../models/tag');
var Q = require('q');

var tagRepository = (function () {

    function getTag(tagName) {
        var deferred = Q.defer();
        tagModel.find({'tag':tagName}, function(err, tag) {
            if(err) {
                deferred.reject(err);
            } else {
                //todo why do we get an array here?
                deferred.resolve(tag[0].toObject());
            }
        });
        return deferred.promise;
    }
    
    function getTags(callback) {
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
