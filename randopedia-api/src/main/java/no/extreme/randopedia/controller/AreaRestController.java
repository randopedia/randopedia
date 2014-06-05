package no.extreme.randopedia.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import no.extreme.randopedia.exception.InvalidAreaException;
import no.extreme.randopedia.exception.TokenInvalidException;
import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.area.AreaContainer;
import no.extreme.randopedia.model.area.AreaError;
import no.extreme.randopedia.model.area.AreaErrorContainer;
import no.extreme.randopedia.model.area.AreaType;
import no.extreme.randopedia.model.area.AreasContainer;
import no.extreme.randopedia.model.area.Toplevel;
import no.extreme.randopedia.model.area.ToplevelsContainer;
import no.extreme.randopedia.model.area.client.ClientArea;
import no.extreme.randopedia.repository.AreaRepository;
import no.extreme.randopedia.repository.AuthenticationRepository;
import no.extreme.randopedia.repository.UserRepository;
import no.extreme.randopedia.service.AreaService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * REST API for Areas
 * 
 *
 */
@Controller
@RequestMapping(value="/api")
public class AreaRestController {
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationRepository authenticationRepository;
    @Autowired
    AreaService areaService;
    
    Logger logger = LoggerFactory.getLogger(AreaRestController.class);
    
    /**
     * Get all areas, all areas depending on id's or get are by name 
     * @param ids
     * @param name
     * @return
     */
    @RequestMapping(method=RequestMethod.GET, value="/areas", produces="application/json")
    public @ResponseBody AreasContainer getTopAreas(@RequestParam(value="ids[]", required = false) String[] ids, 
                                                    @RequestParam(value="name", required = false) String name) {
        AreasContainer container = new AreasContainer();
        List<Area> areas = new ArrayList<Area>();
        
        areas = areaService.findAreasByIdOrName(ids, name);
        
        // Map area to client area 
        List<ClientArea> clientAreas = Mapper.mapAreasToClientAreas(areas, areaService);
        
        container.setAreas(clientAreas);
        return container;
    }
    
    /**
     * Create a new area
     * @return json object with new Area id.
     * @throws InvalidAreaException 
     * @throws TokenInvalidException 
     */
    @RequestMapping(method=RequestMethod.POST, value="/areas", consumes="application/json", produces="application/json")
    public @ResponseBody AreaContainer createArea(
            @RequestBody AreaContainer newArea,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider
            ) throws InvalidAreaException, TokenInvalidException {
        
        // Check if token is valid (user logged in ok)
        // Throws invalid token exception if auth problem
        authenticationRepository.getUserFromToken(token, provider);
        
        AreaContainer container = new AreaContainer();
        ClientArea clientArea = newArea.getArea();
        
        Area area = Mapper.createAreaFromClientArea(clientArea, areaService);

        // Map client area to area
        area = areaService.createArea(area);
        
        // Map area to client area
        ClientArea ret = Mapper.mapAreaToClientArea(area, areaService);
        
        container.setArea(ret);
        return container;
    }
    
    /**
     * Get a specific area
     * @param areaId
     * @return
     */
    @RequestMapping(method=RequestMethod.GET, value="/areas/{areaId}", produces="application/json")
    public @ResponseBody AreaContainer getArea(@PathVariable String areaId) {

        AreaContainer container = new AreaContainer();

        List<Area> areas = areaRepository.findAll();
        
        // Map area to client area 
        List<ClientArea> clientAreas = Mapper.mapAreasToClientAreas(areas, areaService);
   
        container.setArea(null);
        container.setAreas(clientAreas);
       
        return container;
    }
    
    /**
     * Update a specific area
     * @throws InvalidAreaException 
     * @throws TokenInvalidException 
     */
    @RequestMapping(method=RequestMethod.PUT, value="/areas/{areaId}", consumes="application/json")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public @ResponseBody AreaContainer updateArea(
            @RequestBody AreaContainer newArea,
            @PathVariable String areaId,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider
            ) throws InvalidAreaException, TokenInvalidException {
        
        // Check if token is valid (user logged in ok)
        // Throws invalid token exception if auth problem
        authenticationRepository.getUserFromToken(token, provider);
        
        ClientArea clientAreaUpdates = newArea.getArea();
        clientAreaUpdates.setId(areaId);
        Area areaUpdates = Mapper.mapClientAreaToArea(clientAreaUpdates, areaService);
        
        Area area = areaRepository.findAreaById(areaUpdates.getId());
        
        // Map client area to area
        areaService.updateArea(area, areaUpdates);
        
        return null;
    }
    
    /**
     * Get the areas directly under "earth"
     * @return
     */
    @RequestMapping(method=RequestMethod.GET, value="/toplevels", produces="application/json")
    public @ResponseBody ToplevelsContainer getTopLevels() {        
        List<Area> areas = new ArrayList<Area>();
        List<Toplevel> toplevels = new ArrayList<Toplevel>();

        Toplevel toplevel = areaService.findTopLevel();
        toplevels.add(toplevel);
        
        areas = areaService.findAll();
        
        List<ClientArea> clientAreas = Mapper.mapAreasToClientAreas(areas, areaService);
        
        ToplevelsContainer container = new ToplevelsContainer();
        
        container.setAreas(clientAreas);
        container.setToplevels(toplevels);
        return container;
    }
    
    @ExceptionHandler
    @ResponseStatus(HttpStatus.DESTINATION_LOCKED)
    public @ResponseBody AreaErrorContainer handleInvalidArea(InvalidAreaException e) {

        AreaErrorContainer errorContainer = new AreaErrorContainer();
        errorContainer.setErrors(e.getError());
        
        return errorContainer;
    }
    
