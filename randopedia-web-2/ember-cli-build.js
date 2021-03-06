/* eslint-env node */
'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    nodeModulesToVendor: [
      'node_modules/togeojson/',
      'node_modules/moment/min/'
    ]
  });

  if(app.env === 'production') {
    app.options.minifyJS.enabled = true;
  }

  app.import('vendor/FileSaver.min.js');
  app.import('vendor/marked.js');
  app.import('vendor/togpx.js');
  app.import('vendor/jssor.slider.min.js');
  app.import('vendor/jquery.bootstrap-growl.min.js');
  app.import('vendor/markerclusterer.js');
  app.import('vendor/geojson-utils.js');
  app.import('vendor/togeojson.js');
  app.import('vendor/moment.min.js');
  app.import('vendor/shims/moment.js');
  app.import('vendor/shims/togeojson.js');
  app.import('node_modules/jqcloud2/dist/jqcloud.min.js')


  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
