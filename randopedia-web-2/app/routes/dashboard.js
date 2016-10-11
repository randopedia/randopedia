import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      tags : this.get('store').findAll('tag')
    });
  },

  setupController(controller, models) {
    controller.set('tags', models.tags);
  }
});
