package no.extreme.randopedia.repository;

import no.extreme.randopedia.exception.TokenInvalidException;
import no.extreme.randopedia.model.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthenticationRepository {
    
    @Autowired
    GoogleRepository googleRepository;
    @Autowired
    FacebookRepository facebookRepository;
    @Autowired
    UserRepository userRepository;
    
    public User getUserFromToken(String token, String provider)
            throws TokenInvalidException {
        User user;
        // Check if token is valid (user logged in ok), throws invalid token exception if auth problem
        if("facebook".equals(provider)) {
            String fbUserId = facebookRepository.getUserIdFromToken(token);
            user = userRepository.findByUserId(fbUserId);
        }
        else {
            String googleUserId = googleRepository.getUserIdFromToken(token);
            user = userRepository.findByUserId(googleUserId);
        }
        return user;
    }

}