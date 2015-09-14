var express = require('express');
var router = express.Router();
var statsService = require("../services/stats-service");
var enums = require("../enums");

router.get("/:id?", function(req, res) {

    statsService.getStats(function(stats) {
        res.send({'stat' : stats});
    });
    
    
});



module.exports = router;
