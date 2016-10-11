import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  name: attr('string'),
  value: attr('number'),
  popularity: attr('number'),
  tours: DS.hasMany('tour', { async: true })
});
