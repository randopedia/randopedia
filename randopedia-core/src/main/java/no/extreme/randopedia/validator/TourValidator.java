package no.extreme.randopedia.validator;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourComment;
import no.extreme.randopedia.model.tour.TourError;

public class TourValidator extends AbstractValidator{
    
    public boolean validateTour(Tour tour, TourError error) {
        boolean valid = true;
        List<String> errors = new ArrayList<String>();
    
        if(!validateName(tour.getName(), errors)) {
            valid = false;
            error.setNameErrors(errors);
        }
        
        errors = new ArrayList<String>();
        
        if(!validateDescription(tour.getShortDescription(), errors)) {
            valid = false;
            error.setShortDescriptionErrors(errors);
        }

        return valid;
    }
    
    public boolean validateItinerary(String itinerary, List<String> errors) {
        boolean valid = true;
        
        if(itinerary == null || (itinerary != null && itinerary.length() == 0)) {
            return true;
        }
        if(itinerary.length() > 8000) {
            valid = false;
            errors.add("The itinerary is a bit to long! Max 8000 characters");
        }
        
        if(hasIllegalCharacters(itinerary)) {
            valid = false;
            errors.add("Weird characters in the description!");
        }

        return valid;
    }
    
    public boolean validateStartingPoint(String startingPoint, List<String> errors) {
        boolean valid = true;
        
        if(startingPoint == null || (startingPoint != null && startingPoint.length() == 0)) {
            return true;
        }
        
        if(startingPoint.length() > 1000) {
            valid = false;
            errors.add("The starting point text is to long!");
        }
        
        if(hasIllegalCharacters(startingPoint)) {
            valid = false;
            errors.add("The starting point text has illegal characters!");
        }
        
        return valid;
    }

    public boolean validateMountaineeringSkillsDescription(String mountaineeringSkillsDescription, List<String> errors) {
        boolean valid = true;
        
        if(mountaineeringSkillsDescription == null || (mountaineeringSkillsDescription != null && mountaineeringSkillsDescription.length() == 0)) {
            return true;
        }
        
        if(mountaineeringSkillsDescription.length() > 300) {
            valid = false;
            errors.add("The description text is to long!");
        }
        
        if(hasIllegalCharacters(mountaineeringSkillsDescription)) {
            valid = false;
            errors.add("The description text has illegal characters!");
        }
        
        return valid;
    }
    
    public boolean validateDangerDescription(String dangerDescription, List<String> errors) {
        boolean valid = true;
        
        if(dangerDescription == null || (dangerDescription != null && dangerDescription.length() == 0)) {
            return true;
        }
        
        if(dangerDescription.length() > 300) {
            valid = false;
            errors.add("The description text is to long!");
        }
        
        if(hasIllegalCharacters(dangerDescription)) {
            valid = false;
            errors.add("The description text has illegal characters!");
        }
        
        return valid;
    }
    
    public boolean validateComment(TourComment comment, TourError error){
        boolean valid = true;
        List<String> errors = new ArrayList<String>();
        
        if(comment == null || StringUtils.isBlank(comment.getComment())){
            errors.add("The comment is blank");
            error.setComment(errors);
            return false;
        }
        
        if(comment.getComment().length() > 500) {
            valid = false;
            errors.add("The comment is to long! Max 500 charachteres are allowed");
        }
        
        if(hasIllegalCharacters(comment.getComment())) {
            valid = false;
            errors.add("The comment has illegal characters!");
        }
        
        error.setComment(errors);
        return valid;
    }
}
