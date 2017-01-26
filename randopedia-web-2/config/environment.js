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
      },
      'ember-oauth2': {}
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

    var google = {
      clientId: '991673526883.apps.googleusercontent.com',
      authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: 'http://localhost:4200' + '/auth/google/callback',
      scope: 'public write'
    };

    var facebook = {
      clientId: '579258552116376',
      authBaseUri: 'https://www.facebook.com/dialog/oauth',
      redirectUri: 'http://localhost:4200' + '/auth/facebook/callback',
      scope: ''
    }

    ENV.host = "/randopedia/api";
    ENV.port = "8080";
    
    ENV.EmberENV['ember-oauth2'].google = google;
    ENV.EmberENV['ember-oauth2'].googleWWW = google;
    ENV.EmberENV['ember-oauth2'].facebook = facebook;
    ENV.EmberENV['ember-oauth2'].facebookWWW = facebook;
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

    function getGoogle(url) {
      return {
        clientId: '719190645609-c0ogrmvrbtgbl5ohlb81d0lflf31uo51.apps.googleusercontent.com',
        authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: 'http://' + url + '/auth/google/callback',
        scope: 'https://www.googleapis.com/auth/userinfo.profile'
      };
    }

    function getFacebook(url) {
      return {
        clientId: '387025698094707',
        authBaseUri: 'https://www.facebook.com/dialog/oauth',
        redirectUri: 'http://' + url + '/auth/facebook/callback',
        scope: ''
      };
    }

    ENV.EmberENV['ember-oauth2'].google = getGoogle('randopedia.net');
    ENV.EmberENV['ember-oauth2'].googleWWW = getGoogle('www.randopedia.net');
    ENV.EmberENV['ember-oauth2'].facebook = getFacebook('randopedia.net');
    ENV.EmberENV['ember-oauth2'].facebookWWW = getFacebook('www.randopedia.net');

    ENV.minifyJS = {
        enabled: false
    };
  }

  return ENV;
};
