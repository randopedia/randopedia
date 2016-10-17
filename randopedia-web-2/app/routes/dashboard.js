import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      tags : this.get('store').findAll('tag'),
      statistics : this.get('store').findRecord('stat', 1)
    });
  },

  setupController(controller, models) {
    console.log(models.tags);
    console.log(models.statistics);
    controller.set('tags', models.tags);
    controller.set('stats', models.statistics);
  }
});
