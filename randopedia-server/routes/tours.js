var express = require("express");
var router = express.Router();
var tourService = require("../services/tour-service");
var common = require('../helpers/common');

router.get("/", function (req, res) {
    
    var token = req.get('X-Header-Token');
    var status = req.query["status"];
    var usersTours = req.query["usersTours"];
    
    common.getUserFromRequest(token)
        .then(function (user) {
            
            if (usersTours) {
                tourService.getToursByCurrentUser(user, function (tours) {
                    res.send({tours: tours});
                });
            }
            else {
                tourService.getTours(status, user, function (tours) {
                    res.send({tours: tours});
                });
            }
    
        }, function (error) {
            console.log("Error when getting tours: " + error);
        });
});

router.get("/:id?", function (req, res) {
    var tourId = req.params.id;

    tourService.getTour(tourId, function (tour) {
        res.send(tour);
    });
});

router.post("/", function (req, res) {

    var token = req.get('X-Header-Token');

    common.getUserFromRequest(token)
        .then(function (user) {
            
            if (user) {
                var tour = req.body.tour;
                tourService.createTour(tour, user, function (createdTour) {
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

    common.getUserFromRequest(token)
        .then(function (user) {

            if (user) {
                var tour = req.body.tour;
                tour.id = req.params.id;
                tourService.updateTour(tour, user, function (updatedTour) {
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
