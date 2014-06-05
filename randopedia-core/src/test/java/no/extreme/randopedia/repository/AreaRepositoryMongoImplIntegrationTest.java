package no.extreme.randopedia.repository;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Tour;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;




@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:testContext.xml"
    })
public class AreaRepositoryMongoImplIntegrationTest extends AbstractJUnit4SpringContextTests{
    
    @Autowired
    AreaRepositoryMongoImpl areaRepo;
    @Autowired
    MongoOperations mongoOperations;
    
    /*private static final String MONGO_HOST = "localhost";
    private static final int MONGO_PORT = 27777;
    private static final String IN_MEM_CONNECTION_URL = MONGO_HOST + ":" + MONGO_PORT;
 
    private MongodExecutable mongodExe;
    private MongodProcess mongod;
    private Mongo mongo;*/
    

    @BeforeClass
    public static void initializeDB() {
     
        
    }
    
    /**
     * Set up the collection with one super node: Earth
     */
    @Before
    public void setUp() {
        //mongoOperations.createCollection(Area.class);
        Area area = new Area();
        area.setAncestors(null);
        area.setParent(null);
        area.setName("Earth");        
        mongoOperations.insert(area);
    }

    /**
     * Make sure to clean the database after each test
     */
    @After
    public void tearDown() {
        mongoOperations.dropCollection(Area.class);
    }
    
    /**
     * Test adding one area under Earth
     */
    @Test
    public void addOneTopArea_returnsNumberOfAncestors() {
        Area parent = areaRepo.findAreaByName("Earth");
        Area area = new Area();
        area.setName("Europe");
        int nbrAncestors = areaRepo.addArea(area, parent);
        Area europe = areaRepo.findAreaByName("Europe");
        Area parentOfEurope = areaRepo.findAreaById(europe.getParent());
        
        assertEquals("Earth", parentOfEurope.getName());
        assertEquals(1, nbrAncestors);
        assertNotNull(europe);
    }
    
    /**
     * Test finding one area by it's name
     */
    @Test
    public void findAreaByName_returnsThatArea() {
        Area parent = areaRepo.findAreaByName("Earth");
        assertNotNull(parent);
        
        Area area = new Area();
        area.setName("Europe");
        area.setParent(parent.getName());
        List<String> ancestors = new ArrayList<String>();
        ancestors.add(parent.getName());
        area.setAncestors(ancestors);
        int nbrAncestors = areaRepo.addArea(area, parent);
        Area europe = areaRepo.findAreaByName("Europe");
        
        assertEquals("Europe", europe.getName());
        
    }
    
    /**
     * Test finding an are that doesn't exist
     */
    @Test
    public void findNonExistingArea() {
        Area earth = areaRepo.findAreaByName("wohoo!");
        assertNull(earth);
        Area otherEarth = areaRepo.findAreaById("doesnotexist");
        assertNull(otherEarth);
    }
    
    /**
     * Test finding one area by it's id
     */
    @Test
    public void findAreaById() {
        Area earth = areaRepo.findAreaByName("Earth");
        String id = earth.getId();
        Area earthById = areaRepo.findAreaById(id);
        assertEquals(earth.getName(), earthById.getName());
    }
    
    /**
     * Test adding an area under an area under Earth
     * 
     */
    @Test
    public void addAreasTwoDeep() {
        Area parent = areaRepo.findAreaByName("Earth");
        assertNotNull(parent);
        
        Area europe = new Area();
        europe.setName("Europe");
        
        int nbrAncestors = areaRepo.addArea(europe, parent);
        assertEquals(1, nbrAncestors);
        
        Area sweden = new Area();
        sweden.setName("Sweden");
        nbrAncestors = areaRepo.addArea(sweden, europe);
        
        assertEquals(2, nbrAncestors);
        
    }
    
