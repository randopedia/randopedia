var mongoose = require('mongoose');
var userModel = require('../models/user');
var Q = require('q');

var userRepository = (function() {

    function findUserById(userId) {
        var deferred = Q.defer();
        userModel.find({'userId': userId}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user[0].toObject());
            }
        });
        return deferred.promise;        
    }

    return {
        findUserById : findUserById
    };
    
})();

module.exports = userRepository;
