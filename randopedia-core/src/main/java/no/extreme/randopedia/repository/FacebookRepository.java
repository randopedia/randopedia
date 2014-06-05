package no.extreme.randopedia.repository;

import java.io.IOException;

import no.extreme.randopedia.exception.TokenInvalidException;
import no.extreme.randopedia.model.user.FacebookUser;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class FacebookRepository extends AbstractAuthenticationRepository {
    
    Logger logger = LoggerFactory.getLogger(FacebookRepository.class);
    
    @Value("${facebook.app.secret}")
    private String APP_SECRET;
    @Value("${facebook.app.id}")
    private String APP_ID;
    
    private final static String host = "https://graph.facebook.com/";
    
    /**
     * Generate a long lived token for server to facebook communication
     * @param token
     * @return
     */
    
    public String generateLongLivedToken(String token) throws TokenInvalidException{
        CloseableHttpClient httpClient = HttpClients.createDefault();
        String access = "oauth/access_token?grant_type=fb_exchange_token";
        String clientId = "&client_id=" + APP_ID;
        String clientSecret = "&client_secret=" + APP_SECRET;
        String fbToken = "&fb_exchange_token=" + token;
        String request = host + access + clientId + clientSecret + fbToken;
        String longLivedToken = getData(httpClient, request);
        if("400".equals(longLivedToken)) {
            throw new TokenInvalidException("Token invalid");
        }
        else {
            longLivedToken = longLivedToken.split("=")[1];
        }
        return longLivedToken;
    }
    
    /**
     * Use a long lived token to get the user id from facebook
     * @param llToken
     * @return
     */
    public FacebookUser getExternalUser(String llToken) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        String request = host + "me/?access_token=" + llToken;
        
        String responseData = getData(httpClient, request);
        
        ObjectMapper mapper = new ObjectMapper();
        FacebookUser user = null;
        try {
            user = mapper.readValue(responseData, FacebookUser.class);
            
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        if(user != null) {
            return user;
        }
        return null;
    }
    
    public String getUserIdFromToken(String token) throws TokenInvalidException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        String request = host + "me/?access_token=" + token;
        
        String responseData = getData(httpClient, request);
        
        if("400".equals(responseData)) {
            throw new TokenInvalidException("Token invalid");
        }
        
        ObjectMapper mapper = new ObjectMapper();
        FacebookUser user = null;
        try {
            user = mapper.readValue(responseData, FacebookUser.class);
            
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        if(user != null) {
            return user.getId();
        }
        return null;
    }
}
