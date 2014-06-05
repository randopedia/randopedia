package no.extreme.randopedia.model.tour;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.tour.client.ClientTour;

public class ToursContainer {
    private List<ClientTour> tours;
    private List<TourImage> images;
    private List<TourComment> comments;
    
    public List<ClientTour> getTours() {
        if(tours == null) {
            tours = new ArrayList<ClientTour>();
        }
        return tours;
    }

    public void setTours(List<ClientTour> tours) {
        this.tours = tours;
    }

    public List<TourImage> getImages() {
        if(images == null){
            images = new ArrayList<TourImage>();
        }
        return images;
    }

    public void setImages(List<TourImage> images) {
        this.images = images;
    }

    public List<TourComment> getComments() {
        if(comments == null){
            comments = new ArrayList<TourComment>();
        }
        return comments;
    }

    public void setComments(List<TourComment> comments) {
        this.comments = comments;
    }
}
