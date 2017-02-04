import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  publishedTours : attr('number'),
  registeredUsers : attr('number'),
  tourDrafts : attr('number'),
  totalGain : attr('number'),
  totalLoss : attr('number'),
});
