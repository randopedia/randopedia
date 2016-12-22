/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  var user =  {"id":"615412384","_class":"no.extreme.randopedia.model.user.User","userId":"615412384","userName":"Awesome Randouser","authenticated":true,"token":"EAAFfZC3FAZCnMBAB5TpFZBZB9MgXqf9Fu40JXCWUy8Q3xZB8oWd8ahNObKyc849ZA6DmHpigZC7gOur5m7G7srwq0zmdXigqLy0490NiqpmH2XjeesW961ca0SG9A85lWZAgd30y0snWH8alZBo7KmchwywDTnaqLgBAtQgkoQ9E17AZDZD"}


  usersRouter.get('/', function(req, res) {
    res.send({
      'users': []
    });
  });

  usersRouter.post('/', function(req, res) {
    //res.status(201).end();
    res.send({
      'user': user
    })
  });

  usersRouter.get('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/users', require('body-parser').json());
  app.use('/api/users', usersRouter);
};
