var express = require("express");
var router = express.Router();
var HttpStatus = require('http-status-codes');
var tourService = require("../services/tour-service");

router.post("/", function (req, res) {
    
    // todo: authentication...
    var user = { userId: 1, userName: "Randopedia" };

    tourService.addImage(req.body.image, user, function () {
        res.send({image: req.body.image});
    });
});

router.put("/:id?", function (req, res) {
    
    // todo: authentication...
    var user = { userId: 1, userName: "Randopedia" };

    var imageId = req.params.id;

    tourService.updateImage(req.body.image, imageId, user, function (result) {
        res.send(result);
    });
});

router.delete("/:id?", function (req, res) {
    
    // todo: authentication...
    var user = { userId: 1, userName: "Randopedia" };

    tourService.deleteImage(req.params.id, user, function () {
        res.status(HttpStatus.NO_CONTENT).send();
    });
});

module.exports = router;