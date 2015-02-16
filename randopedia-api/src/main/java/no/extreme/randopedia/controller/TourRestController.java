package no.extreme.randopedia.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import no.extreme.randopedia.exception.InvalidTourException;
import no.extreme.randopedia.exception.TokenInvalidException;
import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourActionsContainer;
import no.extreme.randopedia.model.tour.TourComment;
import no.extreme.randopedia.model.tour.TourCommentContainer;
import no.extreme.randopedia.model.tour.TourContainer;
import no.extreme.randopedia.model.tour.TourError;
import no.extreme.randopedia.model.tour.TourErrorContainer;
import no.extreme.randopedia.model.tour.TourImage;
import no.extreme.randopedia.model.tour.TourImageContainer;
import no.extreme.randopedia.model.tour.TourImagesContainer;
import no.extreme.randopedia.model.tour.ToursContainer;
import no.extreme.randopedia.model.tour.client.ClientTour;
import no.extreme.randopedia.model.user.User;
import no.extreme.randopedia.repository.ActionRepositoryMongoImpl;
import no.extreme.randopedia.repository.AreaRepositoryMongoImpl;
import no.extreme.randopedia.repository.AuthenticationRepository;
import no.extreme.randopedia.repository.FacebookRepository;
import no.extreme.randopedia.repository.GoogleRepository;
import no.extreme.randopedia.repository.TourRepositoryMongoImpl;
import no.extreme.randopedia.repository.UserRepository;
import no.extreme.randopedia.service.AreaService;
import no.extreme.randopedia.service.TourService;

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

@Controller
@RequestMapping(value="/api")
public class TourRestController {
	
    Logger logger = LoggerFactory.getLogger(TourRestController.class);
    
	@Autowired
	TourRepositoryMongoImpl tourRepository;
	@Autowired
	AreaRepositoryMongoImpl areaRepository;
	@Autowired
    UserRepository userRepository;
    @Autowired
    FacebookRepository facebookRepository;
    @Autowired
    GoogleRepository googleRepository;
    @Autowired
    ActionRepositoryMongoImpl actionRepository;
    @Autowired
    AuthenticationRepository authenticationRepository;
    @Autowired
    TourService tourService;
    @Autowired
    AreaService areaService;
	
    @RequestMapping(method=RequestMethod.GET, value="/tours/{tourId}", produces="application/json")
    public @ResponseBody TourContainer getTour(@PathVariable String tourId) {
        Tour tour = tourRepository.findTourByClientId(tourId);
        if(tour == null) {
            return null;
        }
        
        ClientTour clientTour = Mapper.mapTourToClientTour(tour);
        
        List<TourImage> images = tour.getTourImages();
        List<TourComment> comments = tour.getTourComments();

        TourContainer tourContainer = new TourContainer();
        tourContainer.setTour(clientTour);
        tourContainer.setImages(images);
        tourContainer.setComments(comments);
        
        return tourContainer;
    }
    
    /*@RequestMapping(method=RequestMethod.GET, value="/toursByCoordinate/", produces="application/json")
    public @ResponseBody ToursContainer getToursByCoordinate(
            @RequestParam(value="mapCenterLat", required = true) Long mapCenterLat,
            @RequestParam(value="mapCenterLong", required = true) Long mapCenterLong,
            @RequestParam(value="zoomLevel", required = true) Long zoomLevel) {
        
        ToursContainer toursContainer = new ToursContainer();
        List<Tour> tours = new ArrayList<Tour>();
        
        tours = tourService.findToursByCoordinate(mapCenterLat, mapCenterLong, zoomLevel);
        
        return toursContainer;
    }*/
    
