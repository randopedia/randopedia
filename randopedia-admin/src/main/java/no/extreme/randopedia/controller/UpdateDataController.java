package no.extreme.randopedia.controller;

import java.io.IOException;
import java.util.List;

import no.extreme.randopedia.model.migration.MigrationResult;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.update.UpdateResult;
import no.extreme.randopedia.service.SnapshotCacheService;
import no.extreme.randopedia.service.TourService;
import no.extreme.randopedia.service.UpdateTagCloudService;
import no.extreme.randopedia.service.UpdateTourCenterCoordinatesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/admin")
public class UpdateDataController {

    @Autowired
    UpdateTagCloudService updateTagCloudService;
    @Autowired
    UpdateTourCenterCoordinatesService updateTourCenterCoordinatesService;
    @Autowired
    SnapshotCacheService snapshotCacheService;

    @RequestMapping(method = RequestMethod.GET, value = "/updateTagCloud", produces = "application/json")
    public @ResponseBody MigrationResult updateTagCloud() throws IOException {

        updateTagCloudService.updateTagCloud();
        MigrationResult result = new MigrationResult();
        result.setResult("Ok");
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/updateTourCenterCoordinates", produces = "application/json")
    public @ResponseBody UpdateResult updateTourCenterCoordinates() throws IOException {
        int updated = updateTourCenterCoordinatesService.updateAllToursCenterCoordinates();
        UpdateResult result = new UpdateResult();
        result.setResult("Update: " + updated + " tours");
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/updateAllCaches", produces = "application/json")
    public @ResponseBody UpdateResult updateAllCaches() throws IOException {
        snapshotCacheService.updateAllCaches();
        UpdateResult result = new UpdateResult();
        result.setResult("Ok");
        return result;
    }
        
    
}
