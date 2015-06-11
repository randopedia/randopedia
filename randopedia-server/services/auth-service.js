var facebookRepository = require('../repositories/facebook-repository');
var userRepository = require('../repositories/user-repository');

var authService = (function () {

    function authenticateUser(token, callback) {
        // generate long lived token
        console.log('authenticateUser');
        facebookRepository.generateLongLivedToken(token)
            .then(function(llToken) {
                console.log('got token');
                return facebookRepository.getExternalUser(llToken)
                    .then(function(facebookUser) {
                        console.log('got user from facebook: ' + facebookUser.id);
                        return userRepository.findOrCreateUser(facebookUser, llToken);
                    })
                    .then(function(user) {
                        user.authenticated = true;
                        user.token = token;
                        delete user.longLivedToken;
                        callback({'user' : user});
                    });
            }, function(error) {
                console.log('error: ' + error);
            });
    }
    
    return {
        authenticateUser : authenticateUser
    };
    
})();

module.exports = authService;



