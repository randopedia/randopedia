var express = require('express');
var router = express.Router();
var tourService = require("../services/tour-service");

router.get("/", function(req, res) {
    tourService.getActions(req.query.ids, function(actions) {
        res.send(actions);
    });
});

module.exports = router;
