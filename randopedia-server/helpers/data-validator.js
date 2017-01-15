var enums = require("../enums");

var validator = {
    
    numberRegex: "[0-9]+",
    nameRegex: "^.{3,80}$",

    // Positive number values, zero not allowed, floats not allowed
    isPosNumber: function(value, allowNull) {
        
        if(allowNull && !value) {
            return true;
        }
        
        if (isNaN(value) || value < 1) {
             return false;
        }
        
        if(parseFloat(value) != parseInt(value, 10 /* 10 for decimal system */)){
            return false;
        }
        
        return true;
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
        
        // required
        if(!validator.name(tour.name)) {
            validationErrors.push("Name");
        }
        
        var isDraftOrInReview = tour.status === enums.TourStatus.DRAFT || tour.status === enums.TourStatus.IN_REVIEW;

        if(!validator.isPosNumber(tour.elevationGain, true)) {
            validationErrors.push("Elevation gain");
        }   
        if(!validator.isPosNumber(tour.elevationLoss, true)) {
            validationErrors.push("Elevation loss");
        }
        if(!validator.isPosNumber(tour.elevationMax, true)) {
            validationErrors.push("Highest point");
        }
        if(!validator.isPosNumber(tour.timingMin, true)) {
            validationErrors.push("Time min");
        }  
        if(!validator.isPosNumber(tour.timingMax, true)) {
            validationErrors.push("Time max");
        }  
        if(!validator.isPosNumber(tour.grade, true)) {
            validationErrors.push("Grade");
        }  
        if(!validator.mediumDesc(tour.hazardsDescription, !tour.haveHazards || isDraftOrInReview)) {
            validationErrors.push("Hazards description");
        }  
        if(!validator.mediumDesc(tour.toolsDescription, !tour.requiresTools || isDraftOrInReview)) {
            validationErrors.push("Requires skills description");
        }        
        if(!validator.isPosNumber(tour.degreesMax, true)) {
            validationErrors.push("Steepness");
        }  
        if(!validator.isPosNumber(tour.aspect, true)) {
            validationErrors.push("Aspect");
        }  
        if(!validator.isPosNumber(tour.timeOfYearFrom, true)) {
            validationErrors.push("Season from");
        }  
        if(!validator.isPosNumber(tour.timeOfYearTo, true)) {
            validationErrors.push("Season to");
        }
        if(!validator.mediumDesc(tour.accessPoint, isDraftOrInReview)) {
            validationErrors.push("Access point");
        }        
        if(!validator.longDesc(tour.itinerary, isDraftOrInReview)) {
            validationErrors.push("Description");
        } 
        
        return validationErrors;
    }

    return {
        validateTour : validateTour
    };
    
})();

module.exports = dataValidator;