    @Test
    public void findSubAreasOfEarth_returnsTwoAreas() {
        Area parent = areaRepo.findAreaByName("Earth");
        assertNotNull(parent);
        Area europe = new Area();
        europe.setName("Europe");
        int nbrAncestors = areaRepo.addArea(europe, parent);
        Area america = new Area();
        america.setName("America");
        europe.setName("Europe");
        nbrAncestors = areaRepo.addArea(america, parent);

        Area top = areaRepo.findAreaByName("Earth");
        List<Area> areas = areaRepo.findSubAreasById(top.getId());
        
        assertEquals(2,  areas.size());
    }
    
    @Test
    public void testFindChildrenOfSubArea() {
        Area parent = areaRepo.findAreaByName("Earth");
        assertNotNull(parent);
        Area europe = new Area();
        europe.setName("Europe");
        int nbrAncestors = areaRepo.addArea(europe, parent);
        Area america = new Area();
        america.setName("America");
        europe.setName("Europe");
        nbrAncestors = areaRepo.addArea(america, parent);
        Area sweden = new Area();
        sweden.setName("Sweden");
        nbrAncestors = areaRepo.addArea(sweden, europe);
        Area alaska = new Area();
        alaska.setName("Alaska");
        areaRepo.addArea(alaska, america);
        
        Area top = areaRepo.findAreaByName("Europe");
        List<Area> areas = areaRepo.findSubAreasById(top.getId());
        assertEquals(1, areas.size());
        assertEquals(sweden.getId(), areas.get(0).getId());      
    }
    
    @Test
    public void testUpdateAreaName() {
        Area area = areaRepo.findAreaByName("Earth");
        assertNotNull(area);
        area.setName("Earth 2");
        areaRepo.updateArea(area);
        Area sameArea = areaRepo.findAreaByName("Earth 2");
        assertNotNull(sameArea);   
    }
    
    @Test
    public void testFindNonExistingArea() {
        Area area = areaRepo.findAreaByName("Apan");
        assertNull(area);
    }
    
    @Test
    public void testFindAllAreas() {
        Area parent = areaRepo.findAreaByName("Earth");
        Area europe = new Area();
        europe.setName("Europe");
        int nbrAncestors = areaRepo.addArea(europe, parent);
        Area america = new Area();
        america.setName("America");
        nbrAncestors = areaRepo.addArea(america, parent);
        
        List<Area> areas = areaRepo.findAll();
        assertEquals(3, areas.size());
        Area foundEarth = areaRepo.findAreaByName("Earth");
        assertEquals(2, foundEarth.getChildren().size());
        
    }
    
    @Test
    public void testAddTourToArea() {
        Area parent = areaRepo.findAreaByName("Earth");
        Tour tour = new Tour();
        tour.setName("tour");
        tour.setId("123");
        tour.setClientId("123");
        Tour tour2 = new Tour();
        tour2.setName("tour2");
        tour2.setId("456");
        tour2.setClientId("456");
        
        areaRepo.addTourToArea(tour, parent);
        areaRepo.addTourToArea(tour2, parent);        
        parent = areaRepo.findAreaByName("Earth");
        
        
        assertEquals(2, parent.getTours().size());
        
    }
    
    @Test
    public void testDeleteTourFromArea() {
        Area parent = areaRepo.findAreaByName("Earth");
        Tour tour = new Tour();
        tour.setName("tour");
        tour.setId("123");
        Tour tour2 = new Tour();
        tour2.setName("tour2");
        tour2.setId("456");
        areaRepo.addTourToArea(tour, parent);
        areaRepo.addTourToArea(tour2, parent);
        
        parent = areaRepo.findAreaByName("Earth");
        assertEquals(2, parent.getTours().size());
        
        areaRepo.deleteTourFromArea(tour, parent);
        assertEquals(1, parent.getTours().size());
        List<String> tours = parent.getTours();
        assertEquals(true, tours.contains("456"));
        
    }
    
//    @Test void testFindQuery() {
//        Area parent = treeRepo.findAreaByName("Earth");
//        Area europe = new Area();
//        europe.setName("Europe");
//        int nbrAncestors = treeRepo.addArea(europe, parent);
//        Query query = new Query();
//        query.addCriteria(Criteria.where("name").is("Europe"));
//        tours = tourRepository.findToursByQuery(query);
//        
//        
//    }
    
    
}
