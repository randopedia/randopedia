package no.extreme.randopedia.controller;

import java.util.List;

import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourImage;
import no.extreme.randopedia.service.TourService;

import org.markdownj.MarkdownProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TourWebAppController {

    @Autowired
    TourService tourService;

    @RequestMapping(method=RequestMethod.GET, value="/tours/{tourId}")
    public ModelAndView getTour(@PathVariable String tourId) {
        ModelAndView result = new ModelAndView();
        MarkdownProcessor markdown = new MarkdownProcessor();
        
        result.setViewName("tour");
        
        Tour tour = tourService.getTourByClientId(tourId);
        List<TourImage> images = tour.getTourImages();
        
        result.addObject("tour", tour);
        result.addObject("grade", formatGrade(tour.getGrade()));
        result.addObject("from", formatSeason(tour.getTimeOfYearFrom()));
        result.addObject("to", formatSeason(tour.getTimeOfYearTo()));
        result.addObject("aspect", formatAspect(tour.getAspect()));
        result.addObject("images", images);
        
        String itinerary = markdown.markdown(tour.getItinerary());
        result.addObject("itinerary", itinerary);
        return result;
    }
    
    private String formatGrade(Integer grade) {
        if(grade != null) {
            switch(grade) {
            case 1:
                return "Easy";
            case 2:
                return "Fairly difficult";
            case 3:
                return "Quite difficult";
            case 4:
                return "Difficult";
            case 5:
                return "Very difficult";
            case 6:
                return "Extremely difficult";
            }
        }

        return "N/A";
    }
    
    private String formatSeason(Integer season) {
        if(season != null) {
            switch(season) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            }
        }

        
        return "N/A";
    }
    
    private String formatAspect(Integer aspect) {
        if(aspect != null) {
            switch(aspect) {  
            case 1:
                return "N";
            case 2:
                return "NW";
            case 3:
                return "W";
            case 4:
                return "SW";
            case 5:
                return "S";
            case 6:
                return "SE";
            case 7:
                return "E";
            case 8:
                return "NE";
            
            }
        }

        return "N/A";
    }
}
