package no.extreme.randopedia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

@Service
public class UpdateTagCloudService {

    @Autowired
    MongoOperations mongoOperations;
    
    public void updateTagCloud() {
        //mongoOperations.aggregate(arg0, arg1)
    }
}
