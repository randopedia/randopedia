package no.extreme.randopedia.model.area.client;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ClientArea {
    private String id;
    private String name;
    private String description;
    private String parent;
    private int areaType;
    private List<String> tours;
    private List<String> children;
    
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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getParent() {
        return parent;
    }
    public void setParent(String parent) {
        this.parent = parent;
    }
    public int getAreaType() {
        return areaType;
    }
    public void setAreaType(int areaType) {
        this.areaType = areaType;
    }
    public List<String> getTours() {
        return tours;
    }
    public void setTours(List<String> tours) {
        this.tours = tours;
    }
    public List<String> getChildren() {
        return children;
    }
    public void setChildren(List<String> children) {
        this.children = children;
    }
    @JsonProperty("nbrTours")
    public int getNbrTours() {
        if(this.tours != null) {
            return this.tours.size();
        }
        else {
            return 0;
        }
    }
    public boolean getHasTours() {
        if(tours != null && tours.size() > 0)
            return true;
        else
            return false;
    }
    
}
