var facebookRepository = require('../repositories/facebook-repository');
var googleRepository = require('../repositories/google-repository');
var userRepository = require('../repositories/user-repository');

var authService = (function () {

    function authenticateUser(token, provider, callback) {
        // generate long lived token
        console.log('authenticateUser');

        if('facebook' === provider) {
            facebookRepository.generateLongLivedToken(token)
                .then(function(llToken) {
                    console.log('got token');
                    return facebookRepository.getExternalUser(llToken)
                        .then(function(facebookUser) {
                            console.log('got user from facebook: ' + facebookUser.id);
                            return userRepository.findOrCreateUser(facebookUser, llToken, provider);
                        })
                        .then(function(user) {
                            user.authenticated = true;
                            user.token = token;
                            user.id = user.userId;
                            delete user.longLivedToken;
                            callback({'user' : user});
                        });
                }, function(error) {
                    console.log('error: ' + error);
                });
        } else {
            googleRepository.verifyToken(token)
                .then(function() {
                    return googleRepository.getExternalUser(token)
                        .then(function(googleUser) {
                            console.log('got user from google: ' + googleUser);
                            return userRepository.findOrCreateUser(googleUser, null, provider);
                        })
                        .then(function(user) {
                            user.authenticated = true;
                            user.token = token;
                            callback({'user' : user});
                        });
                }, function(error) {
                    console.log('error: ' + error);
                });
        }
    }

    return {
        authenticateUser : authenticateUser
    };

})();

module.exports = authService;
