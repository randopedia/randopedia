var mongoose = require('mongoose');
var tagModel = require('../models/tag');

var tagRepository = (function () {

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
        getTags : getTags
    };
    
})();

module.exports = tagRepository;
