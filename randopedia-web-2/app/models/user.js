import DS from 'ember-data';

export default DS.Model.extend({
  token : DS.attr('string'),
  tokenExp : DS.attr('date'),
  userName : DS.attr('string'),
  userId : DS.attr('string'),
  longLivedToken : DS.attr('string'),
  authenticated : DS.attr('boolean')
});
