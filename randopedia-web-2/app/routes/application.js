import Ember from 'ember';
import LocationHelper from '../utils/location-helper';

export default Ember.Route.extend({
  login: Ember.inject.service(),
  language: Ember.inject.service(),

  setupController() {
    this.get('login').performBackgroundLogIn();
    this.get('language').setLanguage(LocationHelper.resolveLanguageCodeFromLocation());
  }
});
