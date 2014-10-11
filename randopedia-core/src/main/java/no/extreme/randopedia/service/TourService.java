package no.extreme.randopedia.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import no.extreme.randopedia.exception.InvalidTourException;
import no.extreme.randopedia.exception.TokenInvalidException;
import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tag.TagCloudTag;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourAction;
import no.extreme.randopedia.model.tour.TourActionType;
import no.extreme.randopedia.model.tour.TourComment;
import no.extreme.randopedia.model.tour.TourError;
import no.extreme.randopedia.model.tour.TourImage;
import no.extreme.randopedia.model.tour.TourStatus;
import no.extreme.randopedia.model.user.User;
import no.extreme.randopedia.repository.ActionRepository;
import no.extreme.randopedia.repository.AreaRepository;
import no.extreme.randopedia.repository.AuthenticationRepository;
import no.extreme.randopedia.repository.TourRepository;
import no.extreme.randopedia.utils.DataWasher;
import no.extreme.randopedia.validator.TourValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TourService {
    @Autowired
    TourRepository tourRepository;
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    AuthenticationRepository authenticationRepository;
    @Autowired
    ActionRepository actionRepository;
    
    /**
     * Get tours form query or ids
     * @param token
     * @param provider
     * @param ids
     * @param query
     * @param status
     * @return
     * @throws TokenInvalidException
     */
    public List<Tour> getTours(
            String token,
            String provider,
            String[] ids,
            String query,
            String status) throws TokenInvalidException {
        
        List<Tour> tours = new ArrayList<Tour>();
        
        if(ids != null) {
            for(String id : ids) {
                Tour tour = tourRepository.findTourByClientIdAndStatus(id, TourStatus.PUBLISHED);
                if(tour != null) {
                    tours.add(tour);
                }
            }
        }
        else if(status != null) {
            // Used to get tours with other statuses than PUBLISHED
            
            if(status.equals(Integer.toString(TourStatus.DRAFT))){
                User user = authenticationRepository.getUserFromToken(token, provider);
                tours = tourRepository.getDrafts(user.getId());
            }
            else if(status.equals(Integer.toString(TourStatus.DELETED))){
                tours = tourRepository.getDeletedTours();
            }
        }
        else {
            if(query != null) {
                tours = tourRepository.findToursByQuery(query);
            }
            else {
                tours = tourRepository.findAllTours();
            }
        }
        
        return tours;
    }
    
    /**
     * Get lite models of the tours
     * @return
     */
    public List<Tour> getLiteTours() {
        List<Tour> tours = new ArrayList<Tour>();
        tours = tourRepository.getLiteTours();
        return tours;
    }
    
    /**
     * Get a random tour
     * @return
     */
	public Tour getRandomTour() {
		return tourRepository.getRandomTour();
	}
    
    /**
     * Get comments for a tour
     * @param tours
     * @return
     */
    public List<TourComment> getTourComments(List<Tour> tours) {
        List<TourComment> comments = new ArrayList<TourComment>();
        
        for(Tour tour : tours){
            if(tour.getTourComments() != null) {
                comments.addAll(tour.getTourComments());
            }
        }
        
        return comments;
    }
    
    /**
     * Update a tour
     * @param tour
     * @param user
     * @return
     * @throws InvalidTourException
     */
    public Tour updateTour(Tour tour, User user) throws InvalidTourException {
        DataWasher washer = new DataWasher();
        TourValidator validator = new TourValidator();
        TourError error = new TourError();
        
        if(!validator.validateTour(tour, error)) {
            throw new InvalidTourException("Tour validation errors", error);
        }
        
        tour = washer.washTour(tour);

        Tour currentTour = tourRepository.findTourById(tour.getId());
        if(currentTour == null) {
            throw new InvalidTourException("Tour not found", error);
        }
        
        if(tour.getStatus() == TourStatus.PUBLISHED){
            if(tour.getArea() != currentTour.getArea()){
                addTourToArea(tour);
                deleteTourFromArea(tour, currentTour);
            }   
        }
        
        tour.setTourImages(currentTour.getTourImages());
        tour.setTourComments(currentTour.getTourComments());

        tourRepository.saveTour(tour);
        
        saveTourAction(user, tour, TourActionType.UPDATE);
        
        if(currentTour.getStatus() == TourStatus.DRAFT && tour.getStatus() == TourStatus.PUBLISHED){
            
            // TOUR IS PUBLISHED FOR THE FIRST TIME
            
            addTourToArea(tour);
            saveTourAction(user, tour, TourActionType.PUBLISH);
        }
        
        return tour;
    }
    
    /**
     * Create a new tour
     * @param tour
     * @param user
     * @return
     * @throws InvalidTourException
     */
    public Tour createTour(Tour tour, User user) throws InvalidTourException {
     // Validate
        TourValidator validator = new TourValidator();
        TourError error = new TourError();
        DataWasher washer = new DataWasher();
        if(!validator.validateTour(tour, error)) {
            throw new InvalidTourException("Tour validation errors", error);
        }
        
        tour = washer.washTour(tour);
        
        tourRepository.saveTour(tour);

        saveTourAction(user, tour, TourActionType.CREATE);
        
        if(tour.getStatus() == TourStatus.PUBLISHED){
            
            // TOUR IS CREATED AND PUBLISHED
            
            addTourToArea(tour);    
            saveTourAction(user, tour, TourActionType.PUBLISH);
        }
        
        return tour;
    }
    
    /**
     * Create new image
     * @param image
     * @param user
     * @throws Exception 
     */
    public void createNewImage(TourImage image, User user) throws IOException {
        Tour tour = tourRepository.findTourByClientId(image.getTour());

        tourRepository.addImageToTour(tour, image);

        saveTourAction(user, tour, TourActionType.IMAGE_CREATE);        
    }
    
    /**
     * Update an image
     * @param image
     * @param imageId
     * @param user
     * @return
     */
    public TourImage updateImage(TourImage image, String imageId, User user) {
        Tour tour = tourRepository.findTourByClientId(image.getTour());
        
        TourImage updatedImage = tourRepository.updateImageOnTour(tour, imageId, image);
        saveTourAction(user, tour, TourActionType.IMAGE_UPDATE);
    
        return updatedImage;
    }
    
    /**
     * Delete an image
     * @param imageId
     * @param user
     */
    public void deleteImage(String imageId, User user) {
        Tour tour = tourRepository.getTourFromImageId(imageId);
        tourRepository.deleteImageFromTour(imageId);
        
        Tour updatedTour = tourRepository.findTourById(tour.getId());
        saveTourAction(user, updatedTour, TourActionType.IMAGE_DELETE);
    }
    
    /**
     * Create a new comment
     * @param comment
     * @throws InvalidTourException
     */
    public void createComment(TourComment comment) throws InvalidTourException {
     // Validate
        TourValidator validator = new TourValidator();
        TourError error = new TourError();
        DataWasher washer = new DataWasher();
        if(!validator.validateComment(comment, error)) {
            throw new InvalidTourException("Tour validation errors", error);
        }
        
        comment = washer.washComment(comment);
        
        Tour tour = tourRepository.findTourByClientId(comment.getTour());
        tourRepository.addCommentToTour(tour, comment);
    }
    
    /**
     * Get all actions for a tour
     * @param ids
     * @return
     */
    public List<TourAction> getTourActions(String[] ids) {
        List<TourAction> actions = new ArrayList<TourAction>();
        
        if(ids != null) {
            for(String id : ids) {
                TourAction action = actionRepository.findTourActionById(id);
                actions.add(action);
            }
        }
        
        return actions;
    }

    private void addTourToArea(Tour tour){
        Area area = areaRepository.findAreaById(tour.getArea());
        List<String> tours = area.getTours();
        List<String> clientTours = area.getClientTours();
        tours.add(tour.getId());
        clientTours.add(tour.getClientId());
        area.setTours(tours);
        area.setClientTours(clientTours);
        areaRepository.updateArea(area);
    }
    
    private void deleteTourFromArea(Tour tour, Tour currentTour){
        Area area = areaRepository.findAreaById(currentTour.getArea());
        if(area == null){
            return;
        }
        List<String> tours = area.getTours();
        List<String> clientTours = area.getClientTours();
        tours.remove(tour.getId());
        clientTours.remove(tour.getClientId());
        area.setTours(tours);
        area.setClientTours(clientTours);
        areaRepository.updateArea(area);
    }
    
    private void saveTourAction(User user, Tour tour, int type){
        if(tour == null) {
            return;
        }
        
        if(tour.getStatus() == TourStatus.DRAFT && type != TourActionType.CREATE) {
            // We don't save actions as long as the tour is a draft (except for the created action)
            return;
        }
        
        TourAction action = new TourAction();
        action.setUserId(user.getId());
        action.setUserName(user.getUserName());
        action.setTourId(tour.getId());
        action.setTime(new Date().getTime());
        action.setType(type);
        action.setComment(tour.getPublishComment());
        actionRepository.saveTourAction(action);
        
        List<TourAction> actions = actionRepository.findAllTourActions(tour.getId());
        List<String> actionIds = new ArrayList<String>();
        for(TourAction tourAction : actions){
            actionIds.add(tourAction.getId());
        }
        
        tour.setActions(actionIds);
        tourRepository.saveTour(tour);
    }

    public Tour getTourByClientId(String id) {
        return tourRepository.findTourByClientId(id);
    }

    public List<Tour> findToursByTag(String tagId) {
        return tourRepository.findToursByTag(tagId);
    }

    public List<TagCloudTag> findAllTags() {
        List<TagCloudTag> tags = tourRepository.findAllTags();
        
        for(TagCloudTag tag : tags) {
            tag.setName(tag.getId());
            tag.setTours(new ArrayList<String>());
        }
        return tags;
    }

    public List<Tour> findToursByCoordinate(Long mapCenterLat, Long mapCenterLong, Long zoomLevel) {
        return tourRepository.findToursByCoordinate(mapCenterLat, mapCenterLong, zoomLevel);
    }

    public List<Tour> findToursByCoordinate(
            Double topLeftLatitude,
            Double topLeftLongitude,
            Double bottomRightLatitude,
            Double bottomRightLongitude) {
        return tourRepository.findToursByCoordinate(topLeftLatitude, topLeftLongitude, bottomRightLatitude, bottomRightLongitude);
    }

    
}
