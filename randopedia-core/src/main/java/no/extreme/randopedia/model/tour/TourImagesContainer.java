package no.extreme.randopedia.model.tour;

import java.util.ArrayList;
import java.util.List;

public class TourImagesContainer {
    private List<TourImage> tourimages;

    public List<TourImage> getImages() {
        if(tourimages == null) {
            tourimages = new ArrayList<TourImage>();
        }
        return tourimages;
    }

    public void setImages(List<TourImage> tourimages) {
        this.tourimages = tourimages;
    }
}

