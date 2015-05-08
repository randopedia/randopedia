package no.extreme.randopedia.controller;

import no.extreme.randopedia.service.TourService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AppController {
    @Autowired
    TourService tourService;
    
    @RequestMapping("/logincallback")
    public ModelAndView loginCallback() {
        ModelAndView result = new ModelAndView();
        result.setViewName("logincallback");
        return result;
    }

}
