package no.extreme.randopedia.repository;

import java.util.List;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Tour;

public interface AreaRepository {

    int addArea(Area area, Area parent);
    List<Area> findAll();
    Area findAreaByName(String name);
    Area findAreaById(String id);
    List<Area> findChildrenAreasByName(String name);
    void updateArea(Area area);
    void addTourToArea(Tour tour, Area area);
    void deleteTourFromArea(Tour tour, Area area);
    void deleteTourByIdFromArea(String tourId, Area area);
    Area findAreaByClientId(String parent);
}