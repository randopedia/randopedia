var express = require('express');
var router = express.Router();
var tagService = require("../services/tag-service");

router.get("/:id?", function(req, res) {
    var tagName = req.params.id;
    console.log(tagName);
    tagService.getTag(tagName, function(tag) {
        console.log('ska skicka svar');
        res.send(tag);
    });
});

router.get("/", function (req, res) {

    tagService.getTags(function(tags) {
        res.send(tags);
    });
});
    
module.exports = router;


