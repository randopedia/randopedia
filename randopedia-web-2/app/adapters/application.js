import Ember from 'ember';
import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend({
    namespace: 'api',
    emberOauth2: Ember.inject.service(),
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
              Ember.keys(headers).forEach(function(key) {
                xhr.setRequestHeader(key, headers[key]);
              });
            };
          }

          hash.beforeSend = function(xhr) {
              var emberOauth2 = adapter.get('emberOauth2');
              var token = emberOauth2.getToken();
              if(token !== null && typeof token !== 'undefined') {
                  var expires = new Date(token.expires_in*1000);
                  var now = new Date();
                  if(expires > now) {
                      xhr.setRequestHeader('X-Header-Token', emberOauth2.getAccessToken());
                      xhr.setRequestHeader('X-Header-Provider', emberOauth2.getToken().provider_id);
                  }
              }

              //xhr.setRequestHeader('X-Header-Language', App.language);
          };

          hash.success = function(json) {
            Ember.run(null, resolve, json);
          };

          hash.error = function(jqXHR, textStatus, errorThrown) {
            if (jqXHR) {
              jqXHR.then = null;
            }

            Ember.run(null, reject, jqXHR);

            console.log(textStatus);
            console.log(errorThrown);
          };
          Ember.$.ajax(hash);
        });
    }
});
