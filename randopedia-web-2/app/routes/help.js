import Ember from 'ember';

export default Ember.Route.extend({
    language: Ember.inject.service(),

    setupController(controller /*, models */) {
        controller.set('language', this.get('language'));
    }
});
