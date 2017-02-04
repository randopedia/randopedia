var dataWasher = (function() {

    function removeWhitespace(text) {
        // todo: Remove multiple white spaces, not just trim
    	return text ? text.trim() : text;
    }
    
    function capitalizeFirstLetter(text) {
        if(!text || text.length === 0) {
            return text;
        }
        return text.substring(0, 1).toUpperCase() + text.substring(1);
    }
    
    function replaceHtmlChars(text) {
        if(!text || text.length === 0) {
            return text;
        }
        
        text = text.replace("<", "&lt;");
        text = text.replace(">", "&gt;");
        return text;
    }
	
	function normalWash(text) {
        if(!text || !text.length) {
            return "";
        }

        text = removeWhitespace(text);
        text = replaceHtmlChars(text);
		text = capitalizeFirstLetter(text);

		return text;
	}
	
    function washTour(tour) {
		tour.name = normalWash(tour.name);

        tour.itineraryEng = normalWash(tour.itineraryEng);
        tour.itineraryNo = normalWash(tour.itineraryNo);

        tour.accessPointEng = normalWash(tour.accessPointEng);
        tour.accessPointNo = normalWash(tour.accessPointNo);
        
        tour.hazardsDescriptionEng = normalWash(tour.hazardsDescriptionEng);
        tour.hazardsDescriptionNo = normalWash(tour.hazardsDescriptionNo);
        
        tour.toolsDescriptionEng = normalWash(tour.toolsDescriptionEng);
        tour.toolsDescriptionNo = normalWash(tour.toolsDescriptionNo);
        
        return tour;
    }

    return {
        washTour : washTour
    };
    
})();

module.exports = dataWasher;