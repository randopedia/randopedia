package no.extreme.randopedia.service;

import java.io.IOException;
import java.util.List;

import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.repository.TourRepository;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SnapshotCacheService {

    @Autowired
    TourRepository tourRepository;
    
    public void updateAllCaches() {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        List<Tour> tours = tourRepository.getLiteTours();
        
        for(Tour tour : tours) {
            updateTourCache(httpClient, tour);
        }
        
    }

    private void updateTourCache(CloseableHttpClient httpClient, Tour tour) {
        String request = "http://www.randopedia.net/?_escaped_fragment_=" + "/tours/" + tour.getClientId();
        getData(httpClient, request);
        request = "http://randopedia.net/?_escaped_fragment_=" + "/tours/" + tour.getClientId();
        getData(httpClient, request);
        
    }
    
    private String getData(CloseableHttpClient httpClient, String request) {
        HttpGet httpGet = new HttpGet(request);
                
        CloseableHttpResponse response = null;
        String responseData = null;
  
        try {
            response = httpClient.execute(httpGet);
            if(response.getStatusLine().getStatusCode() == 400) {
                return "400";
            }
            HttpEntity entity = response.getEntity();
            responseData = EntityUtils.toString(entity);
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return responseData;
    }

}
