var express = require('express');
var router = express.Router();
var tourService = require("../services/tour-service");
                                     
router.get("/", function (req, res) {
    tourService.getTourItems(function(tours) {
       res.send({tourItems: tours}); 
    });
});

module.exports = router;