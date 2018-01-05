/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var toursRouter = express.Router();

var bukollen = {
  "_id":"532890c9e4b07d6ca7706c9b",
  "_class":"no.extreme.randopedia.model.tour.Tour",
  "name":"Bukollen",
  "areaId":"53288de2e4b07d6ca7706c9a",
  "clientAreaId":"oslo___akershus",
  "shortDescription":"A ski tour just outside Oslo",
  "itineraryEng":"Who would have thought that you can actually do a ski tour just outside Oslo? Well, it's possible :) It's not steep and there are very few days in a season when it actually will be good, but just to get out there and get a few soft turns is great.\n\nFrom Oslo, follow road 4 just past Nittedal. Park under one of the huge sattelite dishes of the Nittedal Earth Station. From there, go north until you hit a small forest road. Follow the road east until you se a marked ridge formation.\n\nThis ridge can be followed to the top. It's very unlikely that you will have a nice skin track to follow so you have to earn your turns here.\n\nWhen on the top, either follow the ridge down or ski in a more south easterly direction.\n\nThe tour is not steep at all, but better than a day at the office or cross country skiing when the snow is good!\n\n#oslo #nittedal #varingskollen #topptur",
  "timeOfYearFrom":1,
  "timeOfYearTo":3,
  "timingMin":1,
  "timingMax":3,
  "elevationGain":320,
  "elevationLoss":320,
  "elevationMax":522,
  "aspect":5,
  "accessPointEng":"Nittedal Earth Station",
  "grade":1,
  "requiresTools":false,
  "haveHazards":false,
  "mapPaths":[[[60.143598518269755,10.802779197692871],[60.14462399624019,10.803894996643066],[60.145563989623795,10.804753303527832],[60.14658940630914,10.805268287658691],[60.14774296186144,10.806469917297363],[60.148640143758925,10.807671546936035],[60.14940913733063,10.809130668640137],[60.14928097298424,10.811104774475098],[60.14868286609583,10.81204891204834],[60.14821291733688,10.813937187194824],[60.14765751468975,10.815567970275879],[60.148426531241746,10.816597938537598],[60.149921789720494,10.816855430603027],[60.152783952001904,10.817370414733887],[60.15363828051394,10.817370414733887],[60.15603028224013,10.817456245422363],[60.15820856095311,10.8180570602417]],[[60.15718350659903,10.819087028503418],[60.155688578363915,10.82054615020752],[60.1541508669647,10.821833610534668],[60.15252764911909,10.82277774810791],[60.15094707052155,10.822863578796387]]],
  "mapGeoJson":{
    "type":"FeatureCollection",
    "features":[{
      "type":"Feature",
      "rando_type":10,
      "properties":{"name":"Tour path"},
      "geometry":{"type":"LineString","coordinates":[[10.802779197692871,60.143598518269755],[10.803894996643066,60.14462399624019],[10.804753303527832,60.145563989623795],[10.805268287658691,60.14658940630914],[10.806469917297363,60.14774296186144],[10.807671546936035,60.148640143758925],[10.809130668640137,60.14940913733063],[10.811104774475098,60.14928097298424],[10.81204891204834,60.14868286609583],[10.813937187194824,60.14821291733688],[10.815567970275879,60.14765751468975],[10.816597938537598,60.148426531241746],[10.816855430603027,60.149921789720494],[10.817370414733887,60.152783952001904],[10.817370414733887,60.15363828051394],[10.817456245422363,60.15603028224013],[10.8180570602417,60.15820856095311]]}},{"type":"Feature","rando_type":10,"properties":{"name":"Tour path"},"geometry":{"type":"LineString","coordinates":[[10.819087028503418,60.15718350659903],[10.82054615020752,60.155688578363915],[10.821833610534668,60.1541508669647],[10.82277774810791,60.15252764911909],[10.822863578796387,60.15094707052155]]}},{"type":"Feature","rando_type":20,"properties":{"name":"Summit point"},"geometry":{"type":"Point","coordinates":[10.818357467651367,60.158101785949384]}}]},"tags":["oslo","nittedal","varingskollen","topptur"],"clientId":"bukollen","actions":["54c3e31de4b08a3537dfec83","546e3b24e4b0f2607895c4aa","54440825e4b0d79eede4aaef","5328962de4b07f6ce473b205","5328916ae4b07d6ca7706c9e","532890c9e4b07d6ca7706c9d","532890c9e4b07d6ca7706c9c","55deb65aa1c44681173bec59","55decab1fa3d0c941ed2fa07","55df5503fa3d0c941ed2fa08","55df558efa3d0c941ed2fa09","560f8bcfb8622c6c39e22d83","56b4ad8cedbcc79c2b4b949c"],"status":1,"tourComments":[],"portfolioImage":null,"accessPointElevation":null,"toolsDescription":null,"degreesMax":null,"hazardsDescription":null,"country":"NOR","updatedStamp":"2016-02-05T14:11:24.323Z","id":"bukollen","images":["54c3e31de4b08a3537dfec82"]};

  var tour1 = {
      "_id": "52936377e4b04666a6a2bcfe",
      "clientId": "nordre_soleibotntind__north_east_colouir",
      "id": "nordre_soleibotntind__north_east_colouir",
      "status": 1,
      "name": "Nordre Soleibotntind, north-east colouir",
      "accessPointEng": "By the road",
      "itineraryEng": "Long, steep and spectacular colouir in Ringsdalen valley",
      "itineraryNo": "Långt och jävligt",
      "timingMax": 6,
      "timingMin": 5,
      "elevationGain": 800,
      "elevationLoss": 800,
      "elevationMax": 4000,
      "degreesMax": 55,
      "timeOfYearFrom":5,
      "timeOfYearTo":6,
      "grade": 4,
      "tags": [],
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
      }
  };

  toursRouter.get('/', function (req, res) {
    res.send({
      "tours":[tour1]
    });
  });

  toursRouter.post('/', function(req, res) {
    res.send({
      "tours":[tour1]
    });
  });

  toursRouter.get('/:id', function (req, res) {
      res.send({
        'tour': bukollen,
        "images":[{"_id":"54c3e31de4b08a3537dfec82","imageFile":"/tourimages/bukollen_54c3e31de4b08a3537dfec82.jpg","tour":"bukollen","caption":"Working their way up thru the forest (Jan 2015)","isPortfolio":false,"id":"54c3e31de4b08a3537dfec82"}]
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
