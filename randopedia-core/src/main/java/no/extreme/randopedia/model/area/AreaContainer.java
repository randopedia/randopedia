package no.extreme.randopedia.model.area;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.area.client.ClientArea;

public class AreaContainer {
    private ClientArea area;
    private List<ClientArea> areas;

    public ClientArea getArea() {
        return area;
    }

    public void setArea(ClientArea area) {
        this.area = area;
    }

    public List<ClientArea> getAreas() {
        if(areas == null) {
            areas = new ArrayList<ClientArea>();
        }
        return areas;
    }

    public void setAreas(List<ClientArea> areas) {
        this.areas = areas;
    } 
 }
