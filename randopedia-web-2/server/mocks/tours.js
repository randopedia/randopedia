/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var toursRouter = express.Router();
    
  var tour1 = {
      "_id": "52936377e4b04666a6a2bcfe",
      "clientId": "nordre_soleibotntind__north_east_colouir",
      "elevationGain": 800,
      "elevationLoss": 800,
      "grade": 4,
      "mapGeoJson": {
          "features": [{
              "geometry": {
                  "coordinates": [
                    [7.801945209503174, 61.45605914189569],
                    [7.79803991317749, 61.45448011292032],
                    [7.796430587768555, 61.45414173916033],
                    [7.794692516326904, 61.45352650473063],
                    [7.793447971343994, 61.45315735824369],
                    [7.792396545410156, 61.45262413893318],
                    [7.791109085083008, 61.45214218286191],
                    [7.789456844329834, 61.45220370958381],
                    [7.788598537445068, 61.45238828902087],
                    [7.787997722625732, 61.45236778024847]],
                  "type": "LineString"
              },
              "properties": {
                  "name": "Tour path"
              },
              "rando_type": 10,
              "type": "Feature"
          }, {
              "geometry": {
                  "coordinates": [
                    [7.801837921142578, 61.45615757322319],
                    [7.797889709472656, 61.46118120825802],
                    [7.796001434326172, 61.46413349751748],
                    [7.793254852294922, 61.468151441743736],
                    [7.7899932861328125, 61.47492337773793],
                    [7.78656005859375, 61.48148074711295],
                    [7.7831268310546875, 61.48705342538129],
                    [7.783985137939453, 61.49088815621927],
                    [7.783899307250977, 61.49379666736148],
                    [7.78656005859375, 61.496663947441235],
                    [7.78656005859375, 61.49830227457407],
                    [7.784414291381836, 61.5003091077421]],
                  "type": "LineString"
              },
              "properties": {
                  "name": "Tour path"
              },
              "rando_type": 10,
              "type": "Feature"
          }, {
              "geometry": {
                  "coordinates": [7.787997722625732, 61.452378034636375],
                  "type": "Point"
              },
              "properties": {
                  "name": "Summit point"
              },
              "rando_type": 20,
              "type": "Feature"
          }],
          "type": "FeatureCollection"
      },
      "name": "Nordre Soleibotntind, north-east colouir",
      "accessPoint": "By the road",
      "itinerary": "Long, steep and spectacular colouir in Ringsdalen valley",
      "timingMax": 6,
      "timingMin": 5,
      "id": "nordre_soleibotntind__north_east_colouir"
  };

  toursRouter.get('/', function (req, res) {
    res.send({
      "tours":[tour1]
    });
  });

  toursRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  toursRouter.get('/:id', function (req, res) {
      res.send({
        'tour': tour1
    });
  });

  toursRouter.put('/:id', function(req, res) {
    res.send({
      'tours': {
        id: req.params.id
      }
    });
  });

  toursRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/tours', require('body-parser').json());
  app.use('/api/tours', toursRouter);
};
