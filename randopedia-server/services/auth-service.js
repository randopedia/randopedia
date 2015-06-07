var facebookRepository = require('../repositories/facebook-repository');
var userRepository = require('../repositories/user-repository');

var authService = (function () {

    function authenticateUser(token, callback) {
        // generate long lived token
        facebookRepository.generateLongLivedToken(token)
            .then(function(llToken) {
                return facebookRepository.getExternalUser(llToken);
            })
            .then(function(facebookUser) {
                return userRepository.findUserById(facebookUser.id);
            })
            .then(function(user) {
                user.authenticated = true;
                user.token = token;
                callback({'user' : user});
            },function(error) {
                console.log('error: ' + error);
            });
    }
    
    return {
        authenticateUser : authenticateUser
    };

})();

module.exports = authService;



