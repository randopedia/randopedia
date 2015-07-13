var mongoose = require('mongoose');
var tagModel = require('../models/tag');
var Q = require('q');

var tagRepository = (function () {

    function documentToTag(tagDocument) {
        var tag = tagDocument.toObject();
        tag.id = tag.tag;;
        delete tag._id;
        return tag;
    }
    
    function documentsToTags(tagDocuments) {
        var tags = [];
        
        tagDocuments.forEach(function(doc) {
            tags.push(documentToTag(doc));
        });
        return tags;
    }
    
    function getTag(tagName) {
        var deferred = Q.defer();
        tagModel.findOne({'tag':tagName}, function(err, tag) {
            if(err) {
                deferred.reject(err);
            } else {
                var tagObject = null;
                if(tag) {
                    tagObject = documentToTag(tag);
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
                deferred.resolve(documentsToTags(tags));
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
