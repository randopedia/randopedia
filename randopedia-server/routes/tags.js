var express = require('express');
var router = express.Router();
var tagService = require("../services/tag-service");

router.get("/:id?", function(req, res) {
    var tagName = req.params.id;
    if(tagName) {
        tagService.getTag(tagName, function(tag) {
            res.send(tag);
        });

    } else {
        tagService.getTags(function(tags) {
            res.send(tags);
        });
    }
});
    
module.exports = router;


