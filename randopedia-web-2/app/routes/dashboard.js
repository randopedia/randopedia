import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      tags : this.get('store').findAll('tag'),
      statistics : this.get('store').findRecord('stat', 1),
      tours : this.get('store').query('tour', {status : Fixtures.TourStatus.LAST_UPDATED})
    });
  },

  setupController(controller, models) {
    console.log(models.tags);
    console.log(models.statistics);
    controller.set('tags', models.tags);
    controller.set('stats', models.statistics);
    controller.set('tours', models.tours);
  }
});
