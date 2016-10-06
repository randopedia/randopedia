import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Service.extend({
    language: null,

    isEnglish: Ember.computed('language', function() {
        return !this.language || this.language === Fixtures.LanguageCodes.ENG;
    }),

    isNorwegian: Ember.computed('language', function() {
        return this.language === Fixtures.LanguageCodes.NO;
    })
});
