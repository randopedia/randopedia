package no.extreme.randopedia.repository;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;


public abstract class AbstractAuthenticationRepository {
    
    protected String getData(CloseableHttpClient httpClient, String request) {
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
