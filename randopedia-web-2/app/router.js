import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tours');
  this.route('tour', { path: '/tours/:tour_id' });
  this.resource('tour.edit', {path:'/tours/:tour_id/edit'});
  this.resource('tour.new', {path:'/tours/new'});
  this.route('about');
  this.route('help');
  this.route('dashboard');
  this.route('auth', function() {
    this.route('facebook', function() {
      this.route('callback');
    });
  });
  this.route('mytours');
  this.route('tags');
  this.route('tag', {path: '/tags/:tag_id'});
});

export default Router;
