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
        var errorCount = 0;
        
        if(!validator.name(tour.name)) {
            errorCount++;
        }
        if(!validator.mediumDesc(tour.shortDescription, true)) {
            errorCount++;
        }
        if(!validator.isPosNumber(tour.elevationGain)) {
            errorCount++;
        }   
        if(!validator.isPosNumber(tour.elevationLoss)) {
            errorCount++;
        }
        if(!validator.isPosNumberOrNull(tour.elevationMax)) {
            errorCount++;
        }
        if(!validator.isPosNumber(tour.timingMin)) {
            errorCount++;
        }  
        if(!validator.isPosNumber(tour.timingMax)) {
            errorCount++;
        }  
        if(!validator.isPosNumberOrNull(tour.grade)) {
            errorCount++;
        }  
        if(!validator.mediumDesc(tour.hazardsDescription, !tour.haveHazards)) {
            errorCount++;
        }  
        if(!validator.mediumDesc(tour.toolsDescription, !tour.requiresTools)) {
            errorCount++;
        }        
        if(!validator.isPosNumberOrNull(tour.degreesMax)) {
            errorCount++;
        }  
        if(!validator.isPosNumberOrNull(tour.aspect)) {
            errorCount++;
        }  
        if(!validator.isPosNumberOrNull(tour.timeOfYearFrom)) {
            errorCount++;
        }  
        if(!validator.isPosNumberOrNull(tour.timeOfYearTo)) {
            errorCount++;
        }
        if(!validator.mediumDesc(tour.accessPoint)) {
            errorCount++;
        }        
        if(!validator.longDesc(tour.itinerary)) {
            errorCount++;
        } 
        return errorCount === 0;
    }

    return {
        validateTour : validateTour
    };
    
})();

module.exports = dataValidator;