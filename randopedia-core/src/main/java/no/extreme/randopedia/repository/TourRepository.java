package no.extreme.randopedia.repository;

import java.io.IOException;
import java.util.List;

import no.extreme.randopedia.model.tag.Tag;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourComment;
import no.extreme.randopedia.model.tour.TourImage;

public interface TourRepository {
	void saveTour(Tour tour);
	List<Tour> findAllTours();
	List<Tour> findAllToursIgnoreStatus();
	Tour findTourById(String tourId);
	Tour findTourByIdAndStatus(String tourId, int status);
    List<Tour> findToursByQuery(String searchString);
    List<Tour> findToursByAreaId(List<String> areaIds);
    void addCommentToTour(Tour t, TourComment comment);
    List<TourImage> getTourImages(Object[] ids);
    TourImage getTourImage(String imageId);
    void addImageToTour(Tour tour, TourImage image) throws IOException;
    TourImage updateImageOnTour(Tour tour, String imageId, TourImage image);
    void deleteImageFromTour(String imageId);
	Tour getTourFromImageId(String imageId);
	List<Tour> getDrafts(String userId);
	List<Tour> getDeletedTours();
    List<Tour> getLiteTours();
    Tour getRandomTour();
    Tour findTourByClientIdAndStatus(String id, int status);
    Tour findTourByClientId(String id);
    List<Tour> findToursByTag(String tagId);
    List<Tag> findAllTags();
    List<Tour> findToursByCoordinate(Long mapCenterLat, Long mapCenterLong, Long zoomLevel);
    List<Tour> findToursByCoordinate(Double topLeftLatitude, Double topLeftLongitude, Double bottomRightLatitude, Double bottomRightLongitude);
}