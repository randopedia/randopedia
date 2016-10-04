import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tours');
  this.route('tour', { path: '/tours/:tour_id' });
  this.route('about');
  this.route('help');
  this.route('dashboard');
});

export default Router;
