/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var tourItemsRouter = express.Router();

  var tour1 = {
      "_id": "52936377e4b04666a6a2bcfe",
      "clientId": "nordre_soleibotntind__north_east_colouir",
      "id": "nordre_soleibotntind__north_east_colouir",
      "status": 1,
      "name": "Nordre Soleibotntind, north-east colouir",
      "accessPoint": "By the road",
      "itinerary": "Long, steep and spectacular colouir in Ringsdalen valley",
      "timingMax": 6,
      "timingMin": 5,
      "elevationGain": 800,
      "elevationLoss": 800,
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

  var tour2 = {"_id":"52c5c33de4b0533a35f7a411","name":"Gaustatoppen","shortDescription":"Popular ski tour on southern Norway's highest mountain","timingMin":3,"timingMax":5,"elevationGain":800,"elevationLoss":800,"grade":3,"mapGeoJson":{"features":[{"geometry":{"coordinates":[[8.681731224060059,59.863635284300486],[8.678555488586426,59.86109275130626],[8.675894737243652,59.85755873862332],[8.67443561553955,59.85320535334565],[8.673405647277832,59.847213129325134],[8.671088218688965,59.843979466769454],[8.666796684265137,59.842082238523794],[8.66370677947998,59.843117103698326],[8.66147518157959,59.84535920121658],[8.658385276794434,59.84717001589073],[8.65649700164795,59.84928250850204],[8.65546703338623,59.85096378434415]],"type":"LineString"},"properties":{"name":"Tour path"},"rando_type":10,"type":"Feature"},{"geometry":{"coordinates":[[8.655316829681396,59.85152419075019],[8.65803088810435,59.85228955106696],[8.663529381122999,59.853210989474874],[8.671410083770752,59.854800223964524]],"type":"LineString"},"properties":{"name":"Tour path"},"rando_type":12,"type":"Feature"},{"geometry":{"coordinates":[[8.653020858764648,59.85329156452263],[8.655616822869433,59.85449852187604],[8.657429888368256,59.85501577374399],[8.659800975299731,59.85643815556325],[8.668513298034668,59.860101541728596]],"type":"LineString"},"properties":{"name":"Tour path"},"rando_type":12,"type":"Feature"},{"geometry":{"coordinates":[[8.651776313781738,59.85441228949826],[8.654479449755854,59.85746172673896],[8.659050069277555,59.860230840024066],[8.665938377380371,59.86098501256542]],"type":"LineString"},"properties":{"name":"Tour path"},"rando_type":12,"type":"Feature"},{"geometry":{"coordinates":[[8.653836250305176,59.852589296087835],[8.65548849105835,59.85320355722227],[8.656518459320068,59.85403333057462],[8.657441139221191,59.85494929011747]],"type":"LineString"},"properties":{"name":"Tour path"},"rando_type":12,"type":"Feature"},{"geometry":{"coordinates":[8.655381202697754,59.851130829548616],"type":"Point"},"properties":{"name":"Summit point"},"rando_type":20,"type":"Feature"}],"type":"FeatureCollection"},"clientId":"gaustatoppen","id":"gaustatoppen"};

  tourItemsRouter.get('/', function(req, res) {
    res.send({
      'tourItems': [tour1, tour2]
    });
  });

  tourItemsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  tourItemsRouter.get('/:id', function(req, res) {
    res.send({
      'tour-items': {
        id: req.params.id
      }
    });
  });

  tourItemsRouter.put('/:id', function(req, res) {
    res.send({
      'tour-items': {
        id: req.params.id
      }
    });
  });

  tourItemsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/tour_items', require('body-parser').json());
  app.use('/api/tourItems', tourItemsRouter);
};
