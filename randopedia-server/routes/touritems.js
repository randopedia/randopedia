var express = require('express');
var router = express.Router();
var tourService = require("../services/tour-service");
var common = require('../helpers/common');
var enums = require("../enums");
                                     
router.get("/", function (req, res) {
    
    var token = req.get('X-Header-Token');
    var provider = req.get('X-Header-Provider');
    var status = req.query["status"];
    var usersTours = req.query["usersTours"];
    var query = req.query["query"];
    
    common.getUserFromRequest(token, provider)
        .then(function (user) {
            if (query) {
                tourService.getToursByQuery(query, function(tours) {
                    res.send({tourItems : tours});
                });
                
            } else if (usersTours) {
                if(!user) {
                    common.sendUnauthorizedResponse(res);
                    return;
                    
                } else {
                    tourService.getToursForUser(user, function (tours) {
                        res.send({tourItems: tours});
                    });                    
                }
                
            } else {
                if (status === enums.TourStatus.DRAFT.toString() && !user) {
                    common.sendUnauthorizedResponse(res);
                    return;
                }
                
                tourService.getTours(status, user, function (tours) {
                    res.send({tourItems: tours});
                });                
            }
    
        }, function (error) {
            console.log("Error when getting tours: " + error);
        });
});

module.exports = router;

