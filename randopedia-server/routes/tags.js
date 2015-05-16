var express = require('express');
var router = express.Router();
var tagService = require("../services/tag-service");

router.get("/", function (req, res) {

    tagService.getTags(function(tags) {
        res.send(tags);
    });
});
    
module.exports = router;


