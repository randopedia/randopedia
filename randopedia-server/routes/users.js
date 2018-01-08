var express = require('express');
var router = express.Router();
var authService = require('../services/auth-service.js');

router.post('/', function(req, res) {
    var token = req.get('X-Header-Token');
    var provider = req.get('X-Header-Provider');

    authService.authenticateUser(token, provider, function(user) {
        res.send(user);
    });

});

router.put('/:id?', function(req, res) {
    var token = req.get('X-Header-Token');
    var provider = req.get('X-Header-Provider');

    authService.authenticateUser(token, provider, function(user) {
        res.send(user);
    });

});

module.exports = router;
