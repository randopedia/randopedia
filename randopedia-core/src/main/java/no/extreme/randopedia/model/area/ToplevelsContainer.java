package no.extreme.randopedia.model.area;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.area.client.ClientArea;

public class ToplevelsContainer {
    private List<Toplevel> toplevels;
    private List<ClientArea> areas;

    public List<Toplevel> getToplevels() {
        if(toplevels == null) {
            toplevels = new ArrayList<Toplevel>();
        }
        return toplevels;
    }

    public void setToplevels(List<Toplevel> toplevels) {
        this.toplevels = toplevels;
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
