var express = require("express");
var router = express.Router();
var tourService = require("../services/tour-service");
var common = require('../helpers/common');
var enums = require("../enums");

router.get("/", function (req, res) {
    
    var token = req.get('X-Header-Token');
    var provider = req.get('X-Header-Provider');
    var status = req.query["status"];
    var usersTours = req.query["usersTours"];
    var query = req.query["query"];

    common.getUserFromRequest(token, provider)
        .then(function (user) {
            if (query) {
                tourService.getToursByQuery(query, function(tours) {
                    res.send({tours : tours});
                });
            } else if (usersTours) {
                if(!user) {
                    common.sendUnauthorizedResponse(res);
                    
                } else {
                    tourService.getToursForUser(user, function (tours) {
                        res.send({tours: tours});
                    });                    
                }
            }
            else {
                if (status === enums.TourStatus.DRAFT.toString() && !user) {
                    common.sendUnauthorizedResponse(res);
                    return;
                }
                
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
    var provider = req.get('X-Header-Provider');

    common.getUserFromRequest(token, provider)
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
    var provder = req.get('X-Header-Provider');

    common.getUserFromRequest(token, provider)
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
