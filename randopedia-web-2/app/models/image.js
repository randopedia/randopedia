import { computed } from '@ember/object';
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    imageData: attr(),
    imageFile: attr(),
    tour: DS.belongsTo('tour', {inverse: 'images'}),
    caption: attr(),
    isPortfolio: attr(),
    
    isUpdateDisabled: computed('hasDirtyAttributes', 'isSaving', function() {
        return !this.get('hasDirtyAttributes') || this.get('isSaving');
    }),
    
    isDeleteDisabled: computed('isSaving', function() {
        return this.get('isSaving');
    })
});