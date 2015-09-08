var mongoose = require('mongoose');
var tourRepository = require('../repositories/tour-repository');
var Tour = require("../models/tour");

var connectString = 'mongodb://localhost/randopedia';
var mongoOptions = {};

mongoose.connect(connectString, mongoOptions, function(err, res) {
    if(err) {
        console.log('Could not connect to database');
    } else {
        console.log('Connected to database');
    }
});

var updateTour = function(tour) {
    console.log(tour);
    tour.images.forEach(function (image) {
        console.log(image.imageFile);
        console.log('nisse');
        image.imageFile = 'nisse'; //'/' + image.imageFile;
        console.log(image);
        
    });
    
};

Tour.find({}, function(err, docs) {
    var tours = [];
    docs.forEach(function(tour) {
        if(tour.tourImages) {
            console.log(tour);
            tour.tourImages.forEach(function(image) {
                console.log(image);
                image.imageFile = '/' + image.imageFile;
                console.log(image);
            });
            tours.push(tour);
        }
    });

    tours.forEach(function(tour) {
        console.log(tour);
        Tour.findOneAndUpdate({ _id: tour._id }, tour, {'new': true}, function (err, result) {
            if (err) {
                console.log('error...');
            } else {
                console.log('updated...');
            }
        });
    });
});

