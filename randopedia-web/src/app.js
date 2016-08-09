var App = Ember.Application.create({
    LOG_TRANSITIONS : true,
    LOG_BINDINGS : true,
    currentPath: null,
    language: null,
    
    ready: function() {
        if (LocationHelper.removeAndRedirectPageIfUrlContainsHashbang()) {
            return;
        }

        var url = document.location.toString();
        var host = url.split('randopedia')[0];
        var hash = url.indexOf('#');

        if(hash > 0) {
            url = url.slice(0, hash);
        }
        var facebookAppId = '';
        var googleAppId = '';

        if(url.indexOf('test') > 0) {
            facebookAppId = App.Config.facebookAppIdTest;

        } else if(url.indexOf('www.randopedia.net') > 0) {
            facebookAppId = App.Config.facebookAppIdProd;
            googleAppId = App.Config.googleAppIdProd;
            url = 'http://www.randopedia.net';

        } else if (url.indexOf('randopedia.net') > 0) {
            facebookAppId = App.Config.facebookAppIdProd;
            googleAppId = App.Config.googleAppIdProd;
            url = 'http://randopedia.net';

        } else {
            var html = url.indexOf('index.html');
            url = 'http://localhost:9001';
            facebookAppId = App.Config.facebookAppIdLocalhost;
            googleAppId = App.Config.googleAppIdLocalhost;
        }
        
        Ember.OAuth2.config = {
            facebook: {
                clientId: facebookAppId,
                authBaseUri: 'https://www.facebook.com/dialog/oauth',
                redirectUri: url + '/auth/facebook/callback',
                scope: ''
            },
            google: {
                clientId: googleAppId,
                authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: url + '/auth/google/callback',
                scope: 'https://www.googleapis.com/auth/userinfo.profile'
            }
        };       

        App.oauth = Ember.OAuth2.create();
    },

    setAppLanguageFromLanguageCodeInUrl: function () {
        App.language = LocationHelper.resolveLanguageCodeFromLocation();
        return App.language;
    }
});

App.ApplicationAdapter = DS.RESTAdapter;

App.Utils = Ember.Object.create({
    log: function(message){
        if(console && console.log){
            console.log(message);
        }
    }
});

App.Alerts = Ember.Object.create({
    showMessage: function (message, type, delayParam) {
        $.bootstrapGrowl(message, {
            ele: 'body',
            type: type,
            offset: { from: "top", amount: 70 },
            align: "right",
            allow_dismiss: true,
            delay: delayParam !== undefined && delayParam !== null ? delayParam : 4000,
            width: 'auto'
        });
    },
    showSuccessMessage: function (message, delayParam) {
        this.showMessage(message, "success", delayParam);
    },
    showErrorMessage: function (message) {
        this.showMessage(message, "danger", 0);
    },
    long_delay : 7000
});

(function () {
    var get = Ember.get, set = Ember.set;
    var hashbangLocation = Ember.HashLocation.extend({
        getURL: function () {
            return get(this, 'location').hash.substr(2);
        },
        setURL: function (path) {
            get(this, 'location').hash = "!" + path;
            set(this, 'lastSetURL', "!" + path);
        },
        onUpdateURL: function (callback) {
            var self = this;
            var guid = Ember.guidFor(this);

            Ember.$(window).bind('hashchange.ember-location-' + guid, function () {
                Ember.run(function () {
                    var path = location.hash.substr(2);
                    if (get(self, 'lastSetURL') === path) { return; }

                    set(self, 'lastSetURL', null);

                    callback(location.hash.substr(2));
                });
            });
        },
        formatURL: function (url) {
            return '#!' + url;
        }
    });

    App.register('location:hashbang', hashbangLocation);

})();

App.Router.reopen({
    location: 'history',
    rootURL: '/' + App.setAppLanguageFromLanguageCodeInUrl(),
    notifyGoogleAnalytics: function() {
        return ga('send', 'pageview', {
            'page': this.get('url'),
            'title': this.get('url')
        });
    }.on('didTransition')

});

DS.RESTAdapter.reopen({
    host : function() {
        return App.Config.host;
    }.property(),
    ajax: function(url, type, hash) {
        var adapter = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          hash = hash || {};
          hash.url = url;
          hash.type = type;
          hash.dataType = 'json';
          hash.context = adapter;

          if (hash.data && type !== 'GET') {
            hash.contentType = 'application/json; charset=utf-8';
            hash.data = JSON.stringify(hash.data);
          }
          if (adapter.headers !== undefined) {
            var headers = adapter.headers;
            hash.beforeSend = function (xhr) {
              forEach.call(Ember.keys(headers), function(key) {
                xhr.setRequestHeader(key, headers[key]);
              });
            };
          }
          
          hash.beforeSend = function(xhr) {
              var token = App.oauth.getToken();
              if(token !== null && typeof token !== 'undefined') {
                  var expires = new Date(token.expires_in*1000);
                  var now = new Date();
                  if(expires > now) {
                      xhr.setRequestHeader('X-Header-Token', App.oauth.getAccessToken());
                      xhr.setRequestHeader('X-Header-Provider', App.oauth.getToken().provider_id);
                  }
              }

              xhr.setRequestHeader('X-Header-Language', App.language);
          };
          
          hash.success = function(json) {
            Ember.run(null, resolve, json);
          };

          hash.error = function(jqXHR, textStatus, errorThrown) {
            if (jqXHR) {
              jqXHR.then = null;
            }

            Ember.run(null, reject, jqXHR);
          };
          Ember.$.ajax(hash);
        });
      }
});

App.RawTransform = DS.Transform.extend({
    deserialize: function(serialized) {
      return serialized;
    },
    serialize: function(deserialized) {
      return deserialized;
    }
});
