var express = require('express');
var router = express.Router();

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

//passport.use(new FacebookStrategy({
//    clientID: "579258552116376",
//    clientSecret: "8c2f8d2b4adef35a93c02ee9d83fa55f",
//    callbackURL: "http://localhost:9001/auth/facebook/callback"
//  },
//  function(accessToken, refreshToken, profile, done) {
//      console.log("que..");
//  }
//));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;