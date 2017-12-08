import Application from '@ember/application';
import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import locationHelper from './utils/location-helper';

Ember.MODEL_FACTORY_INJECTIONS = true;

let App = Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver,

    ready: function() {
        if (locationHelper.removeAndRedirectPageIfUrlContainsHashbang()) {
            return;
        }

        if (locationHelper.redirectToNorwegian()) {
          return;
        }

        var location = document.location.toString();
        var domain, facebookClientId, googleClientId;

        if(location.indexOf('localhost:4200') > 0) {
            domain = "localhost:4200";
            facebookClientId = '579258552116376';
            googleClientId = '991673526883.apps.googleusercontent.com';

        } else if(location.indexOf('randopedia.net') > 0) {
            if(location.indexOf('www.randopedia.net') > 0) {
                domain = 'www.randopedia.net';
            } else {
                domain = 'randopedia.net';
            }
            facebookClientId = '387025698094707';
            googleClientId = '719190645609-c0ogrmvrbtgbl5ohlb81d0lflf31uo51.apps.googleusercontent.com';
        }

        window.EmberENV['ember-oauth2'] = {
            facebook: {
                clientId: facebookClientId,
                authBaseUri: 'https://www.facebook.com/dialog/oauth',
                redirectUri: 'http://' + domain + '/auth/facebook/callback',
                scope: ''
            },
            google: {
                clientId: googleClientId,
                authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: 'http://' + domain + '/auth/google/callback',
                scope: 'https://www.googleapis.com/auth/userinfo.profile'
            }
        };

        // Facebook api initialization
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/sv_SE/sdk.js#xfbml=1&version=v2.5&appId=" + config.EmberENV.facebookAppIdProd;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
});

loadInitializers(App, config.modulePrefix);

export default App;
