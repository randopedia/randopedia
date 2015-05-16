var express = require('express');
var router = express.Router();

var User = require("../models/user");

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(new FacebookStrategy(
    {
        clientID: "579258552116376",
        clientSecret: "8c2f8d2b4adef35a93c02ee9d83fa55f",
        callbackURL: "http://localhost:9001/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) { 
        console.log("Finding or creating user... ");
        console.log(profile.displayName);
        console.log("done param: " + done);
    
        return done(null, { userId: profile.id });
    
        //    User.findOrCreate({ userId: profile.id }, function (err, user) {
        //        console.log("findOrCreate done");
        //		return done(err, user);
        //    });
        }
    )
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false, successRedirect: '/logincallback.html' }));

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google', { session: false, successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;