package no.extreme.randopedia.validator;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.area.AreaError;

public class AreaValidator extends AbstractValidator{
    
    public boolean validateArea(Area area, AreaError error) {
        boolean valid = true;
        List<String> errors = new ArrayList<String>();
        
        if(!validateName(area.getName(), errors)) {
            valid = false;
            error.setNameErrors(errors);
        }
        
        errors = new ArrayList<String>();
        
        if(!validateDescription(area.getDescription(), errors)) {
            valid = false;
            error.setDescriptionErrors(errors);
        }
         
        return valid;
    }

    

    

    
}
