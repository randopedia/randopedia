var express = require('express');
var router = express.Router();
var statsService = require("../services/stats-service");
var enums = require("../enums");

router.get("/", function(req, res) {
            
    statsService.getTourCount(enums.TourStatus.PUBLISHED, function(tourCount) {
        res.send({ 
            stats: {
                id: "1",
                publishedTours: tourCount,
                tourDrafts: -1,
                registeredUsers: -1
            }
        });
    });
});
    
module.exports = router;