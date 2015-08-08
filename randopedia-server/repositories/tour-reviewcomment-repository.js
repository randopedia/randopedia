var mongoose = require('mongoose');
var TourReviewComment = require('../models/tour-review-comment');
var enums = require("../enums");
var Q = require('q');

var tourReviewCommentRepository = (function () {
    
    function documentToReviewComment(doc) {
        var commentObj = doc.toObject();
        commentObj.id = doc._id.toString();        
        return commentObj;
    }
    
    function documentsToReviewComments(docs) {
        if(!docs || docs.length === 0) {
            return [];
        }
        
        var comments = [];
        docs.forEach(function(doc) {
            comments.push(documentToReviewComment(doc)); 
        });
        return comments;
    }
    
    function save (reviewComment) {
        var deferred = Q.defer();
               
        TourReviewComment.create(reviewComment, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentToReviewComment(result));
            }
        });  
            
        return deferred.promise;
    }

    function getReviewComments (ids) {
        var deferred = Q.defer();
        
        TourReviewComment.find({_id: { $in: ids }}, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(documentsToReviewComments(result));
            }
        });  
        
        return deferred.promise;
    }

    return {
        getReviewComments : getReviewComments,
        save : save
    };
    
})();

module.exports = tourReviewCommentRepository;
