import Ember from 'ember';

export default Ember.TextField.extend({
    attributeBindings: ['placeholder'],
    placeholder: 'Search ski tours...',
    classNames: ['form-control','search-textfield'],
});
