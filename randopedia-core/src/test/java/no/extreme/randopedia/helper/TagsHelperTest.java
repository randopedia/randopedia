package no.extreme.randopedia.helper;

import java.util.List;


import org.junit.Test;
import static org.junit.Assert.*;

public class TagsHelperTest {
    
    

    @Test
    public void test_tagFirstInText() {
        String text = "#tag is first";
        
        List<String> tagsFromItinerary = TagsHelper.getTagsFromItinerary(text);
        
        assertEquals(1, tagsFromItinerary.size());
    }
    
    @Test
    public void test_tagMiddleInText() {
        String text = "The #tag is in the text";
        
        List<String> tagsFromItinerary = TagsHelper.getTagsFromItinerary(text);
        
        assertEquals(1, tagsFromItinerary.size());
    }
    
    @Test
    public void test_tagLastInText() {
        String text = "Text ends with a #tag";
        
        List<String> tagsFromItinerary = TagsHelper.getTagsFromItinerary(text);
        
        assertEquals(1, tagsFromItinerary.size());
    }
    
    @Test
    public void test_manyTags() {
        String text = "#so #many #tags #here";
        
        List<String> tagsFromItinerary = TagsHelper.getTagsFromItinerary(text);
        
        assertEquals(4, tagsFromItinerary.size());
    }
    
}
