package no.extreme.randopedia.controller;

import java.util.List;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.service.AreaService;
import no.extreme.randopedia.service.TourService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AppController {
    
    @Autowired
    AreaService areaService;
    @Autowired
    TourService tourService;

    @RequestMapping("/")
    public ModelAndView main() {
        ModelAndView result = new ModelAndView();
        result.setViewName("index");
        List<Area> areas = areaService.findAll();
        
        result.addObject("areas", areas);
        
        return result;
    }
    
    @RequestMapping("/logincallback")
    public ModelAndView loginCallback() {
        ModelAndView result = new ModelAndView();
        result.setViewName("logincallback");
        return result;
    }

}
