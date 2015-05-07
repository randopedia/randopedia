var express = require('express');
var router = express.Router();
var tourService = require("../services/tour-service");

router.get("/:id?", function (req, res) {
    var tourId = req.params.id;
    tourService.get(tourId, function(tour) {
       res.send(tour); 
    });
});
    
module.exports = router;
