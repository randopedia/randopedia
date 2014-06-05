package no.extreme.randopedia.model.tour;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class TourComment {
    @Id
    private ObjectId _id;
    private String comment;
    private String userId;
    private String firstName;
    private String userName;
    private long time;
    private String tour;
    
    public TourComment() {
        this._id = ObjectId.get();
    }
    
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public ObjectId get_Id() {
        return _id;
    }
    
    public String getId() {
        return _id.toString();
    }

    @Transient
    public String getTour() {
        return tour;
    }

    @Transient
    public void setTour(String tour) {
        this.tour = tour;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }    
}
