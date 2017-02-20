import Ember from 'ember';

export default Ember.Route.extend({
  emberOauth2: Ember.inject.service(),
  login: Ember.inject.service(),

  setupController() {
    var hash = window.location.hash;
    if(hash && hash.indexOf('state') >= 0) {
      window.opener.postMessage(hash, window.location.origin);
      window.close();
    }
  }

});
