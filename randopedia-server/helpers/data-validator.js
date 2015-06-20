var validator = {
    
    numberRegex: "[0-9]+",
    nameRegex: "^.{3,80}$",

    // Positive number values, zero not allowed, floats not allowed
    isPosNumber: function(value) {
        if (isNaN(value) || value < 1) {
             return false;
        }
        
        if(parseFloat(value) != parseInt(value, 10 /* 10 for decimal system */)){
            return false;
        }
        
        return true;
    },
    
    isPosNumberOrNull: function(value) {
        if (!value) {
             return true;
        }
        return this.isPosNumber(value);
    },
    
    // Validates tour name
    name: function(value) {
        if (!value) {
             return false;
        }
        return value.trim() && this.length(3, 80, value);
    },
    
    // Max 300 chars
    shortDesc: function(value, allowNull) {
        return this.lengthOrNull(value, 0, 500, allowNull);
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
};
        
var dataValidator = (function() {
        
    function validateTour(tour) {
        var validationErrors = [];
        
        if(!validator.name(tour.name)) {
            validationErrors.push("Name");
        }
        if(!validator.mediumDesc(tour.shortDescription, true)) {
            validationErrors.push("Summary");
        }
        if(!validator.isPosNumber(tour.elevationGain)) {
            validationErrors.push("Elevation gain");
        }   
        if(!validator.isPosNumber(tour.elevationLoss)) {
            validationErrors.push("Elevation loss");
        }
        if(!validator.isPosNumberOrNull(tour.elevationMax)) {
            validationErrors.push("Highest point");
        }
        if(!validator.isPosNumber(tour.timingMin)) {
            validationErrors.push("Time min");
        }  
        if(!validator.isPosNumber(tour.timingMax)) {
            validationErrors.push("Time max");
        }  
        if(!validator.isPosNumberOrNull(tour.grade)) {
            validationErrors.push("Grade");
        }  
        if(!validator.mediumDesc(tour.hazardsDescription, !tour.haveHazards)) {
            validationErrors.push("Hazards description");
        }  
        if(!validator.mediumDesc(tour.toolsDescription, !tour.requiresTools)) {
            validationErrors.push("Requires skills description");
        }        
        if(!validator.isPosNumberOrNull(tour.degreesMax)) {
            validationErrors.push("Steepness");
        }  
        if(!validator.isPosNumberOrNull(tour.aspect)) {
            validationErrors.push("Aspect");
        }  
        if(!validator.isPosNumberOrNull(tour.timeOfYearFrom)) {
            validationErrors.push("Season from");
        }  
        if(!validator.isPosNumberOrNull(tour.timeOfYearTo)) {
            validationErrors.push("Season to");
        }
        if(!validator.mediumDesc(tour.accessPoint)) {
            validationErrors.push("Access point");
        }        
        if(!validator.longDesc(tour.itinerary)) {
            validationErrors.push("Description");
        } 
        
        return validationErrors;
    }

    return {
        validateTour : validateTour
    };
    
})();

module.exports = dataValidator;