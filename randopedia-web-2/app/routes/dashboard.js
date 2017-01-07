import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Route.extend({
  login: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      tags : this.get('store').findAll('tag'),
      //TODO: statistics : this.get('store').findAll('stat', 1),
      tours : this.get('store').query('tourItem', {status : Fixtures.TourStatus.LAST_UPDATED})
    });
  },

  setupController(controller, models) {
    controller.set('tags', models.tags);
    controller.set('stats', models.statistics);
    controller.set('tours', models.tours);
  }
});
