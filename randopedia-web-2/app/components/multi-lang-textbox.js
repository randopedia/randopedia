import Ember from 'ember';

export default Ember.Component.extend({
    language: Ember.inject.service(),
    isDisabled: false,
    englishId: null,
    norwegianId: null,
    
    didInsertElement: function() {
        this.set("englishId", "eng" + this.getRandomInt());
        this.set("norwegianId", "no" + this.getRandomInt()); 
    },

    getRandomInt: function() {
        var min = 1, max = 2000;
        return Math.floor(Math.random() * (max - min)) + min;
    }
});
