import Ember from 'ember';
import Fixtures from '../utils/fixtures';
import LocationHelper from '../utils/location-helper';

export default Ember.Service.extend({

    isEnglish: Ember.computed('language', function() {
        var language = LocationHelper.resolveLanguageCodeFromLocation();
        return !language || language === Fixtures.LanguageCodes.ENG;
    }),

    isNorwegian: Ember.computed('language', function() {
        return LocationHelper.resolveLanguageCodeFromLocation() === Fixtures.LanguageCodes.NO;
    }),
    getLanguage : function() {
      return LocationHelper.resolveLanguageCodeFromLocation();
    }
});
