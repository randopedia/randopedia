package no.extreme.randopedia.validator;

import java.util.List;

import org.apache.commons.lang3.StringUtils;



public abstract class AbstractValidator {
    public static final String illegalCharacters = "[~#@*+%{}<>\\[\\]|\"\\_^]"; 
    
    protected boolean hasIllegalCharacters(String name) {
        return false;
        
        //TODO: What, if any, characters should be considered illegal?
        
//        Pattern pattern = Pattern.compile(illegalCharacters);
//        Matcher matcher = pattern.matcher(name);
//        return matcher.find();
    }
    
    public boolean validateName(String name, List<String> errors) {
        boolean valid = true;
        if(!StringUtils.isNotBlank(name)){
            errors.add("Name is empty!");
            return false;
        }
        
        if(name.length() > 80) {
            valid = false;
            errors.add("The name is a bit to long! Max 80 characters");
        }
        
        if(hasIllegalCharacters(name)) {
            valid = false;
            errors.add("There are some illegal characters in the name!");
        }
        return valid;
    }
    
    public boolean validateDescription(String description, List<String> errors) {
        boolean valid = true;
        
        if(description == null || (description != null && description.length() == 0)) {
            return true;
        }
        if(description.length() > 500) {
            valid = false;
            errors.add("The description is a bit to long! Max 500 characters");
        }
        
        if(hasIllegalCharacters(description)) {
            valid = false;
            errors.add("Weird characters in the description!");
        }

        return valid;
    }
}
