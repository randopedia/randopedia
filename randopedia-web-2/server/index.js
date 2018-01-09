/*jshint node:true*/

module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  var morgan  = require('morgan');
  app.use(morgan('dev'));

  // Comment out if running proxy API
  // mocks.forEach(function(route) { route(app); });

  proxies.forEach(function(route) { route(app); });

};
