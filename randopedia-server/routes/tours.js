var express = require("express");
var router = express.Router();
var tourService = require("../services/tour-service");
var common = require('../helpers/common');
var enums = require("../enums");
var config = require("../config/config");


router.get("/:id?", function (req, res) {

    var tourId = req.params.id;
    var provider = req.get('X-Header-Provider');

    tourService.getTour(tourId, req, function (tour) {
        res.send(tour);
    });
});

router.post("/", function (req, res) {

    var token = req.get('X-Header-Token');
    var provider = req.get('X-Header-Provider');
    
    common.getUserFromRequest(token, provider)
        .then(function (user) {

            if (user) {
                var tour = req.body.tour;
                tourService.createTour(tour, user, req, function (createdTour) {
                    res.send({tour: createdTour});
                    
                }, function (validationErrors) {
                    res.status(400).send("Tour have validation errors and couldn't be saved", validationErrors);
                });
                    
            } else {
                common.sendUnauthorizedResponse(res);
            }
            
        }, function (error) {
                common.sendUnauthorizedResponse(res);
        });
});

router.put("/:id?", function (req, res) {

    var token = req.get('X-Header-Token');
    var provider = req.get('X-Header-Provider');
    
    common.getUserFromRequest(token, provider)
        .then(function (user) {

            if (user) {
                var tour = req.body.tour;
                tour.id = req.params.id;
                tourService.updateTour(tour, user, req, function (updatedTour) {
                    res.send({tour: updatedTour});
                    
                }, function (validationErrors) {
                    res.status(400).send("Tour have validation errors and couldn't be saved", validationErrors);
                });
                    
            } else {
                common.sendUnauthorizedResponse(res);
            }
        
        }, function (error) {
            console.log('PUT tour error: ' + error);
            common.sendUnauthorizedResponse(res);
        });
});

module.exports = router;
