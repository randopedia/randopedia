import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: getLanguageFromUrl(window.location.pathname)
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

function getLanguageFromUrl(url) {
  if(url.indexOf('/') >= 0) {
    var parts = url.split('/');
    if(parts.length > 1) {
      var lang = parts[1];
      if('no' === lang) {
        return '/no/';
      } else {
        return '/';
      }
    } else {
      return '/';
    }
  } else {
    return '/';
  }
}

export default Router;
