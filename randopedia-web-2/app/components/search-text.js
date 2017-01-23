import Ember from 'ember';
import texts from '../utils/texts';

export default Ember.TextField.extend({
    text: Ember.inject.service(),
    attributeBindings: ['placeholder'],
    placeholder: null,
    classNames: ['form-control','search-textfield'],

    didInsertElement() {
        this.set("placeholder", this.get("text").getText('search_placeholder'));
    }
});
