import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    imageData: attr(),
    imageFile: attr(),
    tour: DS.belongsTo('tour', {inverse: 'images'}),
    caption: attr(),
    isPortfolio: attr(),
    
    isUpdateDisabled: Ember.computed('isDirty', 'isSaving', function() {
        return !this.get('isDirty') || this.get('isSaving');
    }),
    
    isDeleteDisabled: Ember.computed('isSaving', function() {
        return this.get('isSaving');
    })
});