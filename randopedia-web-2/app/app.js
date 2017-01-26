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

    ready: function() {
        if (locationHelper.removeAndRedirectPageIfUrlContainsHashbang()) {
            return;
        }

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
