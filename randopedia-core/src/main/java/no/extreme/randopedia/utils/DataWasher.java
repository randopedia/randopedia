package no.extreme.randopedia.utils;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourComment;

public class DataWasher {

    public Tour washTour(Tour tour) {        
        tour.setName(removeWhitespace(tour.getName()));
        tour.setName(capitalizeFirstLetter(tour.getName()));
        
        tour.setItinerary(removeWhitespace(tour.getItinerary()));
        tour.setItinerary(replaceHtmlChars(tour.getItinerary()));
        
        tour.setAccessPoint(removeWhitespace(tour.getAccessPoint()));
        tour.setAccessPoint(replaceHtmlChars(tour.getAccessPoint()));
        
        tour.setHazardsDescription(removeWhitespace(tour.getHazardsDescription()));
        tour.setHazardsDescription(replaceHtmlChars(tour.getHazardsDescription()));
        
        tour.setToolsDescription(removeWhitespace(tour.getToolsDescription()));
        tour.setToolsDescription(replaceHtmlChars(tour.getToolsDescription()));
        
        return tour;
    }
    
    public TourComment washComment(TourComment comment) {
        comment.setComment(removeWhitespace(comment.getComment()));
        return comment;
    }
    
    public Area washArea(Area area) {
        area.setName(removeWhitespace(area.getName()));
        area.setName(capitalizeFirstLetter(area.getName()));
        
        area.setDescription(removeWhitespace(area.getDescription()));
        area.setDescription(replaceHtmlChars(area.getDescription()));
        
        return area;
    }
    
    private String removeWhitespace(String text) {
        // TODO: Remove multiple white spaces in string, not just trim
        
        if(text == null) {
            return null;
        }
        
        text = text.trim();
        return text;
    }
    
    private String capitalizeFirstLetter(String text) {
        if(text == null || text.length() == 0) {
            return text;
        }
        
        text = text.substring(0, 1).toUpperCase() + text.substring(1);
        
        return text;
    }
    
    private String replaceHtmlChars(String text) {
        if(text == null || text.length() == 0) {
            return text;
        }
        
        text = text.replaceAll("<", "&lt;");
        text = text.replaceAll(">", "&gt;");
        return text;
    }
}
