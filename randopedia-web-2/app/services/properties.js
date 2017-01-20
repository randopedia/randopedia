import Ember from 'ember';

export default Ember.Service.extend({
  tourForMapView : null,

  setTourForMapView: function(tour) {
    this.set('tourForMapView', tour);
  },
  getTourForMapView: function() {
    return this.get('tourForMapView');
  }

});
