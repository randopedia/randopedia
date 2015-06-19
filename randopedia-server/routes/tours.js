var express = require("express");
var router = express.Router();
var tourService = require("../services/tour-service");
var dataWasher = require("../helpers/data-washer");
var dataValidator = require("../helpers/data-validator");

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
    
    // todo: authentication...
    var user = { userId: 1, userName: "Randopedia" };
        
    var tour = dataWasher.washTour(req.body.tour);  
    if(!dataValidator.validateTour(tour)) {
        res.status(400).send("Tour have validation errors and couldn't be saved");
        return;
    }
        
    tourService.createTour(tour, user, function (createdTour) {
        res.send(createdTour);
    });
});

router.put("/:id?", function (req, res) {
    
    // todo: authentication...
    var user = { userId: 1, userName: "Randopedia" };
    
    var tour = dataWasher.washTour(req.body.tour);  
    if(!dataValidator.validateTour(tour)) {
        res.status(400).send("Tour have validation errors and couldn't be saved");
        return;
    }
    
    tour.id = req.params.id;
    tourService.updateTour(tour, user, function (updatedTour) {
        res.send(updatedTour);
    });
});

module.exports = router;
