import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  emberOauth2: service(),
  login: service(),

  setupController() {
    var hash = window.location.hash;
    if(hash && hash.indexOf('state') >= 0) {
      window.opener.postMessage(hash, window.location.origin);
      window.close();
    }
  }

});
