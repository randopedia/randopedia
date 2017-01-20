import Ember from 'ember';
import texts from '../utils/texts';

export default Ember.Helper.extend({
  language : Ember.inject.service(),
  compute(id) {
    let language = this.get('language');
    return texts.get(id, language.getLanguage());
  }
});
