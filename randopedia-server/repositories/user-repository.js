var mongoose = require('mongoose');
var userModel = require('../models/user');
var Q = require('q');

var userRepository = (function() {

    function findOrCreateUser(facebookUser, llToken) {
        console.log('find or create user ' + facebookUser.id + ' ' + llToken);
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
                    console.log('creating new user');
                    newUser.save(function(err) {
                        if(err) {
                            console.log('Could not create new user');
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
        console.log('userRepository.findUser ' + facebookUser.id);
        var deferred = Q.defer();
        userModel.findOne({'userId' : facebookUser.id}, function(err, user) {
            if(err) {
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

    return {
        findOrCreateUser : findOrCreateUser,
        findUser : findUser
    };
    
})();

module.exports = userRepository;
