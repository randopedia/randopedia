package no.extreme.randopedia.controller;

import java.util.ArrayList;
import java.util.Arrays;

import no.extreme.randopedia.exception.TokenInvalidException;
import no.extreme.randopedia.model.user.FacebookUser;
import no.extreme.randopedia.model.user.GoogleUser;
import no.extreme.randopedia.model.user.GoogleVerifyToken;
import no.extreme.randopedia.model.user.User;
import no.extreme.randopedia.model.user.UserContainer;
import no.extreme.randopedia.model.user.UserError;
import no.extreme.randopedia.model.user.UserErrorContainer;
import no.extreme.randopedia.repository.FacebookRepository;
import no.extreme.randopedia.repository.GoogleRepository;
import no.extreme.randopedia.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping(value="/api")
public class UserController {
    
    @Autowired
    FacebookRepository facebookRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    GoogleRepository googleRepository;
    
    @RequestMapping(method=RequestMethod.POST, value="/users", consumes="application/json", produces="application/json")
    public @ResponseBody UserContainer userLogin(
            @RequestBody UserContainer userContainer,
            @RequestHeader("X-Header-Token") String token,
            @RequestHeader("X-Header-Provider") String provider
            ) throws TokenInvalidException {
        
        UserContainer container = new UserContainer();
        User loginRequestUser = userContainer.getUser();
        
        User user;
        
        if("facebook".equals(provider)) {
            String llToken = null;
            llToken = facebookRepository.generateLongLivedToken(loginRequestUser.getToken());
                    
            FacebookUser fbUser = facebookRepository.getExternalUser(llToken);
            
            user = userRepository.findByUserId(fbUser.getId());
            
            // If new user
            if(user == null) {
                user = loginRequestUser;
                user.setUserId(fbUser.getId());
                user.setUserName(fbUser.getName());
                user.setLongLivedToken(llToken);
                user.setAuthenticated(true);
                userRepository.addUser(user);
            }
            else {
                user.setLongLivedToken(llToken);
                // Update long lived token
                userRepository.updateUser(user);
                user.setAuthenticated(true);
                user.setToken(loginRequestUser.getToken());
                user.setTokenExp(loginRequestUser.getTokenExp());
            }
            container.setUser(user);
            
            return container;
        }
        else if("google".equals(provider)) {
            GoogleVerifyToken verifyToken = googleRepository.verifyToken(token);
            
            GoogleUser googleUser = googleRepository.getExternalUser(token);
            
            user = userRepository.findByUserId(googleUser.getId());
            // If new user
            if(user == null) {
                user = loginRequestUser;
                user.setUserId(googleUser.getId());
                user.setUserName(googleUser.getName());
                user.setAuthenticated(true);
                userRepository.addUser(user);
            }
            else {
                // Update long lived token
                userRepository.updateUser(user);
                user.setAuthenticated(true);
                user.setToken(loginRequestUser.getToken());
                user.setTokenExp(loginRequestUser.getTokenExp());
            }
            container.setUser(user);
            
            return container;
        }
        
        return null;
    }
    
    @ExceptionHandler
    @ResponseStatus(HttpStatus.DESTINATION_LOCKED)
    public @ResponseBody UserErrorContainer handleInvalidToken(TokenInvalidException e) {
        UserError userError = new UserError();
        String error = e.getMessage();
        UserErrorContainer errorContainer = new UserErrorContainer();
        userError.setUserIdErrors(new ArrayList<String>(Arrays.asList(error)));
        errorContainer.setErrors(userError);
        
        return errorContainer;
    }

    
}
