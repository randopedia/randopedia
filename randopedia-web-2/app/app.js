import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import locationHelper from './utils/location-helper';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver,
    language: null,

    ready: function() {
        if (locationHelper.removeAndRedirectPageIfUrlContainsHashbang()) {
            return;
        }

        var url = document.location.toString();
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
            url = 'http://localhost:9001';
            facebookAppId = config.EmberENV.facebookAppIdLocalhost;
            googleAppId = config.EmberENV.googleAppIdLocalhost;
        }
        
        // Facebook api initialization
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/sv_SE/sdk.js#xfbml=1&version=v2.5&appId=" + config.EmberENV.facebookAppIdProd;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

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
