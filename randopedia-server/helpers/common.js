var facebookRepository = require('../repositories/facebook-repository');
var googleRepository = require('../repositories/google-repository');
var userRepository = require('../repositories/user-repository');

var common = (function () {
    
    function getTextId(textId) {
        textId = textId.replace('ø', 'o');
        textId = textId.replace('æ', 'a');
        textId = textId.replace('Ø', 'O');
        textId = textId.replace('Æ', 'A');
        textId = textId.replace('å', 'a');
        textId = textId.replace('ä', 'a');
        textId = textId.replace('ö', 'o');
        textId = textId.replace('Å', 'a');
        textId = textId.replace('Ä', 'a');
        textId = textId.replace('Ö', 'o');
        textId = textId.replace("\\p{InCombiningDiacriticalMarks}+", "");
        textId = textId.replace(/[^a-zA-Z0-9]/g, "_");
        textId = textId.replace(/\s/g, "_");
        return textId.toLowerCase();
    }

    function getUserFromRequest(token, provider) {
        // returns a promise. Use facebook/google repository and user repository
        if('facebook' === provider) {
            return facebookRepository.getExternalUser(token)
                .then(function(facebookUser) {
                    console.log('found facebook user');
                    return userRepository.findUser(facebookUser);
                }, function(error) {
                    console.log('getUserFromRequest, error: ' + error);
                    return null;
                });
        } else {
            return googleRepository.getExternalUser(token)
                .then(function(googleUser) {
                    console.log('found google user');
                    return userRepository.findUser(googleUser);
                }, function(error) {
                    console.log('getUserFromRequest, error: ' + error);
                    return null;
                });
        }
    }
    
    function sendUnauthorizedResponse(res) {
        res.status(401).send('You have been logged out');
    }
     
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var response = {};
        
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        
        return response;
    }

    function getTagsFromText(text) {
        var tags = [];

        var index = text.indexOf("#");
        while(index >= 0) {
            var spaceIndex = text.indexOf(' ', index);
            var tag;
            if(spaceIndex > 0) {
                tag = text.substring(index+1, spaceIndex);
                tags.push(tag);
                index = text.indexOf('#', spaceIndex);
            } else {
                tag = text.substring(index+1, text.length());
                tags.push(tag);
                index = text.indexOf('#', index+1);
            }
        }
    }

    return {
        getTextId : getTextId,
        getUserFromRequest : getUserFromRequest,
        sendUnauthorizedResponse: sendUnauthorizedResponse,
        decodeBase64Image : decodeBase64Image,
        getTagsFromText : getTagsFromText
    };
    
})();

module.exports = common;
