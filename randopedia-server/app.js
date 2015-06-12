var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var tours = require('./routes/tours');
var touritems = require('./routes/touritems');
var actions = require('./routes/actions');
var tags = require('./routes/tags');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth', auth);
app.use('/randopedia/api/users/', users);
app.use('/randopedia/api/tours/', tours);
app.use('/randopedia/api/actions/', actions);
app.use('/randopedia/api/touritems/', touritems);
app.use('/randopedia/api/tags/', tags);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var mongoose = require('mongoose');

var connectString = 'mongodb://localhost/randopedia';
var mongoOptions = {};

mongoose.connect(connectString, mongoOptions, function(err, res) {
    if(err) {
        console.log('Could not connect to database. ' + err);
    } else {
        console.log('Connected to database');
    }
});

var server = app.listen(8080, function () {

    var connectString = 'mongodb://localhost/randopedia';
    var mongoOptions = {};
    
    mongoose.connect(connectString, mongoOptions, function(err, res) {
        if(err) {
            console.log('Could not connect to database');
        } else {
            console.log('Connected to database');
        }
    });

    console.log("Randopedia app listening at http://%s:%s", server.address().address, server.address().port);
});
                                 
module.exports = app;
