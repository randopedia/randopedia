import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    time: attr(),
    userId : attr(),
    userName : attr(),
    comment : attr(),
    type: attr(),
    tour: DS.belongsTo('tour')
});
