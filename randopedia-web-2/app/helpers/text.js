import Ember from 'ember';
import texts from '../texts';

export function text(id) {
    return texts.get(id);
}

export default Ember.Helper.helper(text);
