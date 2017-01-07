import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  name: attr(),
  value: attr(),
  popularity: attr(),
  tours: DS.hasMany('tour', { async: true })
});
