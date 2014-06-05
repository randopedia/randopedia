package no.extreme.randopedia.repository;

import java.io.IOException;

import no.extreme.randopedia.exception.TokenInvalidException;
import no.extreme.randopedia.model.user.GoogleUser;
import no.extreme.randopedia.model.user.GoogleVerifyToken;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class GoogleRepository extends AbstractAuthenticationRepository {
    
    Logger logger = LoggerFactory.getLogger(GoogleRepository.class);
    
    @Value("${google.app.secret}")
    private String APP_SECRET;
    @Value("${google.app.id}")
    private String APP_ID;
    
    //private final static String host = "https://graph.facebook.com/";
    private final static String host = "https://www.googleapis.com/oauth2/v1/";
   
    
    /**
     * Use a  token to get the user id from google
     * @param llToken
     * @return
     */
    public GoogleVerifyToken verifyToken(String token) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        String request = host + "tokeninfo?access_token=" + token;
        
        String responseData = getData(httpClient, request);
        
        ObjectMapper mapper = new ObjectMapper();
        
        GoogleVerifyToken tokenVerify = null;
        try {
            tokenVerify = mapper.readValue(responseData, GoogleVerifyToken.class);
            
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        if(tokenVerify != null) {
            return tokenVerify;
        }
        return null;
    }


    public GoogleUser getExternalUser(String token) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        String request = host + "userinfo?access_token=" + token;
        
        String responseData = getData(httpClient, request);
        
        ObjectMapper mapper = new ObjectMapper();
        GoogleUser user = null;
        try {
            user = mapper.readValue(responseData, GoogleUser.class);
            
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
        String request = host + "userinfo?access_token=" + token;
        
        String responseData = getData(httpClient, request);
        
        if("400".equals(responseData)) {
            throw new TokenInvalidException("Token invalid");
        }
        
        ObjectMapper mapper = new ObjectMapper();
        GoogleUser user = null;
        try {
            user = mapper.readValue(responseData, GoogleUser.class);
            
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
