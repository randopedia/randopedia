import Ember from 'ember';

export default Ember.Service.extend({
    numberRegex: "[0-9]+",
    nameRegex: "^.{3,80}$",

    // Positive number values, zero not allowed, floats not allowed
    isPosNumber: function(value) {
        if (isNaN(value) || value < 1) {
             return false;
        }
        
        if(parseFloat(value) !== parseInt(value, 10 /* 10 for decimal system */)){
            return false;
        }
        
        return true;
    },
    
    isPosNumberOrNull: function(value) {
        if (!value || (typeof(value) === 'string' && value.trim().length === 0)) {
             return true;
        }
        return this.isPosNumber(value);
    },
    
    // Validates a name, 3-80 chars, null not allowed.
    name: function(value) {
        if (!value) {
             return false;
        }
        return value.trim() && this.length(3, 80, value);
    },
    
    // Max 500 chars
    shortDesc: function(value, allowNull) {
        return this.lengthOrNull(value, 1, 500, allowNull);
    },
    
    // Max 1000 chars
    mediumDesc: function(value, allowNull) {
        return this.lengthOrNull(value, 1, 1000, allowNull);
    },
    
    // Max 10000 chars
    longDesc: function(value, allowNull) {
        return this.lengthOrNull(value, 1, 10000, allowNull);
    },
    
    length: function(min, max, value){
        if (!value) {
             value = '';
        }
        return value.trim().length >= min && value.trim().length <= max;
    },
    
    lengthOrNull: function(value, min, max, allowNull) {
        if(!allowNull){
            if (!value) {
                 return false;
            }
        }
        
        if(!value){
            return true;
        }
        return value.trim().length >= min && value.trim().length <= max;
    },
    
    isNotNull: function(value) {
        if (!value) {
             return false;
        }
        return true;
    },
    
    isNotNullOrEmpty: function(value) {
        if (!value) {
             return false;
        }
        if (typeof(value) === 'string' && value.trim().length < 1) {
             return false;
        }
        return true;
    }
});
