import { inject as service } from '@ember/service';
import TextField from '@ember/component/text-field';

export default TextField.extend({
    text: service(),
    attributeBindings: ['placeholder'],
    placeholder: null,
    classNames: ['form-control','search-textfield'],

    didInsertElement() {
        this.set("placeholder", this.get("text").getText('search_placeholder'));
    }
});
