package no.extreme.randopedia.controller.jobs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourImage;
import no.extreme.randopedia.repository.AreaRepositoryMongoImpl;
import no.extreme.randopedia.repository.TourRepositoryMongoImpl;
import no.extreme.randopedia.utils.RandoNameUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/jobs")
public class JobsRestController {

    Logger logger = LoggerFactory.getLogger(JobsRestController.class);
    
    @Autowired
    TourRepositoryMongoImpl tourRepository;
    @Autowired
    AreaRepositoryMongoImpl areaRepository;

    /**
     * Delete all empty image arrays on tours
     */
    @RequestMapping(method=RequestMethod.GET, value="/deleteemptyimagearrays", produces="application/json")
    public @ResponseBody String deleteEmptyImageArrays() {
        List<Tour> tours = tourRepository.findAllToursIgnoreStatus();
        int count = 0;
        for(Tour tour : tours) {
            List<TourImage> images = tour.getTourImages();
            if(images != null && images.isEmpty()){
                tour.setTourImages(null);
                tourRepository.saveTour(tour);
                count++;
            }
        }
        
        return "Empty image array deleted from " + count + " tours"; 
    }
    
    /**
     * Find missing tours and add them to tour list of correct area
     * @return
     */
    @RequestMapping(method=RequestMethod.GET, value="/tourcleanup", produces="application/json")
    public @ResponseBody String tourCleanupJob() {
        List<Tour> tours = tourRepository.findAllTours();
        int matches = 0;
        int misses = 0;
        List<String> matchesList = new ArrayList<String>();
        List<String> missesList = new ArrayList<String>();
        
        // Update area when the tour list is missing a tour
        for(Tour tour : tours) {
            String areaId = tour.getArea();
            Area area = areaRepository.findAreaById(areaId);
            logger.info("Tour: " + tour.getName());
            logger.info("Area: " +area.getName());
            logger.info("Tours in area " + area.getTours());
            if(area.getTours().contains(tour.getId())) {
                matches++;
                matchesList.add(tour.getName()+ " in " + area.getName());
            }
            else {
                misses++;
                missesList.add(tour.getName()+ " in " + area.getName());
                areaRepository.addTourToArea(tour, area);
            }
            
        }
        
        return "Cleanup executed ok, " +matches+ " matches, " +misses+ " misses" + 
                matchesList.toString() + " " + missesList.toString();
    }
    
    /**
     * Remove tours from wrong area. Assume that the tour has the correct area
     */
    @RequestMapping(method=RequestMethod.GET, value="/areacleanup", produces="application/json")
    public @ResponseBody String areaCleanupJob() {
        List<Area> areas = areaRepository.findAll();
        int matches = 0;
        int misses = 0;
        List<String> matchesList = new ArrayList<String>();
        List<String> missesList = new ArrayList<String>();
        for(Area area : areas) {
            List<String> tourIds = area.getTours();
            if(tourIds != null) {
                for(String tourId : tourIds) {
                    Tour tour = tourRepository.findTourById(tourId);
                    if(tour != null) {
                        if(tour.getArea().equals(area.getId())) {
                            matches++;
                            matchesList.add(tour.getName()+ " in " + area.getName());
                        }
                        else {
                            misses++;
                            missesList.add(tour.getId());
                        }    
                    }
                    else {
                        misses++;
                        missesList.add(tourId);
                    }
                }    
            }
            
            for(String miss : missesList) {
                //Tour tour = tourRepository.findTourById(miss);
                areaRepository.deleteTourByIdFromArea(miss, area);
            }
        }
        return "Cleanup executed ok, " +matches+ " matches, " +misses+ " misses" + 
                matchesList.toString() + " " + missesList.toString();
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/areaclientid", produces="application/json")
    public @ResponseBody String setAreaClientId() {
        List<Area> areas = areaRepository.findAll();
        
        for(Area area : areas) {
            String clientId = RandoNameUtils.getTextId(area.getName());
            int startIter = 1;
            Area duplicate = areaRepository.findAreaByClientId(clientId);
            while(duplicate != null) {
                clientId = clientId + "_" + startIter;
                duplicate = areaRepository.findAreaByClientId(clientId);
            }
            logger.info("client id = " + clientId);
            area.setClientId(clientId);
            areaRepository.updateArea(area);
        }
        
        return "tjohoo";
        
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/tourclientid", produces="application/json")
    public @ResponseBody String setTourClientId() {
        List<Tour> tours = tourRepository.findAllTours();
        
        for(Tour tour : tours) {
            String clientId = RandoNameUtils.getTextId(tour.getName());
            int startIter = 1;
            Tour duplicate = tourRepository.findTourByClientId(clientId);
            while(duplicate != null) {
                clientId = clientId + "_" + startIter;
                duplicate = tourRepository.findTourByClientId(clientId);
            }
            logger.info("client id = " + clientId);
            tour.setClientId(clientId);
            tourRepository.saveTour(tour);
        }
        
        return "tjohoo";
        
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/areatourclientid", produces="application/json")
    public @ResponseBody String setAreaTourClientId() {
        List<Area> areas = areaRepository.findAll();
        
        for(Area area : areas) {
            List<String> tours = area.getTours();
            List<String> tourClientIds = new ArrayList<String>();
            for(String tourId : tours) {
                Tour tour = tourRepository.findTourById(tourId);
                tourClientIds.add(tour.getClientId());
            }
            area.setClientTours(tourClientIds);
            areaRepository.updateArea(area);
            logger.info("area: " + area.getName() +" tours: " + tourClientIds.toString());
            
        }
        
        return "Set tour client ids";
        
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/tourareaclientid", produces="application/json")
    public @ResponseBody String setTourAreaClientId() {
        List<Tour> tours = tourRepository.findAllTours();
        
        for(Tour tour : tours) {
            String areaId = tour.getArea();
            Area area = areaRepository.findAreaById(areaId);
            tour.setClientArea(area.getClientId());
            tourRepository.saveTour(tour);
        }

        return "Set tour area client ids";
    }
    
}



// OBSOLETE JOBS

/**
 * Sets all tours to status "PUBLISHED"
 */
//@RequestMapping(method=RequestMethod.GET, value="/settourstatus", produces="application/json")
//public @ResponseBody String setTourStatusJob() {
//  List<Tour> tours = tourRepository.findAllToursIgnoreStatus();
//  for(Tour tour : tours) {
//      tour.setStatus(TourStatus.PUBLISHED);
//      tourRepository.saveTour(tour);
//  }
//  
//  return tours.size() + " tours set to status PUBLISHED"; 
//}

