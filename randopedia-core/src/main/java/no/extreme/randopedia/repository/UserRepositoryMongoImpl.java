package no.extreme.randopedia.repository;

import java.util.List;

import no.extreme.randopedia.model.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryMongoImpl implements UserRepository {
    
    @Autowired
    MongoOperations mongoOperations;

    /* (non-Javadoc)
     * @see no.extreme.randopedia.repository.UserRepository#addUser(no.extreme.randopedia.model.user.User)
     */
    @Override
    public void addUser(User user) {
        mongoOperations.insert(user);        
    }

    /* (non-Javadoc)
     * @see no.extreme.randopedia.repository.UserRepository#findAll()
     */
    @Override
    public List<User> findAll() {
        List<User> users = mongoOperations.findAll(User.class);
        return users;
    }

    /* (non-Javadoc)
     * @see no.extreme.randopedia.repository.UserRepository#findByUserId(java.lang.String)
     */
    @Override
    public User findByUserId(String userId) {
        User user = mongoOperations.findOne(new Query(
                Criteria.where("userId").is(userId)), User.class, "user");
        return user;
    }

    /* (non-Javadoc)
     * @see no.extreme.randopedia.repository.UserRepository#updateUser(no.extreme.randopedia.model.user.User)
     */
    @Override
    public void updateUser(User user) {
        mongoOperations.save(user);
    }

    @Override
    public boolean isValidClientToken(String token) {
        // TODO Auto-generated method stub
        return false;
    }
    

}
