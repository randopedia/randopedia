/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'randopedia-web-2',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

      ENV.host = "/randopedia/api";
      ENV.port = "8080";
      ENV.facebookAppIdTest = "181281108742349";
      ENV.facebookAppIdLocalhost = "579258552116376";
      ENV.facebookAppIdProd = "387025698094707";

      ENV.googleAppIdTest = "";
      ENV.googleAppIdLocalhost = "991673526883.apps.googleusercontent.com";
      ENV.googleAppIdProd = "719190645609-c0ogrmvrbtgbl5ohlb81d0lflf31uo51.apps.googleusercontent.com";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
