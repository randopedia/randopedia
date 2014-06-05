package no.extreme.randopedia.repository;

import static org.junit.Assert.*;

import java.util.List;

import no.extreme.randopedia.model.user.User;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:testContext.xml"
    })
public class UserRepositoryMongoImplntegrationTest {
    @Autowired
    MongoOperations mongoOperations;
    @Autowired
    UserRepository userRepository;
    
    @BeforeClass
    public static void initializeDB() {
     
        
    }

    @Before
    public void setUp() {

    }
    
    /**
     * Make sure to clean the database after each test
     */
    @After
    public void tearDown() {
        mongoOperations.dropCollection(User.class);
    }
    
    /**
     * Test add one user
     */
    @Test
    public void testAddOneUser() {
        User user = new User();
        user.setUserName("test testsson");
        userRepository.addUser(user);
        
        List<User> users = userRepository.findAll();
        assertEquals(1, users.size());
        assertEquals("test testsson", users.get(0).getUserName());
    }

}
