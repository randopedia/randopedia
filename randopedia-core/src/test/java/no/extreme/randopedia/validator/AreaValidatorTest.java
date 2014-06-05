package no.extreme.randopedia.validator;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

public class AreaValidatorTest {

    @Test
    public void test_ValidateOkAreaName_returnTrue() {
        String name = "Åndalsnes";
        AreaValidator validator = new AreaValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateName(name, errors);
        
        assertEquals(true, valid);
        assertEquals(0, errors.size());
    }

    @Test
    public void test_ValidateInvalidAreaName_returnFalse() {
        String name = "";
        
        AreaValidator validator = new AreaValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateName(name, errors);
        
        assertEquals(false, valid);
        assertEquals(1, errors.size());
    }
    
    @Test
    public void test_ValidateTooLongAreaName_returnFalse() {
        String name = "Morethan50characters" +
                "Morethan50characters" +
                "Morethan50characters" +
                "Morethan50characters" + 
                "Morethan50characters";
        
        AreaValidator validator = new AreaValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateName(name, errors);
        
        assertEquals(false, valid);
        assertEquals(1, errors.size());
    }
    
    @Test
    public void test_ValidateOkAreaDescription_returnsTrue() {
        String description = "A valid description";
        AreaValidator validator = new AreaValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateDescription(description, errors);
        
        assertEquals(true, valid);
        assertEquals(0, errors.size());
    }
    
    @Test
    public void test_validateTooLongDescription_returnFalse() {
        String description = "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description" +
                "A non valid description";
        
        AreaValidator validator = new AreaValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateDescription(description, errors);
        
        assertEquals(false, valid);
        assertEquals(1, errors.size());
    }
}
