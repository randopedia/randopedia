package no.extreme.randopedia.model.tag;

import java.util.List;

import org.springframework.data.annotation.Transient;

public class Tag {
    private String id;
    private int value;
    @Transient
    private String name;
    @Transient
    private List<String> tours;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public int getValue() {
        return value;
    }
    public void setValue(int value) {
        this.value = value;
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
