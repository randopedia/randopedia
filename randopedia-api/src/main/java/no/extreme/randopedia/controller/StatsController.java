package no.extreme.randopedia.controller;

import no.extreme.randopedia.model.stats.StatsContainer;
import no.extreme.randopedia.repository.StatsRepositoryMongoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/api")
public class StatsController {
    
	@Autowired
	StatsRepositoryMongoImpl statsRepository;
	
    @RequestMapping(method=RequestMethod.GET, value="/stats", produces="application/json")
    public @ResponseBody StatsContainer getTour() {
    	StatsContainer container = new StatsContainer();
    	container.setStats(statsRepository.getStats());
        return container;
    }
}
