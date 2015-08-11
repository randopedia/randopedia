var userRepository = require('../repositories/user-repository');
var tagRepository = require('../repositories/tag-repository');
var tourRepository = require('../repositories/tour-repository');
var enums = require("../enums");
var Q = require('q');

var statsService = (function() {

    function getTourCount(status, callback) {
        
        tourRepository.getTourCount().then(function(count) {
            if(callback) {
                callback(count);
            }            
            
        }).catch(function (error) {
            console.log(error);
        });       
    }
    
    return {
        getTourCount : getTourCount
    };
    
})();

module.exports = statsService;
