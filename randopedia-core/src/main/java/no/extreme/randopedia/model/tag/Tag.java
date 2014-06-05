package no.extreme.randopedia.model.tag;

import java.util.List;

public class Tag {
    private String id;
    private String name;
    private List<String> tours;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<String> getTours() {
        return tours;
    }
    public void setTours(List<String> tours) {
        this.tours = tours;
    }
    
    
}
