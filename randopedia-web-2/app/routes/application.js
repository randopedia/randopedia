import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import LocationHelper from '../utils/location-helper';

export default Route.extend({
  login: service(),
  language: service(),

  setupController() {
    this.get('login').performBackgroundLogIn();
    this.get('language').setLanguage(LocationHelper.resolveLanguageCodeFromLocation());
  }
});
