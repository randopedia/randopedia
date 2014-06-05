package no.extreme.randopedia.model.area;

import org.codehaus.jackson.annotate.JsonProperty;

public class Toplevel {
    private String id;
    private String name;
    private String areaId;

    @JsonProperty("area")
    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

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
}
