var express = require('express');
var router = express.Router();
var authService = require('../services/auth-service.js');

router.post('/', function(req, res) {
    var token = req.get('X-Header-Token');

    console.log('post user');
    authService.authenticateUser(token, function(user) {
        res.send(user);
    });
    
});

module.exports = router;
