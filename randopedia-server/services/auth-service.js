var facebookRepository = require('../repositories/facebook-repository');
var userRepository = require('../repositories/user-repository');

var authService = (function () {

    function authenticateUser(token, callback) {
        // generate long lived token
        facebookRepository.generateLongLivedToken(token)
            .then(function(llToken) {
                console.log('llToken: ' + llToken);
                return facebookRepository.getExternalUser(llToken);
            })
            .then(function(facebookUser) {
                
            },function(error) {
                console.log('error: ' + error);
            });
        
        
        // get or create user in database
    }
    
    return {
        authenticateUser : authenticateUser
    };

})();

module.exports = authService;



