package no.extreme.randopedia.model.tour;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.tour.client.ClientTour;

public class TourContainer {
    private ClientTour tour;
    private List<TourImage> images;
    private List<TourComment> comments;
    
    public ClientTour getTour() {
        return tour;
    }

    public void setTour(ClientTour tour) {
        this.tour = tour;
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
