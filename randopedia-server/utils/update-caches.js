var mongoose = require('mongoose');
var tourRepository = require('../repositories/tour-repository');
var enums = require('../enums');
var request = require('request');

var Schema = mongoose.Schema;

var connectString = 'mongodb://localhost/randopedia';
var mongoOptions = {};

mongoose.connect(connectString, mongoOptions, function(err, res) {
    if(err) {
        console.log('Could not connect to database');
    } else {
        console.log('Connected to database');
    }
});

var callTour = function(tour) {
    var url = 'http://www.randopedia.net/?_escaped_fragment_=/tours/';
    var tourUrl = url + tour.clientId;
    
    request(tourUrl, function(error, response, body) {
        console.log('Tour ' + tour.name + ' updated');
    });

};

tourRepository.getTours(enums.TourStatus.PUBLISHED).then(function(tours) {
    
    tours.forEach(function(tour) {
        callTour(tour);
    });
});


