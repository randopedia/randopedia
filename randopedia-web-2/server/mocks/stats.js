/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var statsRouter = express.Router();

  var stat = {"id":"1","publishedTours":94,"registeredUsers":42,"tourDrafts":4,"totalGain":69271,"totalLoss":92656};

  statsRouter.get('/', function(req, res) {
    res.send({
      'stats': []
    });
  });

  statsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  statsRouter.get('/:id', function(req, res) {
    res.send({
      'stat': stat
    });
  });

  statsRouter.put('/:id', function(req, res) {
    res.send({
      'stats': {
        id: req.params.id
      }
    });
  });

  statsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/stats', require('body-parser').json());
  app.use('/api/stats', statsRouter);
};
