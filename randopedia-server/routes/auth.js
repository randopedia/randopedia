var express = require('express');
var router = express.Router();

router.get('/google/callback', function(req, res) {
    res.render('logincallback', { title : 'logincallback'});
});

router.get('/facebook/callback', function(req, res) {
    res.render('logincallback', { title : 'logincallback'});
});


module.exports = router;
