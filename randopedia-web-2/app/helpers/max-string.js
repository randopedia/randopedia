import Ember from 'ember';
import texts from '../utils/texts';

// Appending '...' to strings longer that the defined max length

export default Ember.Helper.helper(function(params) {
    if(!params || !params[0]) { 
        return ""; 
    }
    var string = params[0];
    return string.length > maxLength ? string.substring(0, maxLength - 3) + "..." : string;
});
