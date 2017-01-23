import Ember from 'ember';
import Fixtures from '../utils/fixtures';

export default Ember.Service.extend({

    isEnglish: Ember.computed('language', function() {
        var language = this.get("language");
        return !language || language === Fixtures.LanguageCodes.ENG;
    }),

    isNorwegian: Ember.computed('language', function() {
        return this.get("language") === Fixtures.LanguageCodes.NO;
    }),

    getLanguage : function() {
        return this.get("language");
    },

    setLanguage: function(language) {
        this.set("language", language);
    }
});
