package no.extreme.randopedia.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.extreme.randopedia.exception.InvalidAreaException;
import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.area.AreaError;
import no.extreme.randopedia.model.area.Toplevel;
import no.extreme.randopedia.repository.AreaRepository;
import no.extreme.randopedia.utils.DataWasher;
import no.extreme.randopedia.validator.AreaValidator;

@Service
public class AreaService {

    @Autowired
    AreaRepository areaRepository;
    
    /**
     * Get areas from a query string or a name
     * @param ids
     * @param name
     * @return
     */
    public List<Area> findAreasByIdOrName(String[] ids, String name) {
        List<Area> areas = new ArrayList<Area>();
        // Check if there is a specific area requested. 
        if( ids != null) {
            for(String id : ids) {
                Area area = areaRepository.findAreaById(id);
                areas.add(area);
            }
        }
        // Check if area is requested by name
        else if(name != null) {
            Area area = areaRepository.findAreaByName(name);
            if(area != null){
                areas.add(area);
            }
        }
        // Else, return all areas
        else {
            areas = areaRepository.findAll();
        }
        
        // Map to client area object
        
        return areas;
    }
    
    /**
     * Get all areas
     * @return
     */
    public List<Area> findAll() {
        List<Area> areas = new ArrayList<Area>();
        areas = areaRepository.findAll();
        
        return areas;
    }
    
    /**
     * Create a new area.
     * @param area
     * @return Area with updated ID
     * @throws InvalidAreaException
     */
    public Area createArea(Area area) throws InvalidAreaException {
        AreaValidator validator = new AreaValidator();
        DataWasher washer = new DataWasher();
        AreaError areaError = new AreaError();
        if(!validator.validateArea(area, areaError)) {
            throw new InvalidAreaException("Invalid area", areaError);
        }
        
        area = washer.washArea(area);
        
        Area parent = areaRepository.findAreaById(area.getParent());
        areaRepository.addArea(area, parent);
        
        return area;
    }
    
    /**
     * Update an area
     * @param area
     * @param areaUpdates
     * @throws InvalidAreaException
     */
    public void updateArea(Area area, Area areaUpdates) throws InvalidAreaException {
        AreaValidator validator = new AreaValidator();
        AreaError areaError = new AreaError();
        DataWasher washer = new DataWasher();
        if(!validator.validateArea(areaUpdates, areaError)) {
            throw new InvalidAreaException("Invalid area", areaError);
        }
        
        areaUpdates = washer.washArea(areaUpdates);
        
        area.setName(areaUpdates.getName());
        area.setDescription(areaUpdates.getDescription());
        // Don't store children in db
        area.setChildren(null);
        areaRepository.updateArea(area);
    }
    
    /**
     * Get the top level area in the area tree
     * @return
     */
    public Toplevel findTopLevel() {
        Area topArea = areaRepository.findAreaByName("Earth");
        
        Toplevel toplevel = new Toplevel();
        //toplevel.setAreaId(topArea.getId());
        toplevel.setAreaId(topArea.getClientId());
        toplevel.setId("1");
        toplevel.setName("Top level area");
        return toplevel;
    }

    public Area findAreaByClientId(String area) {
        return areaRepository.findAreaByClientId(area);
    }

    public Area findAreaById(String id) {
        return areaRepository.findAreaById(id);
    }
}
