import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  token : DS.attr('string'),
  tokenExp : DS.attr('date'),
  userName : DS.attr('string'),
  userId : DS.attr('string'),
  longLivedToken : DS.attr('string'),
  authenticated : DS.attr('boolean')
});
