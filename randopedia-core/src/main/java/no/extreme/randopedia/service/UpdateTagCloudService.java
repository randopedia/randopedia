package no.extreme.randopedia.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import no.extreme.randopedia.model.tag.Tag;
import no.extreme.randopedia.model.tour.Tour;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoOperations;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.GroupOperation.GroupOperationBuilder;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.stereotype.Service;

@Service
public class UpdateTagCloudService {

    @Autowired
    MongoOperations mongoOperations;
    
    public void updateTagCloud() {
        
        mongoOperations.dropCollection(Tag.class);
        
        AggregationOperation project = Aggregation.project("tags");
        AggregationOperation unwind = Aggregation.unwind("tags");
        AggregationOperation group = Aggregation.group("tags").count().as("value");
        AggregationOperation sort = Aggregation.sort(Direction.DESC, "value");
        Aggregation aggregation = newAggregation(project, unwind, group, sort);
        AggregationResults<Tag> aggregate = mongoOperations.aggregate(aggregation, "tour", Tag.class);
    
        List<Tag> aggregatedTags = aggregate.getMappedResults();
        Tag firstTag = aggregatedTags.get(0);
        int max = 0;
        if(firstTag != null) {
            max = firstTag.getValue();
        }
        
        for(Tag tag : aggregatedTags) {
            BigDecimal fraction = new BigDecimal(tag.getValue()).divide(new BigDecimal(max), 4, RoundingMode.HALF_UP);
            BigDecimal popularity = fraction.multiply(new BigDecimal(5));
            tag.setPopularity(popularity.intValue());
        }
        
        mongoOperations.insert(aggregatedTags, Tag.class);
    }
    
}
