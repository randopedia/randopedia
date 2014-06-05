package no.extreme.randopedia.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.utils.RandoNameUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class AreaRepositoryMongoImpl implements AreaRepository {
    
    @Autowired
    MongoOperations mongoOperations;
    
    Logger logger = LoggerFactory.getLogger(AreaRepositoryMongoImpl.class);
    
    public int addArea(Area area, Area parent) {
        int nbrAncestors = 0;
        if(parent != null) {
            area.setParent(parent.getId());
            List<String> ancestors = parent.getAncestors();
            if(ancestors == null) {
                ancestors = new ArrayList<String>();
            }
            if(!ancestors.contains(parent.getId())) {
                ancestors.add(parent.getId());
            }
            area.setAncestors(ancestors);
        }
        
        String clientId = findUniqueClientId(area);
        area.setClientId(clientId);
        
        mongoOperations.insert(area);
        
        if(parent != null) {
            nbrAncestors = area.getAncestors().size();
        }
        return nbrAncestors;
    }

    private String findUniqueClientId(Area area) {
        String startClientId = RandoNameUtils.getTextId(area.getName());
        String clientId = startClientId;
        int startIter = 1;
        Area duplicate = findAreaByClientId(startClientId);
        while(duplicate != null) {
            clientId = startClientId + "_" + startIter;
            duplicate = findAreaByClientId(clientId);
            startIter++;
        }
        return clientId;
    }
    
    @Override
    public Area findAreaById(String id) {
        Area area = mongoOperations.findOne(new Query(
                Criteria.where("_id").is(id)), Area.class, "area");
        // Set children;
        if(area != null) {
            setChildren(area);
        }
        return area;
    }
    
    public List<Area> findSubAreasById(String id) {
        List<Area> areas = mongoOperations.find(new Query(
                Criteria.where("parent").is(id)), Area.class, "area");        
        return areas;
    }

    @Override
    public Area findAreaByName(String name) {
        Area area = mongoOperations.findOne(new Query(
                Criteria.where("name").is(name)), Area.class, "area");
        // Set children;
        if(area != null) {
            setChildren(area);
        }
        
        return area;
    }
    
    /**
     * Set children of an area
     * @param area
     */
    private void setChildren(Area area) {
        List<Area> children = findSubAreasById(area.getId());
        List<String> childrenIds = new ArrayList<String>();
        List<String> clientChildrenIds = new ArrayList<String>();
        
        for(Area child : children) {
            childrenIds.add(child.getId());
            clientChildrenIds.add(child.getClientId());
        }
        area.setChildren(childrenIds);
        area.setClientChildren(clientChildrenIds);
        
        if(area.getTours() == null) {
            area.setTours(new ArrayList<String>());
        }
    }

    @Override
    public List<Area> findChildrenAreasByName(String name) {
        
        List<Area> children = mongoOperations.find(new Query(
                Criteria.where("parent").is(name)), Area.class, "area");
        return children;
    }

    @Override
    public List<Area> findAll() {
        List<Area> areas = mongoOperations.findAll(Area.class, "area");
        
        Collections.sort(areas, new Comparator<Area>() {

            @Override
            public int compare(Area o1, Area o2) {
                // TODO Auto-generated method stub
                return o1.getName().compareToIgnoreCase(o2.getName());
            }
            
        });
        
        // Create a map of all areas with id as key
        Map<String, Area> areaMap = new HashMap<String, Area>();
        for(Area area : areas) {
            areaMap.put(area.getId(), area);
        }
        
        // Update children references
        for(Area area : areas) {
            String parent = area.getParent();
            if(parent != null) {
                Area parentArea = areaMap.get(area.getParent());
                parentArea.addChild(area.getId());
                parentArea.addClientChild(area.getClientId());
            }
        }
        
        return new ArrayList<Area>(areaMap.values());
    }

    @Override
    public void updateArea(Area area) {
        mongoOperations.save(area);
        
    }

    @Override
    public void addTourToArea(Tour tour, Area area) {
        List<String> tours = area.getTours();
        List<String> clientTours = area.getClientTours();
        tours.add(tour.getId());
        clientTours.add(tour.getClientId());
        area.setTours(tours);
        area.setClientTours(clientTours);
        updateArea(area);        
    }
    
    @Override
    public void deleteTourFromArea(Tour tour, Area area) {
        List<String> tours = area.getTours();
        List<String> clientTours = area.getClientTours();
        tours.remove(tour.getId());
        clientTours.remove(tour.getClientId());
        updateArea(area);        
    }
    
    @Override
    public void deleteTourByIdFromArea(String tourId, Area area) {
        area.getTours().remove(tourId);
        updateArea(area);        
    }

    public Area findAreaByClientId(String clientId) {
        Area area = mongoOperations.findOne(new Query(
                Criteria.where("clientId").is(clientId)), Area.class, "area");
        // Set children;
        if(area != null) {
            setChildren(area);
        }
        return area;
    }
}
