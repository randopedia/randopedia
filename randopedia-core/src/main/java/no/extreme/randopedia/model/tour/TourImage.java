package no.extreme.randopedia.model.tour;

import org.bson.types.ObjectId;
import org.codehaus.jackson.annotate.JsonProperty;
import org.springframework.data.annotation.Id;

public class TourImage {
  
    @Id
    private ObjectId _id;
    private String imageData;
    private String imageFile;
    private String tour;
    private String caption;
    private boolean isPortfolio;

    public ObjectId get_Id() {
        return _id;
    }
    
    public void set_Id(ObjectId _id){
        this._id = _id;
    }
   
    public String getId() {
        if(_id == null){
            return null;
        }
        return _id.toString();
    }

    public String getImageData() {
        return imageData;
    }
    
    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public String getTour() {
        return tour;
    }

    public void setTour(String tour) {
        this.tour = tour;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    @JsonProperty("isPortfolio")
    public boolean isPortfolio() {
        return isPortfolio;
    }

    @JsonProperty("isPortfolio")
    public void setPortfolio(boolean isPortfolio) {
        this.isPortfolio = isPortfolio;
    }

    public String getImageFile() {
        return imageFile;
    }

    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }
}
