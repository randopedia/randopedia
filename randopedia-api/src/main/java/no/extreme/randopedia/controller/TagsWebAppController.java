package no.extreme.randopedia.controller;

import java.util.List;

import no.extreme.randopedia.model.tag.TagCloudTag;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.service.TourService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TagsWebAppController {

    @Autowired
    TourService tourService;
    
    @RequestMapping(method=RequestMethod.GET, value="/tags")
    public ModelAndView getTags() {
        ModelAndView result = new ModelAndView();
        result.setViewName("tags");
        
        List<TagCloudTag> tags = tourService.findAllTags();
        
        result.addObject("tags", tags);
        
        return result;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/tags/{tag}")
    public ModelAndView getTag(@PathVariable String tag) {
        ModelAndView result = new ModelAndView();
        result.setViewName("tag");
        
        List<Tour> tours = tourService.findToursByTag(tag);
        
        result.addObject("tours", tours);
        result.addObject("tag", tag);
        return result;
    }
}
