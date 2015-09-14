var mongoose = require('mongoose');
var userModel = require('../models/user');
var Q = require('q');

var userRepository = (function() {

    function findOrCreateUser(facebookUser, llToken) {
        var deferred = Q.defer();
        userModel.findOne({'userId': facebookUser.id}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                if(user != null) {
                    user.longLivedToken = llToken;
                    user.save(function(err) {
                    });    
                    
                    deferred.resolve(user.toObject());
                } else {
                    var newUser = new userModel(
                        {
                            userId : facebookUser.id,
                            userName : facebookUser.name,
                            longLivedToken : llToken,
                            authenticated : true
                        });
                    newUser.save(function(err) {
                        if(err) {
                            console.log('Could not create new user. ' + err);
                            deferred.reject(err);
                        } else {
                            deferred.resolve(newUser.toObject());
                        }
                    });
                }
            }
        });
        return deferred.promise;        
    }

    function findUser(facebookUser) {
        var deferred = Q.defer();
        userModel.findOne({'userId' : facebookUser.id}, function(err, user) {
            if(err) {
                console.log('Error when finding user. ' + err);
                deferred.reject(err);
            } else {
                if(user) {
                    deferred.resolve(user.toObject());
                } else {
                    deferred.resolve(null);
                }
            }
        });
        return deferred.promise;
    }

    function getUserCount() {
        var deferred = Q.defer();
        userModel.count({}, function(err, count) {
            if(err) {
                console.log(err);
                deferred = Q.reject(err);
            }
            deferred.resolve(count);
        });

        return deferred.promise;
    }

    return {
        findOrCreateUser : findOrCreateUser,
        findUser : findUser,
        getUserCount : getUserCount
    };
    
})();

module.exports = userRepository;
