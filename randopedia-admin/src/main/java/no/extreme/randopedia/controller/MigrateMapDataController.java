package no.extreme.randopedia.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.migration.MigrationResult;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.repository.TourRepositoryMongoImpl;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/admin")
public class MigrateMapDataController {

    Logger logger = LoggerFactory.getLogger(MigratePicturesController.class);

    @Autowired
    TourRepositoryMongoImpl tourRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/migrateMapPathsToGeoJson", produces = "application/json")
    public @ResponseBody MigrationResult migrateMapPaths() throws IOException {
        
        int migratedCount = 0;
        int alreadyHasGeoJsonCount = 0;
        int noMapPathsCount = 0;

        List<Tour> tours = tourRepository.findAllTours();
        for (Tour tour : tours) {
        
            if(tour.getMapPaths() == null) {
                noMapPathsCount++;
            }
            else if(tour.getMapGeoJson() != null) {
                alreadyHasGeoJsonCount++;
            }
            else
            {
                Object geojson = createGeoJson(tour.getMapPaths());
                tour.setMapGeoJson(geojson);
                migratedCount++;
                tourRepository.saveTour(tour);
            }
        }

        MigrationResult result = new MigrationResult();
        result.setResult(migratedCount + " tours were migrated. " + noMapPathsCount + " tours didn't have map paths. " + alreadyHasGeoJsonCount + " tours already have GeoJson data.");
        return result;
    
    }
    
    private Object createGeoJson(List<Object> mapPaths) {
        if(mapPaths == null) {
            return null;
        }
        
        JSONObject rootObj = new JSONObject();
        
        JSONArray features = new JSONArray();
        
        for(Object path: mapPaths) {
            JSONObject featuresObj = new JSONObject();
            
            JSONArray geometry = new JSONArray();
            JSONObject geometryObj = new JSONObject();
            geometryObj.put("type", "LineString");
            geometryObj.put("coordinates", swapLatLng(path));
            
            featuresObj.put("type", "Feature");
            featuresObj.put("geometry", geometryObj);
            
            features.add(featuresObj);
            
        }
        
        rootObj.put("type", "FeatureCollection");
        rootObj.put("features", features);
        
        return rootObj;  
    }
    
    private Object swapLatLng(Object path) {
        ArrayList pathsArray = (ArrayList) path;
        ArrayList resultArray = new ArrayList();
        
        for(Object coordinate : pathsArray) {
            ArrayList coordinateArray = (ArrayList) coordinate;
            ArrayList swapped = new ArrayList();
            swapped.add(coordinateArray.get(1));
            swapped.add(coordinateArray.get(0));
            resultArray.add(swapped);
        }
        
        return resultArray;
    }
    
}
