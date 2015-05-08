package no.extreme.randopedia.controller.jobs;

import java.util.List;

import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourImage;
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
}
