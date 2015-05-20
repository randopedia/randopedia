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
		text = removeWhitespace(text);
        text = replaceHtmlChars(text);
		text = capitalizeFirstLetter(text);
		return text;
	}
	
    function washTour(tour) {
		tour.name = normalWash(tour.name);
        tour.itinerary = normalWash(tour.itinerary);
        tour.accessPoint = normalWash(tour.accessPoint);
        tour.hazardsDescription = normalWash(tour.hazardsDescription);
        tour.toolsDescription = normalWash(tour.toolsDescription);
        return tour;
    }

    return {
        washTour : washTour
    };
    
})();

module.exports = dataWasher;