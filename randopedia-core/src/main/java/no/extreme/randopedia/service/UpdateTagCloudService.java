package no.extreme.randopedia.service;

import java.util.List;

import no.extreme.randopedia.model.tag.Tag;
import no.extreme.randopedia.model.tour.Tour;

import org.springframework.beans.factory.annotation.Autowired;
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
        AggregationOperation project = Aggregation.project("tags");
        AggregationOperation sum = Aggregation.unwind("tags");
        AggregationOperation group = Aggregation.group("tags").count().as("value");

        Aggregation aggregation = newAggregation(project, sum, group);
        AggregationResults<Tag> aggregate = mongoOperations.aggregate(aggregation, "tour", Tag.class);
    
        List<Tag> aggregatedTags = aggregate.getMappedResults();
        
        mongoOperations.insert(aggregatedTags, Tag.class);
    }
    
}
