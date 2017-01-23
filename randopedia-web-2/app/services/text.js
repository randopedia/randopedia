import Ember from 'ember';
import texts from '../utils/texts';

export default Ember.Service.extend({
    language: Ember.inject.service(),

    getText: function (identifier) {
        if (!texts.dictionary[identifier]) {
            console.log("Couldn't resolve text " + identifier);
            return "";
        }

        var language = this.get("language").getLanguage();

        if (language === "no") {
            if (!texts.dictionary[identifier].no) {
                console.log("Couldn't resolve norwegian text for " + identifier);
                return "";
            }
            return texts.dictionary[identifier].no;

        } else {
            if (!texts.dictionary[identifier].eng) {
                console.log("Couldn't resolve english text for " + identifier);
                return "";
            }
            return texts.dictionary[identifier].eng;
        }
    }
});
