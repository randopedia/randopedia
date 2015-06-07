var mongoose = require('mongoose');
var userModel = require('../models/tag');
var Q = require('q');
var request = require('request');
var config = require('../config/config');

var facebookRepository = (function() {

    function generateLongLivedToken(token) {
        var url = 'https://graph.facebook.com/oauth/access_token'
            + '?grant_type=fb_exchange_token'
            + '&client_id=' + config.facebook.app_id
            + '&client_secret=' + config.facebook.app_secret
            + '&fb_exchange_token=' + token;
        var deferred = Q.defer();
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var llToken = body.split('=')[1];
                deferred.resolve(llToken);
            } else {
                console.log(error);
                console.log(response.statusCode);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    };

    function getExternalUser(longLivedToken) {
        var url = 'https://graph.facebook.com/me'
            + '?access_token=' + longLivedToken;

        var deferred = Q.defer();
        request(url, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                deferred.resolve(JSON.parse(body));
            } else {
                console.log(error);
                console.log(response.statusCode);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }

    return {
        generateLongLivedToken : generateLongLivedToken,
        getExternalUser : getExternalUser
    };
    
})();

module.exports = facebookRepository;
