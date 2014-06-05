package no.extreme.randopedia.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tag.TagCloudTag;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourAction;
import no.extreme.randopedia.model.tour.TourComment;
import no.extreme.randopedia.model.tour.TourImage;
import no.extreme.randopedia.model.tour.TourStatus;
import no.extreme.randopedia.utils.RandoNameUtils;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class TourRepositoryMongoImpl implements TourRepository {

    @Autowired
    MongoOperations mongoOperations;

    private Criteria onlyPublishedCriteria = Criteria.where("status").is(TourStatus.PUBLISHED);
    
    /**
     * Creates a new tour or updates an existing tour. If id doesn't exist, a new document is inserted.
     */
    @Override
    public void saveTour(Tour tour) {
        // Set array to null to avoid getting keys with null/empty values in database
        if(tour.getTourImages() != null && tour.getTourImages().isEmpty()){
            tour.setTourImages(null);
        }
        
        if(tour.getClientId() == null) {
            String clientId = findUniqueClientId(tour);
            tour.setClientId(clientId);
        }
        
        mongoOperations.save(tour);
    }
    
    

    /**
     * Returns all published tours
     */
    @Override
    public List<Tour> findAllTours() {
        List<Tour> tours = mongoOperations.find(new Query(onlyPublishedCriteria), Tour.class);
        sortComments(tours);
        return tours;
    }
    
    @Override
    public List<Tour> findAllToursIgnoreStatus() {
        List<Tour> tours = mongoOperations.findAll(Tour.class);
        sortComments(tours);
        return tours;
    }
    
    /**
     * Returns the specified tour
     */
    @Override
	public Tour findTourById(String tourId) {
        Tour tour = mongoOperations.findById(tourId, Tour.class);
        
        if(tour != null) {
            sortComments(tour);
        }
        
        return tour;
    }
    
    @Override
    public Tour findTourByIdAndStatus(String tourId, int status){
        Criteria criteria = Criteria.where("id").is(tourId).and("status").is(status);
        Query query = Query.query(criteria);
    	return mongoOperations.findOne(query, Tour.class);
    }
    
    @Override
    public Tour findTourByClientIdAndStatus(String tourId, int status) {
        Criteria criteria = Criteria.where("clientId").is(tourId).and("status").is(status);
        Query query = Query.query(criteria);
        return mongoOperations.findOne(query, Tour.class);
    }

    /**
     * Returns published tours that match the search string
     */
    @Override
    public List<Tour> findToursByQuery(String searchString) {
        List<Tour> toursByName = new ArrayList<Tour>();
        List<Tour> toursByArea = new ArrayList<Tour>();
        List<Area> areasByName = new ArrayList<Area>();
        Criteria criteria = Criteria.where("name").regex(searchString, "i");
        Query query = Query.query(criteria);
        query.addCriteria(onlyPublishedCriteria);
        toursByName = mongoOperations.find(query, Tour.class);
        
        Criteria areaCriteria = Criteria.where("name").regex(searchString, "i");
        Query areaQuery = Query.query(areaCriteria);
        areasByName = mongoOperations.find(areaQuery, Area.class);
        
        List<Area> subAreas = new ArrayList<Area>();
        for(Area area : areasByName) {
            Criteria subAreaCriteria = Criteria.where("ancestors").in(area.getId());
            Query subAreaQuery = Query.query(subAreaCriteria);
            List<Area> subAreasTmp = mongoOperations.find(subAreaQuery, Area.class);
            if(subAreasTmp != null) {
                subAreas.addAll(subAreasTmp);
            }
        }
        
        Set<Area> allFoundAreas = new HashSet<Area>();
        allFoundAreas.addAll(areasByName);
        allFoundAreas.addAll(subAreas);
        
        
        List<String> areaIds = new ArrayList<String>();
        for(Area area : allFoundAreas) {
            areaIds.add(area.getId());
        }
        
        toursByArea = findToursByAreaId(areaIds);
        
        SortedSet<Tour> allTours = new TreeSet<Tour>();
        allTours.addAll(toursByArea);
        allTours.addAll(toursByName);
        return new ArrayList<Tour>(allTours);
    }

    /**
     * Returns all published tours in the specified areas
     */
    @Override
    public List<Tour> findToursByAreaId(List<String> areaIds) {
        Criteria areaCriteria = Criteria.where("areaId").in(areaIds);
        Query areaQuery = Query.query(areaCriteria);
        areaQuery.addCriteria(onlyPublishedCriteria);
        List<Tour> tours = mongoOperations.find(areaQuery, Tour.class);
        sortComments(tours);
        return tours;
    }

    @Override
    public void addCommentToTour(Tour tour, TourComment comment) {
        List<TourComment> comments = tour.getTourComments();
        if(comments == null) {
            comments = new ArrayList<TourComment>();
        }
        comment.setTime(new Date().getTime());
        comments.add(comment);
        tour.setTourComments(comments);
        
        mongoOperations.save(tour);
    }

    @Override
    public TourImage getTourImage(String imageId){
        Criteria criteria = Criteria.where("tourImages._id").in(imageId);
        Query query = Query.query(criteria);
        Tour tour = mongoOperations.findOne(query, Tour.class);
        
        if(tour == null){
            return null;
        }
        
        for(TourImage img : tour.getTourImages()){
            if(img.getId().equals(imageId)){
                return img;
            }
        }
        
        return null;
    }
    
    @Override
    public List<TourImage> getTourImages(Object[] ids){
        Criteria criteria = Criteria.where("tourImages._id").in(ids);
        Query query = Query.query(criteria);
        Tour tour = mongoOperations.findOne(query, Tour.class);
        
        if(tour == null){
            return null;
        }
        
        return tour.getTourImages();
    }
    
    @Override
    public void addImageToTour(Tour tour, TourImage image) {
        List<TourImage> images = tour.getTourImages();
        if(images == null) {
            images = new ArrayList<TourImage>();
        }
        image.set_Id(ObjectId.get());
        images.add(image);
        tour.setTourImages(images);
        saveTour(tour);
    }

    @Override
    public TourImage updateImageOnTour(Tour tour, String imageId, TourImage image) {
        List<TourImage> images = tour.getTourImages();
        int index = getIndexOfImage(images, imageId);
        if(index != -1){
            image.set_Id(new ObjectId(imageId));
            
            if(image.isPortfolio()){
                images.remove(index);
                images.add(0, image);
                index = 0;
                for(TourImage img : images){
                    if(!img.getId().equals(image.getId())){
                        img.setPortfolio(false);
                    }
                }
                tour.setPortfolioImage(image.getId());
            }
            else {
                images.set(index, image);
            }

            tour.setTourImages(images);
            saveTour(tour);
            
            return images.get(index);
        }
        return null;
    }
    
    @Override
    public void deleteImageFromTour(String imageId) {
        Tour tour = getTourFromImageId(imageId);
        if(tour == null){
            return;
        }
        
        List<TourImage> images = tour.getTourImages();
        int index = getIndexOfImage(images, imageId);
        if(index != -1){
            images.remove(index);
            if(images.size() == 0){
                images = null;
            }
            tour.setTourImages(images);
            mongoOperations.save(tour);
        }
    }
    
    @Override
    public Tour getTourFromImageId(String imageId) {
        Criteria criteria = Criteria.where("tourImages._id").is(imageId);
        Query query = Query.query(criteria);
        return mongoOperations.findOne(query, Tour.class);
    }
    
    @Override
    public List<Tour> getDrafts(String userId) {
        Criteria criteria = Criteria.where("userId").is(userId);
        Query query = Query.query(criteria);
        List<TourAction> actions = mongoOperations.find(query, TourAction.class);
        
        if(actions == null) {
        	return null;
        }
        
        List<Tour> tours = new ArrayList<Tour>();
        for(TourAction action : actions){
        	Tour tour = findTourByIdAndStatus(action.getTourId(), TourStatus.DRAFT);
        	if(tour != null && !containsTour(tours, tour.getId())){
        		tours.add(tour);	
        	}
        }
        
        return tours;
    } 
    
    @Override
	public List<Tour> getDeletedTours() {
        Criteria criteria = Criteria.where("status").is(TourStatus.DELETED);
        Query query = Query.query(criteria);
        return mongoOperations.find(query, Tour.class);
	}
    
    /**
     * Returns lite tours (only basic props included in returned tours)
     */
    @Override
    public List<Tour> getLiteTours() {
        Query query = new Query(onlyPublishedCriteria);
        query.fields().include("mapPaths");
        query.fields().include("name");
        query.fields().include("grade");
        query.fields().include("elevationLoss");
        query.fields().include("elevationGain");
        query.fields().include("timingMin");
        query.fields().include("timingMax");
        query.fields().include("shortDescription");
        query.fields().include("clientId");
        return mongoOperations.find(query, Tour.class);
    }
    
    @Override
    public Tour getRandomTour() {
    	List<Tour> result = getIdsForAllToursWithImages();
    	
    	int count = result.size();
    	if(count == 0) {
    	    return null;
    	}
    	
    	Random r = new Random();
    	int random = r.nextInt(count);
    	Tour tour = mongoOperations.findById(result.get(random).getId(), Tour.class);
    	
    	// If portfolio is not set on tour, first image is returned as portfolio
    	if(tour.getPortfolioImage() == null && tour.getTourImages().size() > 0) {
    	    tour.setPortfolioImage(tour.getTourImages().get(0).getId());
    	}
    	
    	return tour;
    }
    
    public List<Tour> getIdsForAllToursWithImages() {
        Criteria imagesNotNullCriteria = Criteria.where("tourImages").ne(null);
        Query query = new Query();
        query.addCriteria(imagesNotNullCriteria);
        query.addCriteria(onlyPublishedCriteria);
        query.fields().include("_id");
        return mongoOperations.find(query, Tour.class); 
    }
    
    private boolean containsTour(List<Tour> tours, String tourId){
    	for(Tour tour : tours) {
    		if(tour.getId().equals(tourId)){
    			return true;
    		}
    	}
    	return false;
    }
    
    private int getIndexOfImage(List<TourImage> images, String imageId){
        if(images == null || imageId == null){
            return -1;
        }
        for(int i = 0; i < images.size(); i++){
            String id = images.get(i).getId();
            if(id.equals(imageId)){
                return i;
            }
        }
        return -1;
    }
    
    private void sortComments(List<Tour> tours){
        for(Tour tour: tours){
            sortComments(tour);
        }
    }
    
    private void sortComments(Tour tour){
        Collections.sort(tour.getTourComments(), new Comparator<TourComment>() {
            @Override
            public int compare(TourComment o1, TourComment o2) {
                int res = new Date(o1.getTime()).compareTo(new Date(o2.getTime()));
                if(res > 0){
                    return -1;
                }
                else if(res < 0){
                    return 1;
                }
                return 0;
            }
        });
    }

    @Override
    public Tour findTourByClientId(String clientId) {
        Tour tour = mongoOperations.findOne(new Query(
                Criteria.where("clientId").is(clientId)), Tour.class, "tour");
        return tour;
    }
    
    private String findUniqueClientId(Tour tour) {
        String startClientId = RandoNameUtils.getTextId(tour.getName());
        String clientId = startClientId;
        int startIter = 1;
        Tour duplicate = findTourByClientId(startClientId);
        while(duplicate != null) {
            clientId = startClientId + "_" + startIter;
            duplicate = findTourByClientId(clientId);
            startIter++;
        }
        return clientId;
    }

    @Override
    public List<Tour> findToursByTag(String tagId) {
        Criteria tagCriteria = Criteria.where("tags").in(tagId);
        Query query = new Query();
        query.addCriteria(tagCriteria);
        query.addCriteria(onlyPublishedCriteria);
        return mongoOperations.find(query, Tour.class);
    }

    @Override
    public List<TagCloudTag> findAllTags() {
        List<TagCloudTag> tags = mongoOperations.findAll(TagCloudTag.class);
        
        Collections.sort(tags, new Comparator<TagCloudTag>() {
            @Override
            public int compare(TagCloudTag o1, TagCloudTag o2) {
                return o2.getValue().compareTo(o1.getValue());
            }
        });
        
        return tags;
    }
    
}

