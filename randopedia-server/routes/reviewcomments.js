var express = require('express');
var router = express.Router();
var tourService = require("../services/tour-service");
var common = require('../helpers/common');

router.get("/:id?", function (req, res) {
    var ids = [req.params.id];
    tourService.getReviewComment(ids, function(addedComment) {
        res.send({comment: addedComment});
    });
});

router.post("/", function (req, res) {

    // todo: implement review comments properly
    
//     var token = req.get('X-Header-Token');
//     var provider = req.get('X-Header-Provider');
// 
//     common.getUserFromRequest(token, provider)
//         .then(function (user) {
//             
//             if (user) {
//                 var comment = req.body.comment;
//                 tourService.addReviewComment(comment, function (createdComment) {
//                     res.send(createdComment); 
//                 });
//                     
//             } else {
//                 common.sendUnauthorizedResponse(res);
//             }
//             
//         }, function (error) {
//             common.sendUnauthorizedResponse(res);
//         });
});

module.exports = router;