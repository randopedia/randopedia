var express = require("express");
var router = express.Router();
var HttpStatus = require('http-status-codes');
var tourService = require("../services/tour-service");
var common = require('../helpers/common');

router.post("/", function (req, res) {
    
    var token = req.get('X-Header-Token');

    common.getUserFromRequest(token)
        .then(function(user) {
            if(user) {
                tourService.addImage(req.body.image, user, function () {
                    res.send({image: req.body.image});
                });
                
            } else {
                common.sendUnauthorizedResponse(res);
            }
            
        }, function(error) {
            common.sendUnauthorizedResponse(res);
        });
});

router.put("/:id?", function (req, res) {
    
    var token = req.get('X-Header-Token');
    
    common.getUserFromRequest(token)
        .then(function(user) {
            if(user) {
                var imageId = req.params.id;
            
                tourService.updateImage(req.body.image, imageId, user, function (result) {
                    res.send(result);
                });
                
            } else {
                common.sendUnauthorizedResponse(res);
            }
            
        }, function(error) {
            common.sendUnauthorizedResponse(res);
        });
});

router.delete("/:id?", function (req, res) {
    
    var token = req.get('X-Header-Token');
    
    common.getUserFromRequest(token)
        .then(function(user) {
            if(user) {
                tourService.deleteImage(req.params.id, user, function () {
                    res.status(HttpStatus.NO_CONTENT).send();
                });
                
            } else {
                common.sendUnauthorizedResponse(res);
            }
            
        }, function(error) {
            common.sendUnauthorizedResponse(res);
        });
});

module.exports = router;