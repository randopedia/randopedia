var express = require("express");
var router = express.Router();
var tourService = require("../services/tour-service");
var common = require('../helpers/common');

router.get("/", function (req, res) {
    // todo: get user...
    var user = { userId: 1, userName: "Randopedia" };
    
    var status = req.query["status"];
    var usersTours = req.query["usersTours"];
    
    if(usersTours) {
        tourService.getToursByCurrentUser(user, function(tours) {
            res.send(tours);
        });
    }
    else {
        tourService.getTours(status, user, function(tours) {
            res.send(tours);
        });
    }
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
        .then(function(user) {
            if(user) {
                var tour = req.body.tour;
                tourService.createTour(tour, user, function (createdTour) {
                    res.send(createdTour);
                }, function (validationErrors) {
                    res.status(400).send("Tour have validation errors and couldn't be saved", validationErrors);
                });
            } else {
                sendUnauthorizedResponse(res);
            }
        }, function(error) {
            sendUnauthorizedResponse(res);
        });
    
});

router.put("/:id?", function (req, res) {

    var token = req.get('X-Header-Token');

    common.getUserFromRequest(token)
        .then(function(user) {

            if(user) {
                
                var tour = req.body.tour;
                tour.id = req.params.id;
                tourService.updateTour(tour, user, function (updatedTour) {
                    res.send(updatedTour);
                }, function (validationErrors) {
                    res.status(400).send("Tour have validation errors and couldn't be saved", validationErrors);
                });
            } else {
                sendUnauthorizedResponse(res);
            }
        }, function(error) {
            console.log('PUT tour error: ' + error);
            sendUnauthorizedResponse(res);
        });
});

function sendUnauthorizedResponse(res) {
    res.status(401).send('You have been logged out');
}

module.exports = router;
