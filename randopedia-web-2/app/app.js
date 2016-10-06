import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver,
    language: null,

    ready: function() {
        // todo ...
        //if (LocationHelper.removeAndRedirectPageIfUrlContainsHashbang()) {
        //    return;
        //}

        var url = document.location.toString();
        var host = url.split('randopedia')[0];
        var hash = url.indexOf('#');

        if(hash > 0) {
            url = url.slice(0, hash);
        }
        var facebookAppId = '';
        var googleAppId = '';

        if(url.indexOf('test') > 0) {
            facebookAppId = config.EmberENV.facebookAppIdTest;

        } else if(url.indexOf('www.randopedia.net') > 0) {
            facebookAppId = config.EmberENV.facebookAppIdProd;
            googleAppId = config.EmberENV.googleAppIdProd;
            url = 'http://www.randopedia.net';

        } else if (url.indexOf('randopedia.net') > 0) {
            facebookAppId = config.EmberENV.facebookAppIdProd;
            googleAppId = config.EmberENV.googleAppIdProd;
            url = 'http://randopedia.net';

        } else {
            var html = url.indexOf('index.html');
            url = 'http://localhost:9001';
            facebookAppId = config.EmberENV.facebookAppIdLocalhost;
            googleAppId = config.EmberENV.googleAppIdLocalhost;
        }
        
        // todo ...
        //Ember.OAuth2.config = {
        //    facebook: {
        //        clientId: facebookAppId,
        //        authBaseUri: 'https://www.facebook.com/dialog/oauth',
        //        redirectUri: url + '/auth/facebook/callback',
        //        scope: ''
        //    },
        //    google: {
        //        clientId: googleAppId,
        //        authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
        //        redirectUri: url + '/auth/google/callback',
        //        scope: 'https://www.googleapis.com/auth/userinfo.profile'
        //    }
        //};       

        //App.oauth = Ember.OAuth2.create();
    },
});

loadInitializers(App, config.modulePrefix);

export default App;
