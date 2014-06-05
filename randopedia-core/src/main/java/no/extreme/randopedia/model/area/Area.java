package no.extreme.randopedia.model.area;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import no.extreme.randopedia.model.tour.Tour;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonRootName;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Area {
    private String id;
    private String name;
    private String description;
    private List<String> ancestors;
    private String parent;
    private String clientParent;
    private int areaType;
    private List<String> tours;
    private List<String> clientTours;
    private String clientId;
    @Transient
    private List<String> children;
    @Transient
    private List<String> clientChildren;
      
    @Id
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    @JsonIgnore
    public List<String> getAncestors() {
        return ancestors;
    }
    
    public void setAncestors(List<String> ancestors) {
        this.ancestors = ancestors;
    }
    
    public String getParent() {
        return parent;
    }
    
    public void setParent(String parent) {
        this.parent = parent;
    }
    
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name; 
    }
    
    @JsonProperty("children")
    public List<String> getChildren() {
        return children;
    }
    
    @JsonIgnore
    public void setChildren(List<String> children) {
        this.children = children;
    }

    public List<String> getTours() {
        if(tours != null) {
            return tours;
        }
        else {
            return new ArrayList<String>();
        }
        
    }
    
    public void setTours(List<String> tours) {
        this.tours = tours;
    }
    
    public void addTour(String tour) {
        this.tours.add(tour);
    }

    public int getAreaType() {
        return areaType;
    }

    public void setAreaType(int areaType) {
        this.areaType = areaType;
    }

    public void addChild(String id) {
        if(children == null)
            children = new ArrayList<String>();
        children.add(id);
        
    }
    
    public void addClientChild(String clientId) {
        if(clientChildren == null) {
            clientChildren = new ArrayList<String>();
        }
        clientChildren.add(clientId);
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public List<String> getClientChildren() {
        return clientChildren;
    }

    public void setClientChildren(List<String> clientChildren) {
        this.clientChildren = clientChildren;
    }

    public String getClientParent() {
        return clientParent;
    }

    public void setClientParent(String clientParent) {
        this.clientParent = clientParent;
    }

    public List<String> getClientTours() {
        if(clientTours != null) {
            return clientTours;
        } else {
            return new ArrayList<String>();
        }
    }

    public void setClientTours(List<String> clientTours) {
        this.clientTours = clientTours;
    }

}
