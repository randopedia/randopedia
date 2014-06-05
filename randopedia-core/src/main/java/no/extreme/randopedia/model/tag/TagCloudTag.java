package no.extreme.randopedia.model.tag;

import java.util.List;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="tags")
public class TagCloudTag {
    private String id;
    @Transient
    private String name;
    private Integer value;
    private List<String> tours;
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getValue() {
        return value;
    }
    public void setValue(Integer value) {
        this.value = value;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public List<String> getTours() {
        return tours;
    }
    public void setTours(List<String> tours) {
        this.tours = tours;
    }
  
    
}
