package no.extreme.randopedia.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import no.extreme.randopedia.model.area.Area;
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
		stats.setPublishedAreas(mongoOperations.count(new Query(), Area.class));
		stats.setTourDrafts(mongoOperations.count(new Query(onlyDraftsCriteria), Tour.class));
		stats.setDeadAreas(getDeadAreasCount());
		stats.setRegisteredUsers(mongoOperations.count(new Query(), User.class));
		
		return stats;
	}
	
	private long getDeadAreasCount() {
		List<Area> allAreas = mongoOperations.findAll(Area.class);
		long count = 0;
		for(Area area : allAreas) {			
			boolean hasSubareas = false;
			boolean hasTours = false;
			
			List<Area> subareas = findSubAreasById(area.getId());
			if(subareas != null && subareas.size() > 0) {
				hasSubareas = true;
			}
			
			List<String> tours = area.getTours();
			if((tours != null && tours.size() > 0)) {
				hasTours = true;
			}
			
			if(!hasSubareas && !hasTours){
				count++;
			}
		}
		
		return count;
	}
	
    private List<Area> findSubAreasById(String id) {
        return mongoOperations.find(new Query(Criteria.where("parent").is(id)), Area.class, "area");        
    }
}
