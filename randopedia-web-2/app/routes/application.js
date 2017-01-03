import Ember from 'ember';

export default Ember.Route.extend({
  login: Ember.inject.service(),

  setupController(controller, model) {
    var login = this.get('login');
    login.performBackgroundLogIn();
  }
});
