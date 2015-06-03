var express = require('express');
var router = express.Router();
var tourService = require("../services/tour-service");

router.get("/:id?", function (req, res) {
    var tourId = req.params.id;
    tourService.getTour(tourId, function (tour) {
        res.send(tour);
    });
});

router.post("/", function (req, res) {
    
    // todo: authentication...
    var user = { userId: 1, userName: "Randopedia" };
        
    var tour = req.body.tour;
    tourService.createTour(tour, user, function (createdTour) {
        res.send(createdTour);
    });
});

router.put("/:id?", function (req, res) {
    
    // todo: authentication...
    var user = { userId: 1, userName: "Randopedia" };
    
    var tour = req.body.tour;
    tour.id = req.params.id;
    tourService.updateTour(tour, user, function (updatedTour) {
        res.send(updatedTour);
    });
});

module.exports = router;
