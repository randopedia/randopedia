var Q = require('q');
var request = require('request');
var config = require('../config/config');

var googleRepository = (function() {

    function verifyToken(token) {
        var url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token;
        
        var deferred = Q.defer();
        request(url, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                deferred.resolve(true);
            } else {
                console.log(error);
                console.log(response.statusCode);
                deferred.reject(error);
            }
        });
        return deferred.promise;
        
    };

    function getExternalUser(token) {
        var url = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token;
        
        var deferred = Q.defer();
        request(url, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                deferred.resolve(JSON.parse(body));
            } else {
                console.log(error);
                console.log(response.statusCode);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    };
    
    
    return {
        verifyToken : verifyToken,
        getExternalUser : getExternalUser
    };

})();

module.exports = googleRepository;
