package no.extreme.randopedia.repository;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import no.extreme.randopedia.model.tour.TourAction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ActionRepositoryMongoImpl implements ActionRepository {
    
    @Autowired
    MongoOperations mongoOperations;

    @Override
    public void saveTourAction(TourAction action){
        mongoOperations.insert(action);
    }

    @Override
    public TourAction findTourActionById(String id) {
        return mongoOperations.findById(id, TourAction.class);
    }
    
    @Override 
    public List<TourAction> findAllTourActions(String tourId) {
        Criteria criteria = Criteria.where("tourId").is(tourId);
        Query query = Query.query(criteria);
        List<TourAction> actions = mongoOperations.find(query, TourAction.class);
        
        Collections.sort(actions, new Comparator<TourAction>() {
		    @Override
		    public int compare(TourAction o1, TourAction o2) {
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
      
	    return actions;
    }
}

