package no.extreme.randopedia.controller;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.controller.TourRestController.Mapper;
import no.extreme.randopedia.model.tag.Tag;
import no.extreme.randopedia.model.tag.TagContainer;
import no.extreme.randopedia.model.tag.TagsContainer;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.client.ClientTour;
import no.extreme.randopedia.service.TourService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/api")
public class TagRestController {
    @Autowired
    TourService tourService;

    @RequestMapping(method=RequestMethod.GET, value="/tags/{tagId}", produces="application/json")
    public @ResponseBody TagContainer getTag(@PathVariable String tagId) {
        List<Tour> tours = tourService.findToursByTag(tagId);
        List<ClientTour> clientTours = Mapper.mapToursToClientsTour(tours);
        
        Tag tag = new Tag();
        List<String> tourIds = new ArrayList<String>();
        for(ClientTour clientTour : clientTours) {
            tourIds.add(clientTour.getId());
        }
        
        tag.setId(tagId);
        tag.setName(tagId);
        tag.setTours(tourIds);
        
        TagContainer container = new TagContainer();
        container.setTag(tag);
        container.setTours(clientTours);
        
        return container;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/tags", produces="application/json")
    public @ResponseBody TagsContainer getTags() {
        
        List<Tag> tags = tourService.findAllTags();
        TagsContainer container = new TagsContainer();
        container.setTags(tags);
        
        return container;
    }
}
