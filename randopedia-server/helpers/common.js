var facebookRepository = require('../repositories/facebook-repository');
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
        // todo: WHITESPACE REPLACE DOES NOT WORK!
        // textId = textId.replace("[^a-zA-Z0-9]", "_");
        // textId = textId.replace("/\s/g", "_");
        return textId.toLowerCase();
    }

    function getUserFromRequest(token) {
        // returns a promise. Use facebook repository and user repository
        return facebookRepository.getExternalUser(token)
            .then(function(facebookUser) {
                console.log('found facebook user');
                return userRepository.findUser(facebookUser);
            }, function(error) {
                console.log('getUserFromRequest, error: ' + error);
                return null;
            });
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

    return {
        getTextId : getTextId,
        getUserFromRequest : getUserFromRequest,
        sendUnauthorizedResponse: sendUnauthorizedResponse,
        decodeBase64Image : decodeBase64Image
    };
    
})();

module.exports = common;
