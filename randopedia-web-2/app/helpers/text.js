import Ember from 'ember';

export default Ember.Helper.extend({
  text : Ember.inject.service(),

  compute (id) {
    return this.get("text").getText(id);
  }
});
