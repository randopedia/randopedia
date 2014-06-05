package no.extreme.randopedia.controller;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.service.AreaService;
import no.extreme.randopedia.service.TourService;

import org.markdownj.MarkdownProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AreaWebAppController {
    
    @Autowired
    AreaService areaService;
    @Autowired
    TourService tourService;

    @RequestMapping(method=RequestMethod.GET, value="/areas/{areaId}")
    public ModelAndView getArea(@PathVariable String areaId) {
        ModelAndView result = new ModelAndView();
        MarkdownProcessor markdown = new MarkdownProcessor();
        
        result.setViewName("area");
        
        Area area = areaService.findAreaByClientId(areaId);
        Area parent = areaService.findAreaById(area.getParent());
        List<String> subAreaIds = area.getClientChildren();
        List<Area> subAreas = new ArrayList<Area>();
        if(subAreaIds != null) {
            for(String subAreaId : subAreaIds) {
                Area subArea = areaService.findAreaByClientId(subAreaId);
                subAreas.add(subArea);
            }
        }
        
        
        List<String> clientTours = area.getClientTours();
        List<Tour> tours = new ArrayList<Tour>();
        for(String tourId : clientTours) {
            Tour tour = tourService.getTourByClientId(tourId);
            tours.add(tour);
        }
        
        result.addObject("area", area);
        result.addObject("subAreas", subAreas);
        result.addObject("parent", parent);
        result.addObject("tours", tours);
        
        String description = markdown.markdown(area.getDescription());
        result.addObject("description", description);
        
        return result;
        
    }
}