    @ExceptionHandler
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public @ResponseBody AreaErrorContainer handleInvalidArea(TokenInvalidException e) {
        AreaError areaError = new AreaError();
        String error = e.getMessage();
        areaError.setNameErrors(new ArrayList<String>(Arrays.asList(error)));
        AreaErrorContainer errorContainer = new AreaErrorContainer();
        errorContainer.setErrors(areaError);
        
        return errorContainer;
    }
    
    private static class Mapper {
        
        /**
         * Map server side area objects to client side
         * @param areas
         * @return
         */
        public static List<ClientArea> mapAreasToClientAreas(List<Area> areas, AreaService areaService) {
            List<ClientArea> clientAreas = new ArrayList<ClientArea>();
            
            if(areas != null) {
                for(Area area : areas) {
                    ClientArea clientArea = setClientAreaFromArea(area, areaService);
                    clientAreas.add(clientArea);
                }
            }
            
            return clientAreas;
        }
        
        /**
         * Map server side area objects to client side
         * @param areas
         * @return
         */
        public static ClientArea mapAreaToClientArea(Area area, AreaService areaService) {
            ClientArea clientArea = setClientAreaFromArea(area, areaService);
            return clientArea;
        }

        private static ClientArea setClientAreaFromArea(Area area, AreaService areaService) {
            Area parent = areaService.findAreaById(area.getParent());
            ClientArea clientArea = new ClientArea();
            clientArea.setId(area.getClientId());
            clientArea.setName(area.getName());
            clientArea.setAreaType(area.getAreaType());
            clientArea.setChildren(area.getClientChildren());
            clientArea.setDescription(area.getDescription());
            //clientArea.setTours(area.getTours());
            clientArea.setTours(area.getClientTours());
            if(parent != null) {
                clientArea.setParent(parent.getClientId());
            }
            
            return clientArea;
        }

        public static Area createAreaFromClientArea(ClientArea clientArea, AreaService areaService) {
            
            Area area = setAreaFromClientArea(clientArea, false, areaService);
            
            return area;
        }

        private static Area setAreaFromClientArea(ClientArea clientArea, boolean update, AreaService areaService) {
            Area area = new Area();
            Area parent = areaService.findAreaByClientId(clientArea.getParent());
            if(update) {
                Area updateArea = areaService.findAreaByClientId(clientArea.getId());
                area.setId(updateArea.getId());
            }
            area.setAreaType(clientArea.getAreaType());
            area.setClientId(clientArea.getId());
            area.setDescription(clientArea.getDescription());
            area.setName(clientArea.getName());
            area.setParent(parent.getId());
            area.setTours(clientArea.getTours());
            return area;
        }

        public static Area mapClientAreaToArea(ClientArea clientAreaUpdates, AreaService areaService) {
            Area area = setAreaFromClientArea(clientAreaUpdates, true, areaService);
            
            return area;
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    @RequestMapping(method=RequestMethod.GET, value="/create", produces="application/json")
    public @ResponseBody String createBasicAreaStructure() {
        logger.debug("Start adding basic area structure");
        
        Area earth = new Area();
        earth.setName("Earth");
        earth.setAreaType(AreaType.ROOT);
        areaRepository.addArea(earth, null);
        
        Area europe = new Area();
        europe.setName("Europe");
        europe.setAreaType(AreaType.CONTINENT);
        areaRepository.addArea(europe, earth);
        
        Area america = new Area();
        america.setName("North America");
        america.setAreaType(AreaType.CONTINENT);
        areaRepository.addArea(america, earth);
        
        Area southAmerica = new Area();
        southAmerica.setName("South America");
        southAmerica.setAreaType(AreaType.CONTINENT);
        areaRepository.addArea(southAmerica, earth);

        Area africa = new Area();
        africa.setName("Africa");
        africa.setAreaType(AreaType.CONTINENT);
        areaRepository.addArea(africa, earth);
        
        Area asia = new Area();
        asia.setName("Asia");
        asia.setAreaType(AreaType.CONTINENT);
        areaRepository.addArea(asia, earth);
        
        Area oceania = new Area();
        oceania.setName("Oceania");
        oceania.setAreaType(AreaType.CONTINENT);
        areaRepository.addArea(oceania, earth); 
        
        Area antarctica = new Area();
        antarctica.setName("Antarctica ");
        antarctica.setAreaType(AreaType.CONTINENT);
        areaRepository.addArea(antarctica, earth);    
        
        Area norway = new Area();
        norway.setName("Norway");
        areaRepository.addArea(norway, europe);
        
        Area france = new Area();
        france.setName("France");
        areaRepository.addArea(france, europe);
        
        Area sweden = new Area();
        sweden.setName("Sweden");
        areaRepository.addArea(sweden, europe);
        
        Area austria = new Area();
        austria.setName("Austria");
        areaRepository.addArea(austria, europe);
        
        Area romsdalen = new Area();
        romsdalen.setName("Romsdalen");
        areaRepository.addArea(romsdalen, norway);
        
        Area sunnmore = new Area();
        sunnmore.setName("Sunnmørsalpene");
        areaRepository.addArea(sunnmore, norway);
        
        Area hemsedal = new Area();
        hemsedal.setName("Hemsedal");
        areaRepository.addArea(hemsedal, norway);        
        
        Area alaska = new Area();
        alaska.setName("Alaska");
        areaRepository.addArea(alaska, america);
        
        logger.debug("Done adding basic area structure");
        
        return "Added basic area structure";
    }
}
