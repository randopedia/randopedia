package no.extreme.randopedia.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import no.extreme.randopedia.model.stats.Stats;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourStatus;
import no.extreme.randopedia.model.user.User;

@Repository
public class StatsRepositoryMongoImpl implements StatsRepository {

    @Autowired
    MongoOperations mongoOperations;
    
	@Override
	public Stats getStats() {
	    Criteria onlyPublishedCriteria = Criteria.where("status").is(TourStatus.PUBLISHED);
	    Criteria onlyDraftsCriteria = Criteria.where("status").is(TourStatus.DRAFT);
	    
		Stats stats = new Stats();
		
		stats.setId("12345"); // Dummy id
		stats.setPublishedTours(mongoOperations.count(new Query(onlyPublishedCriteria), Tour.class));
		stats.setTourDrafts(mongoOperations.count(new Query(onlyDraftsCriteria), Tour.class));
		stats.setRegisteredUsers(mongoOperations.count(new Query(), User.class));
		
		return stats;
	}
	
}
