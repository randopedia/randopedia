package no.extreme.randopedia.helper;

import java.util.ArrayList;
import java.util.List;

public class TagsHelper {

    public static List<String> getTagsFromItinerary(String itinerary) {
        
        List<String> tags = new ArrayList<String>();
        
        if(itinerary == null) {
            return tags;
        }
        
        int hashIndex = itinerary.indexOf('#');
        while(hashIndex >= 0) {
            int spaceIndex = itinerary.indexOf(' ', hashIndex);
            if(spaceIndex > 0) {
                String tag = itinerary.substring(hashIndex+1, spaceIndex);
                tags.add(tag);
                hashIndex = itinerary.indexOf('#', spaceIndex);
            } else {
                String tag = itinerary.substring(hashIndex+1, itinerary.length());
                tags.add(tag);
                hashIndex = itinerary.indexOf('#', hashIndex+1);
            }  
        }
        
        return tags;
    }
}
