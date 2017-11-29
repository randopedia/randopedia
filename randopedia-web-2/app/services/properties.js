import Service from '@ember/service';

export default Service.extend({
  tourForMapView : null,

  setTourForMapView: function(tour) {
    this.set('tourForMapView', tour);
  },
  getTourForMapView: function() {
    return this.get('tourForMapView');
  }

});
