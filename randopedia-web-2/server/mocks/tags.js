/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var tagsRouter = express.Router();

  var tags = [{
      "name":"topptur",
      "value":20,
      "popularity":5,
      "tag":"topptur",
      "__v":0,
      "id":"topptur"
    },{
      "name":"lykkja",
      "value":6,
      "popularity":1,
      "tag":"lykkja",
      "__v":0,
      "id":"lykkja"
    },{
      "name":"cruising",
      "value":4,
      "popularity":1,
      "tag":"cruising",
      "__v":0,
      "id":"cruising"
    },{
      "name":"telemark",
      "value":3,
      "popularity":0,
      "tag":"telemark",
      "__v":0,
      "id":"telemark"
    },{
      "name":"storulvån",
      "value":3,
      "popularity":0,
      "tag":"storulvån",
      "__v":0,
      "id":"storulvån"
    },{
      "name":"hemsedal",
      "value":17,
      "popularity":4,
      "tag":"hemsedal",
      "__v":0,"id":"hemsedal"
    }];

    var tag = {"name":"hemsedal","value":2,"popularity":0,"tag":"hemsedal","__v":0,"id":"hemsedal","tours":["bukkehamaren","hogdebrotet"]};

  tagsRouter.get('/', function(req, res) {
    res.send({
      'tags': tags
    });
  });

  tagsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  tagsRouter.get('/:id', function(req, res) {
    res.send({
      'tag': tag
    });
  });

  tagsRouter.put('/:id', function(req, res) {
    res.send({
      'tag': {
        tag
      }
    });
  });

  tagsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/tags', require('body-parser').json());
  app.use('/api/tags', tagsRouter);
};
