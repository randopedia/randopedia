import { computed } from '@ember/object';
import Service from '@ember/service';
import Fixtures from '../utils/fixtures';

export default Service.extend({

    isEnglish: computed('language', function() {
        var language = this.get("language");
        return !language || language === Fixtures.LanguageCodes.ENG;
    }),

    isNorwegian: computed('language', function() {
        return this.get("language") === Fixtures.LanguageCodes.NO;
    }),

    getLanguage : function() {
        return this.get("language");
    },

    setLanguage: function(language) {
        this.set("language", language);
    },

    translateProperty: function(model, propertyName) {
        if(!model) {
            return null;
        }

        var no = "No", eng = "Eng";
        
        if(this.get("isNorwegian") && this.isNotNullOrEmpty(model.get(propertyName + no))) {
            return model.get(propertyName + no);
        }

        var englishText = model.get(propertyName + eng);
        // if english does not exist, show norwegian (if that exists)
        englishText = this.getValueFromOtherIfNull(englishText, model.get(propertyName + no));
        return englishText;
    },

    isNotNullOrEmpty: function(str) {
        return str && str.length && str.length > 0;
    },

    getValueFromOtherIfNull: function (text1, text2) {
        if(!this.isNotNullOrEmpty(text1) && this.isNotNullOrEmpty(text2)) {
            return text2;
        }
        return text1;
    }    
});
