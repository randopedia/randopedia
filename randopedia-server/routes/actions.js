var express = require('express');
var router = express.Router();
var tourService = require("../services/tour-service");

router.get("/:id?", function (req, res) {
    var ids = [req.params.id];
    
    tourService.getActions(ids, function(actions) {
        res.send({action: actions[0]});
    });
});

module.exports = router;