    @RequestMapping(method=RequestMethod.GET, value="/toursByCoordinate", produces="application/json")
    public @ResponseBody ToursContainer getToursByCoordinate(
            @RequestParam(value="topLeftLatitude", required = true) Double topLeftLatitude,
            @RequestParam(value="topLeftLongitude", required = true) Double topLeftLongitude,
            @RequestParam(value="bottomRightLatitude", required = true) Double bottomRightLatitude,
            @RequestParam(value="bottomRightLongitude", required = true) Double bottomRightLongitude) {
        
        ToursContainer toursContainer = new ToursContainer();
        List<Tour> tours = tourService.findToursByCoordinate(topLeftLatitude, topLeftLongitude, bottomRightLatitude, bottomRightLongitude);
        List<ClientTour> clientTours = Mapper.mapToursToClientsTour(tours);
        toursContainer.setTours(clientTours);
        
        return toursContainer;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/tours", produces="application/json")
    public @ResponseBody ToursContainer getTours(
            @RequestHeader(value = "X-Header-Token", required = false) String token,
            @RequestHeader(value = "X-Header-Provider", required = false) String provider,
            @RequestParam(value="query", required = false) String query,
            @RequestParam(value="ids[]", required = false) String[] ids,
            @RequestParam(value="status", required = false) String status,
            @RequestParam(value="liteTours", required = false) Boolean liteTours,
            @RequestParam(value="usersTours", required = false) Boolean usersTours) throws InvalidTourException, TokenInvalidException {
        
        ToursContainer toursContainer = new ToursContainer();
        List<Tour> tours = new ArrayList<Tour>();
        boolean includeComments = false;

        if(liteTours != null){
            tours = tourService.getLiteTours();
        }
        else if(usersTours != null){
            tours = tourService.getToursByCurrentUser(token, provider);
        }
        else {
            tours = tourService.getTours(token, provider, ids, query, status);
        }
        
        List<ClientTour> clientTours = Mapper.mapToursToClientsTour(tours);
        toursContainer.setTours(clientTours);

        if(includeComments){
            List<TourComment> comments = new ArrayList<TourComment>();
            comments = tourService.getTourComments(tours);
            toursContainer.setComments(comments);   
        }
        
        return toursContainer;
    }
    
    @RequestMapping(method=RequestMethod.PUT, value="/tours/{tourId}", consumes="application/json", produces="application/json")
    public @ResponseBody TourContainer updateTour(
            @RequestBody TourContainer tourContainer,
            @PathVariable String tourId,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider) throws InvalidTourException, TokenInvalidException {
        
        User user = authenticationRepository.getUserFromToken(token, provider);
        
        ClientTour clientTour = tourContainer.getTour();
        clientTour.setId(tourId);
        Tour tour = Mapper.mapClientTourToTour(clientTour, true, tourService, areaService);
        
        tour = tourService.updateTour(tour, user);
        
        tour = tourService.getTourByClientId(tourId);
        
        clientTour = Mapper.mapTourToClientTour(tour);
        tourContainer.setTour(clientTour);
        tourContainer.setImages(tour.getTourImages());
        tourContainer.setComments(tour.getTourComments());
        
        return tourContainer;
    }

    @RequestMapping(method=RequestMethod.POST, value="/tours", consumes="application/json", produces="application/json")
    public @ResponseBody TourContainer createTour(
            @RequestBody TourContainer tourContainer,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider) throws InvalidTourException, TokenInvalidException {
        
        User user = authenticationRepository.getUserFromToken(token, provider);
        ClientTour clientTour = tourContainer.getTour();
        Tour tour = Mapper.mapClientTourToTour(clientTour, false, tourService, areaService);
        tour = tourService.createTour(tour, user);
        ClientTour createdTour = Mapper.mapTourToClientTour(tour);
        tourContainer.setTour(createdTour);
        return tourContainer;
    }

    @RequestMapping(method=RequestMethod.GET, value="/images/{imageId}", produces="application/json")
    public @ResponseBody TourImageContainer getTourImage(@PathVariable String imageId) {
        TourImageContainer container = new TourImageContainer(); 
        container.setImage(tourRepository.getTourImage(imageId));
        return container;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/images", produces="application/json")
    public @ResponseBody TourImagesContainer getTourImages(@RequestParam(value="ids[]", required = true) String[] ids) {
        TourImagesContainer container = new TourImagesContainer(); 
        container.setImages(tourRepository.getTourImages(ids));
        return container;
    }
    
    @RequestMapping(method=RequestMethod.POST, value="/images", consumes="application/json", produces="application/json")
    public @ResponseBody TourImageContainer createTourImage(
            @RequestBody TourImageContainer tourImageContainer,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider) 
                    throws TokenInvalidException, IOException {
        
        User user = authenticationRepository.getUserFromToken(token, provider);
        
        TourImage image = tourImageContainer.getImage();
        
        tourService.createNewImage(image, user);
        
        
        return tourImageContainer;
    }
    
    @RequestMapping(method=RequestMethod.PUT, value="/images/{imageId}", consumes="application/json", produces="application/json")
    public @ResponseBody TourImageContainer updateTourImage(
            @RequestBody TourImageContainer imageContainer, 
            @PathVariable String imageId,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider) throws TokenInvalidException {
        
        User user = authenticationRepository.getUserFromToken(token, provider);
        
        TourImage image = imageContainer.getImage();
        
        TourImage updatedImage = tourService.updateImage(image, imageId, user);
        
        TourImageContainer container = new TourImageContainer();
        container.setImage(updatedImage);
        
        return container;
    }
    
    @RequestMapping(method=RequestMethod.DELETE, value="/images/{imageId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public @ResponseBody String deleteTourImage(
            @PathVariable String imageId,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider
            ) throws TokenInvalidException {
        
        User user = authenticationRepository.getUserFromToken(token, provider);
        
        tourService.deleteImage(imageId, user);
        
        return null;
    }
    
    @RequestMapping(method=RequestMethod.POST, value="/comments", consumes="application/json", produces="application/json")
    public @ResponseBody TourCommentContainer createComment(
            @RequestBody TourCommentContainer commentContainer,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider) throws InvalidTourException, TokenInvalidException {
        
        authenticationRepository.getUserFromToken(token, provider);
        
        TourComment comment = commentContainer.getComment();
        
        tourService.createComment(comment);
        
        return commentContainer;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/actions", produces="application/json")
    public @ResponseBody TourActionsContainer getTourActions(@RequestParam(value="ids[]", required = false) String[] ids) { 
        TourActionsContainer container = new TourActionsContainer();
        container.setActions(tourService.getTourActions(ids));
        return container;
    }
    
    @ExceptionHandler
    @ResponseStatus(HttpStatus.DESTINATION_LOCKED)
    public @ResponseBody TourErrorContainer handleInvalidTour(InvalidTourException e) {
        TourErrorContainer errorContainer = new TourErrorContainer();
        errorContainer.setErrors(e.getError());
        return errorContainer;
    }
    
    @ExceptionHandler
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public @ResponseBody TourErrorContainer handleInvalidToken(TokenInvalidException e) {
        TourError tourError = new TourError();
        String error = e.getMessage();
        tourError.setNameErrors(new ArrayList<String>(Arrays.asList(error)));
        TourErrorContainer errorContainer = new TourErrorContainer();
        errorContainer.setErrors(tourError);
        return errorContainer;
    }
    
    public static class Mapper {
        
        public static ClientTour mapTourToClientTour(Tour tour) {
            ClientTour clientTour = new ClientTour();
            
            clientTour.setAccessPoint(tour.getAccessPoint());
            clientTour.setAccessPointElevation(tour.getAccessPointElevation());
            clientTour.setActions(tour.getActions());
            clientTour.setArea(tour.getClientArea());
            clientTour.setAspect(tour.getAspect());
            clientTour.setDegreesMax(tour.getDegreesMax());
            clientTour.setElevationGain(tour.getElevationGain());
            clientTour.setElevationLoss(tour.getElevationLoss());
            clientTour.setElevationMax(tour.getElevationMax());
            clientTour.setGrade(tour.getGrade());
            clientTour.setHaveHazards(tour.isHaveHazards());
            clientTour.setHazardsDescription(tour.getHazardsDescription());
            clientTour.setId(tour.getClientId());
            clientTour.setItinerary(tour.getItinerary());
            clientTour.setMapPaths(tour.getMapPaths());
            clientTour.setMapGeoJson(tour.getMapGeoJson());
            clientTour.setTags(tour.getTags());
            clientTour.setName(tour.getName());
            clientTour.setPortfolioImage(tour.getPortfolioImage());
            clientTour.setPublishComment(tour.getPublishComment());
            clientTour.setRequiresTools(tour.isRequiresTools());
            clientTour.setShortDescription(tour.getShortDescription());
            clientTour.setStatus(tour.getStatus());
            clientTour.setTimeOfYearFrom(tour.getTimeOfYearFrom());
            clientTour.setTimeOfYearTo(tour.getTimeOfYearTo());
            clientTour.setTimingMax(tour.getTimingMax());
            clientTour.setTimingMin(tour.getTimingMin());
            clientTour.setToolsDescription(tour.getToolsDescription());
            clientTour.setImages(tour.getImages());
            clientTour.setComments(tour.getComments());
            
            return clientTour;
        }

        public static List<ClientTour> mapToursToClientsTour(List<Tour> tours) {
            List<ClientTour> clientTours = new ArrayList<ClientTour>();
            for(Tour tour : tours) {
                clientTours.add(mapTourToClientTour(tour));
            }
            
            return clientTours;
        }

        public static Tour mapClientTourToTour(ClientTour clientTour, boolean updateTour, TourService tourService, AreaService areaService) {
            Tour tour = new Tour();
            Tour serverSideTour = tourService.getTourByClientId(clientTour.getId());

            if(updateTour) {
                
                tour.setId(serverSideTour.getId());
            }
            
            Area area = areaService.findAreaByClientId(clientTour.getArea());
            tour.setArea(area.getId());
            tour.setAccessPoint(clientTour.getAccessPoint());
            tour.setAccessPointElevation(clientTour.getAccessPointElevation());
            tour.setActions(clientTour.getActions());
            tour.setClientArea(clientTour.getArea());
            tour.setAspect(clientTour.getAspect());
            tour.setDegreesMax(clientTour.getDegreesMax());
            tour.setElevationGain(clientTour.getElevationGain());
            tour.setElevationLoss(clientTour.getElevationLoss());
            tour.setElevationMax(clientTour.getElevationMax());
            tour.setGrade(clientTour.getGrade());
            tour.setHaveHazards(clientTour.isHaveHazards());
            tour.setHazardsDescription(clientTour.getHazardsDescription());
            tour.setItinerary(clientTour.getItinerary());
            tour.setMapPaths(clientTour.getMapPaths());
            tour.setMapGeoJson(clientTour.getMapGeoJson());
            tour.setTags(clientTour.getTags());
            tour.setName(clientTour.getName());
            tour.setPortfolioImage(clientTour.getPortfolioImage());
            tour.setPublishComment(clientTour.getPublishComment());
            tour.setRequiresTools(clientTour.isRequiresTools());
            tour.setShortDescription(clientTour.getShortDescription());
            tour.setStatus(clientTour.getStatus());
            tour.setTimeOfYearFrom(clientTour.getTimeOfYearFrom());
            tour.setTimeOfYearTo(clientTour.getTimeOfYearTo());
            tour.setTimingMax(clientTour.getTimingMax());
            tour.setTimingMin(clientTour.getTimingMin());
            tour.setToolsDescription(clientTour.getToolsDescription());
            tour.setClientId(clientTour.getId());
                  
            return tour;
        }
    }
}
