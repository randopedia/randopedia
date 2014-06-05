package no.extreme.randopedia.repository;

import java.util.List;

import no.extreme.randopedia.model.user.User;

public interface UserRepository {

    void addUser(User user);

    List<User> findAll();

    User findByUserId(String userId);

    void updateUser(User user);

    boolean isValidClientToken(String token);

}