import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  name: attr(),
  accessPoint: attr(),
  itinerary: attr()
});
