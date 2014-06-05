package no.extreme.randopedia.validator;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

public class TourValidatorTest {

    @Test
    public void test_ValidateOkItineraryName_returnTrue() {
        String itinerary = "Åndalsnes tur och retur";
        TourValidator validator = new TourValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateName(itinerary, errors);
        
        assertEquals(true, valid);
        assertEquals(0, errors.size());
    }
    
    @Test
    public void test_ValidateInvalidName_returnFalse() {
        String name = "";
        TourValidator validator = new TourValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateName(name, errors);
        
        assertEquals(false, valid);
        assertEquals(1, errors.size());
    }
    
    @Test
    public void test_ValidateToLongName_returnsFalse() {
        String name = "Åndalsnes parkeringÅndalsnes parkeringÅndalsnes parkeringÅndalsnes parkeringÅndalsnes parkeringÅndalsnes parkering";
        TourValidator validator = new TourValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateName(name, errors);
        
        assertEquals(false, valid);
        assertEquals(1, errors.size());
    }
    
    @Test
    public void test_ValidateOkStartingPoint_returnsTrue() {
        String startingPoint = "Åndalsnes parkering";
        TourValidator validator = new TourValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateStartingPoint(startingPoint, errors);
        
        assertEquals(true, valid);
        assertEquals(0, errors.size());
    }
    
    @Test
    public void test_ValidateOkMtnSkills_returnsTrue() {
        String mtnSkills = "ok skills text";
        TourValidator validator = new TourValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateMountaineeringSkillsDescription(mtnSkills, errors);
        
        assertEquals(true, valid);
        assertEquals(0, errors.size());
    }
      
    
    @Test
    public void test_ValidateOkDangerDesc_returnsTrue() {
        String dangerDesc = "ok danger text";
        TourValidator validator = new TourValidator();
        List<String> errors = new ArrayList<String>();
        
        boolean valid = validator.validateDangerDescription(dangerDesc, errors);
        
        assertEquals(true, valid);
        assertEquals(0, errors.size());
    }
}
