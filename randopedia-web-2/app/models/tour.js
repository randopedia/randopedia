import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  name: attr(),
  accessPoint: attr(),
  itinerary: attr(),
  timingMax: attr(),
  timingMin: attr(),
  elevationGain: attr(),
  elevtationLoss: attr(),
  elevationMax: attr(),
  elevationMin: attr(),
  degreesMax: attr(),
  timeOfYearFrom: attr(),
  timeOfYearTo: attr(),
  mapGeoJson: attr(),
  grade: attr(),
  status: attr(),
  aspect: attr(),
  tags: attr()
});
