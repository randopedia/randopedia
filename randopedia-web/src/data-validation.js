App.Validate = Ember.Object.create({
    
    numberRegex: "[0-9]+",
    nameRegex: "^.{3,80}$",

    // Positive number values, zero not allowed, floats not allowed
    isPosNumber: function(value) {
        if(isNaN(value) || value < 1) { return false; }
        
        if(parseFloat(value) != parseInt(value, 10 /* 10 for decimal system */)){
            return false;
        }
        
        return true;
    },
    
    isPosNumberOrNull: function(value) {
        if(!value){ return true; }
        return this.isPosNumber(value);
    },
    
    // Validates a name. (Usage examples: Tour and Area names)
    name: function(value) {
        if(!value) { return false; }
        return value.trim() && this.length(3, 80, value);
    },
    
    // Max 300 chars
    shortDesc: function(value, allowNull) {
        return this.lengthOrNull(value, 0, 300, allowNull);
    },
    
    // Max 1000 chars
    mediumDesc: function(value, allowNull) {
        return this.lengthOrNull(value, 0, 1000, allowNull);
    },
    
    // Max 8000 chars
    longDesc: function(value, allowNull) {
        return this.lengthOrNull(value, 0, 8000, allowNull);
    },
    
    length: function(min, max, value){
        if(!value) { text = ''; }
        return value.trim().length >= min && value.trim().length <= max;
    },
    
    lengthOrNull: function(value, min, max, allowNull) {
        if(!allowNull){
            if(!value){ return false; }
        }
        
        if(!value){
            return true;
        }
        return value.trim().length >= min && value.trim().length <= max;
    },
    
    isNotNull: function(value) {
        if(!value){ return false; }
        return true;
    },
    
    isNotNullOrEmpty: function(value) {
        if(!value){ return false; }
        if(typeof(value) === 'string' && value.trim().length < 1){ return false; }
        return true;
    }

});

App.Validate.Msg = Ember.Object.create({
    name: 'Names must be between 3 and 80 characters',
    description: 'Max 300 characters are allowed', 
    itinerary: 'Max 8000 characters are allowed',
    number: 'Invalid entry', //'Only positive numeric values are allowed'
});