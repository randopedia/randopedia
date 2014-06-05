package no.extreme.randopedia.repository;

import static org.junit.Assert.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import no.extreme.randopedia.model.area.Area;
import no.extreme.randopedia.model.tour.Grade;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourComment;
import no.extreme.randopedia.model.tour.TourImage;
import no.extreme.randopedia.model.tour.TourStatus;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:testContext.xml"})
public class TourRepositoryMongoImplIntegrationTest extends AbstractJUnit4SpringContextTests{
    @Autowired
    TourRepositoryMongoImpl tourRepo;
    @Autowired
    AreaRepositoryMongoImpl areaRepo;
    @Autowired
    MongoOperations mongoOperations;
    
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
        mongoOperations.dropCollection(Tour.class);
        mongoOperations.dropCollection(Area.class);
    }
    
    /**
     * Test adding one tour. Asserts on all basic properties (not area, images, comments or map paths)
     */
    @Test
    public void testAddOneTour_basicPropertiesSet() {
        createAndSaveBasicTour();
        Tour t = getFirstTourFromRepository();

        assertEquals(name, t.getName());
        assertEquals(shortDescription, t.getShortDescription());
        assertEquals(elevationMax, t.getElevationMax());
        assertEquals(elevationGain, t.getElevationGain());
        assertEquals(elevationLoss, t.getElevationLoss());
        assertEquals(haveHazards, t.isHaveHazards());
        assertEquals(hazardsDesc, t.getHazardsDescription());
        assertEquals(grade, t.getGrade());
        assertEquals(reqTools, t.isRequiresTools());
        assertEquals(toolDesc, t.getToolsDescription());
        assertEquals(timeOfYearFrom, t.getTimeOfYearFrom());
        assertEquals(timeOfYearTo, t.getTimeOfYearTo());
        assertEquals(accessPoint, t.getAccessPoint());
        assertEquals(timingMax, t.getTimingMax());
        assertEquals(timingMin, t.getTimingMin());
        assertEquals(degreesMax, t.getDegreesMax());
        assertNull(t.getArea());
    }
    
    /**
     * Test add one tour with one comment. Verify comment gets created with an id
     */
    @Test
    public void testAddOneTourWithComment_checkCommentHasId() {
        createAndSaveBasicTourWithComment();
        
        List<Tour> tours = tourRepo.findAllTours();
        assertEquals(1, tours.size());
        Tour t = tours.get(0);
        List<TourComment> comments = t.getTourComments();
        
        TourComment comment = comments.get(0);
        
        assertEquals(1, comments.size());
        assertEquals("comment", comment.getComment());
        assertEquals(24, comment.get_Id().toString().length());
                
    }
    
    /**
     * Test add a comment to a tour
     * 
     */
    @Test
    public void testAddOneCommentToTour_checkCommentHasId() {
        createAndSaveBasicTour();
        List<Tour> tours = tourRepo.findAllTours();
        Tour t = tours.get(0);
        
        TourComment comment = new TourComment();
        comment.setComment("comment");
        comment.setFirstName("mattias");
        comment.setUserId("123");
        tourRepo.addCommentToTour(t, comment);
        
        tours = tourRepo.findAllTours();
        t = tours.get(0);
        assertEquals(1, t.getTourComments().size());     
    }
    
    /**
     * Test add many comments to a tour
     */
    @Test
    public void testAddManyCommentsToTour_checkNumbers() {
        createAndSaveBasicTour();
        List<Tour> tours = tourRepo.findAllTours();
        Tour t = tours.get(0);
        
        TourComment comment = new TourComment();
        comment.setComment("comment1");
        comment.setFirstName("mattias");
        comment.setUserId("123");
        tourRepo.addCommentToTour(t, comment);
        
        comment = new TourComment();
        comment.setComment("comment2");
        comment.setFirstName("mattias");
        comment.setUserId("123");
        tourRepo.addCommentToTour(t, comment);
        
        comment = new TourComment();
        comment.setComment("comment3");
        comment.setFirstName("mattias");
        comment.setUserId("123");
        tourRepo.addCommentToTour(t, comment);
        
        tours = tourRepo.findAllTours();
        t = tours.get(0);
        assertEquals(3, t.getTourComments().size());
        
        // Test sort order
        List<TourComment> comments = t.getTourComments();
        assertEquals(comments.get(0).getComment(), "comment3");
        assertEquals(comments.get(1).getComment(), "comment2");
        assertEquals(comments.get(2).getComment(), "comment1");
    }
    
    /**
     * Test mark a tour as deleted
     */
    @Test
    public void testDeleteTour_MarkedAsDeletedSetAndIsNotReturnedOnFindAll() {
        createAndSaveBasicTour();
        
        List<Tour> tours = tourRepo.findAllTours();
        Tour tour = tours.get(0);
        tour.setStatus(TourStatus.DELETED);
        mongoOperations.save(tour);
        
        List<Tour> allTours = tourRepo.findAllTours();
        Tour deletedTour = tourRepo.findTourById(tour.getId());
        assertEquals(0, allTours.size());
        assertEquals((Integer)TourStatus.DELETED, deletedTour.getStatus());
    }
    
    /**
     * Test adding an image to a tour
     */
    @Test 
    public void testAddImageToTour_ImageIsReturnedOnFindTourWithDataAndCaption() {
        String imageCaption = "Is this caption really stored in database?";
        createAndSaveBasicTourAndAddOneImage(imageCaption);
        
        List<Tour> tours = tourRepo.findAllTours();
        Tour tour = tours.get(0);
        
        assertEquals(1, tour.getTourImages().size());
        assertNotNull(tour.getTourImages().get(0).getImageData());
        assertEquals(imageCaption, tour.getTourImages().get(0).getCaption());
    }

    /**
     * Test update caption on an image
     */
    @Test
    public void testUpdateImage_CaptionIsUpdatedOnImageOnFindTour() {
        String orgCaption = "original caption";
        String newCaption = "new caption";
        createAndSaveBasicTourAndAddOneImage(orgCaption);
        
        Tour tour = tourRepo.findAllTours().get(0);
        TourImage image = tour.getTourImages().get(0);
        image.setCaption(newCaption);
        tourRepo.updateImageOnTour(tour, image.getId(), image);
        
        Tour t =  tourRepo.findAllTours().get(0);
        assertEquals(newCaption, t.getTourImages().get(0).getCaption());
    }
    
    /**
     * Test delete an image on a tour
     */
    @Test
    public void testDeleteImage_ImageIsNotReturnedOnFindTour() {
        createAndSaveBasicTourAndAddOneImage(null);
        
        Tour tour = tourRepo.findAllTours().get(0);        
        String imageId = tour.getTourImages().get(0).getId();
        tourRepo.deleteImageFromTour(imageId);
        
        Tour t =  tourRepo.findAllTours().get(0);
        assertEquals(null, t.getTourImages());
    }
    
    @Test
    public void test_setPortfolioImage_CorrectImageIsPortfolio() {
        // ARRANGE
        createAndSaveBasicTour();
        
        List<Tour> tours = tourRepo.findAllTours();
        Tour tour = tours.get(0);

        TourImage image = createImage(null);;
        tourRepo.addImageToTour(tour, image);
        image = createImage(null);
        tourRepo.addImageToTour(tour, image);
        image = createImage(null);
        tourRepo.addImageToTour(tour, image);
        
        // ACT: Update image2, set as portfolio 
        Tour actTour = tourRepo.findAllTours().get(0); 
        TourImage actImage = actTour.getTourImages().get(2);
        actImage.setPortfolio(true);
        tourRepo.updateImageOnTour(actTour, actImage.getId(), actImage);
        
        // ASSERT: Image2 is set as portfolio
        Tour assertTour = tourRepo.findAllTours().get(0); 
        assertEquals(true, assertTour.getTourImages().get(0).isPortfolio());
        assertEquals(actImage.getId(), assertTour.getTourImages().get(0).getId());
                
        // ACT: Update and set image1 as portfolio
        actTour = tourRepo.findAllTours().get(0);
        actImage = actTour.getTourImages().get(1);
        actImage.setPortfolio(true);
        tourRepo.updateImageOnTour(actTour, actImage.getId(), actImage);
        
        // ASSERT: Image1 is set as portfolio and isPortfolio flag on Image2 is set to false 
        assertTour = tourRepo.findAllTours().get(0);        
        TourImage assertImage2 = actTour.getTourImages().get(2);
        
        assertEquals(true, assertTour.getTourImages().get(0).isPortfolio());
        assertEquals(actImage.getId(), assertTour.getTourImages().get(0).getId());
        
        assertEquals(false, assertImage2.isPortfolio());
    }
    
    @Test
    public void test_setPortfolioImage_CorrectImageIsSetAsPortfolioOnTour() {
        // ARRANGE
        createAndSaveBasicTour();
        
        List<Tour> tours = tourRepo.findAllTours();
        Tour tour = tours.get(0);

        TourImage image = createImage(null);
        image.setCaption("image 0");
        tourRepo.addImageToTour(tour, image);
        
        image = createImage(null);
        image.setCaption("image 1");
        tourRepo.addImageToTour(tour, image);
        
        // ACT
        Tour actTour = tourRepo.findAllTours().get(0); 
        List<TourImage> images = actTour.getTourImages();
        TourImage actImage = images.get(1);
        actImage.setPortfolio(true);
        tourRepo.updateImageOnTour(actTour, actImage.getId(), actImage);
        
        // ASSERT
        Tour assertTour = tourRepo.findAllTours().get(0); 
        assertEquals(true, assertTour.getPortfolioImage().equals(actImage.getId()));
    }
    
    @Test
    public void test_setPortfolioImage_PortfolioImageIsFirstAndCorrectNrOfImagesInList() {
        // ARRANGE
        createAndSaveBasicTour();
        
        List<Tour> tours = tourRepo.findAllTours();
        Tour tour = tours.get(0);

        TourImage image = createImage(null);
        tourRepo.addImageToTour(tour, image);
        image = createImage(null);
        tourRepo.addImageToTour(tour, image);
        image = createImage(null);
        tourRepo.addImageToTour(tour, image);
        
        // ACT
        Tour actTour = tourRepo.findAllTours().get(0); 
        TourImage actImage = actTour.getTourImages().get(2);
        actImage.setPortfolio(true);
        tourRepo.updateImageOnTour(actTour, actImage.getId(), actImage);
        
        // ASSERT: Tour has three images and image2 is first in list
        Tour assertTour = tourRepo.findAllTours().get(0); 
        assertEquals(actImage.getId(), assertTour.getTourImages().get(0).getId());
        assertEquals(3, assertTour.getTourImages().size());
        
    }
        
    @Test
    public void test_getRandomTour() {
        createAndSaveBasicTourAndAddOneImage("image0");
        createAndSaveBasicTourAndAddOneImage("image1");
        createAndSaveBasicTour();
        Tour tourWithEmptyImageArray = createBasicTour();
        tourWithEmptyImageArray.setTourImages(new ArrayList<TourImage>());
        tourRepo.saveTour(tourWithEmptyImageArray);
        
        // ASSERT: Empty image array is handled
        List<Tour> ids = tourRepo.getIdsForAllToursWithImages();
        assertEquals(2, ids.size());

        // ASSERT: Only tours that have images are returned
        Tour tour = tourRepo.getRandomTour();
        assertEquals(true, tour.getTourImages().size() > 0);
        tour = tourRepo.getRandomTour();
        assertEquals(true, tour.getTourImages().size() > 0);
        tour = tourRepo.getRandomTour();
        assertEquals(true, tour.getTourImages().size() > 0);
        
        // ASSERT: Tour has first image set as portfolio (default behaviour, portfolio has not been set)
        assertEquals(tour.getTourImages().get(0).getId(), tour.getPortfolioImage());
    }
    
    
    /**
     * Test move tour to new area
     */
    @Test
    public void testMoveTourToNewArea_TourIsMoved() {
        createAndSaveAreas();
        
        Area sweden = areaRepo.findAreaByName("Sweden");
        Area norway = areaRepo.findAreaByName("Norway");
        Tour tour = createBasicTour();
        tour.setArea(sweden.getId());
        tourRepo.saveTour(tour);
        
        Tour dbTour = getFirstTourFromRepository();
        assertEquals(dbTour.getArea(), sweden.getId());
        
        dbTour.setArea(norway.getId());
        tourRepo.saveTour(dbTour);
        
        Tour tourWithNewArea = getFirstTourFromRepository();
        assertEquals(tourWithNewArea.getArea(), norway.getId());
    }
    
    /**
     * Helpers
     */ 
    
    // Basic tour properties
    String name = "Test tour";
    String shortDescription = "A short description";
    Integer elevationMax = 8842;
    Integer elevationGain = 1000;
    Integer elevationLoss = 600;
    boolean haveHazards = true;
    String hazardsDesc = "Watch out!";
    boolean reqTools = true;
    String toolDesc = "Requires some fancy tools";
    Integer grade = Grade.DIFFICULT;
    Integer timeOfYearFrom = 1;
    Integer timeOfYearTo = 5;
    String accessPoint = "Start here";
    Integer timingMin = 3;
    Integer timingMax = 5;
    Integer degreesMax = 45;
    
    private Tour createBasicTour() {
        Tour tour = new Tour();
        tour.setName(name);
        tour.setShortDescription(shortDescription);
        tour.setElevationMax(elevationMax);
        tour.setHaveHazards(haveHazards);
        tour.setHazardsDescription(hazardsDesc);
        tour.setRequiresTools(reqTools);
        tour.setToolsDescription(toolDesc);
        tour.setGrade(grade);
        tour.setHaveHazards(haveHazards);
        tour.setElevationGain(elevationGain);
        tour.setElevationLoss(elevationLoss);
        tour.setTimeOfYearFrom(timeOfYearFrom);
        tour.setTimeOfYearTo(timeOfYearTo);
        tour.setAccessPoint(accessPoint);
        tour.setTimingMin(timingMin);
        tour.setTimingMax(timingMax);
        tour.setDegreesMax(degreesMax);
        tour.setStatus(TourStatus.PUBLISHED);
        return tour;
    }
    
    private Tour getFirstTourFromRepository(){
        List<Tour> tours = tourRepo.findAllTours();
        return tours.get(0);
    }
    
    private void createAndSaveBasicTour() {
        Tour tour = createBasicTour();
        mongoOperations.insert(tour);
    }
    
    private void createAndSaveBasicTourWithComment() {
        TourComment comment = new TourComment();
        comment.setComment("comment");
        comment.setFirstName("mattias");
        comment.setUserId("123");
        
        List<TourComment> comments = new ArrayList<TourComment>();
        comments.add(comment);
        
        Tour tour = new Tour();
        tour.setName(name);
        tour.setShortDescription(shortDescription);
        tour.setElevationMax(elevationMax);
        tour.setHaveHazards(haveHazards);
        tour.setRequiresTools(reqTools);
        tour.setGrade(grade);
        tour.setTourComments(comments);
        tour.setStatus(TourStatus.PUBLISHED);
     
        mongoOperations.insert(tour);
    }
    
    private void createAndSaveAreas() {
        Area area = new Area();
        area.setAncestors(null);
        area.setParent(null);
        area.setName("Earth");        
        mongoOperations.insert(area);
        
        Area parent = areaRepo.findAreaByName("Earth");
        Area europe = new Area();
        europe.setName("Europe");
        areaRepo.addArea(europe, parent);
        Area sweden = new Area();
        sweden.setName("Sweden");
        areaRepo.addArea(sweden, europe);       
        Area norway = new Area();
        norway.setName("Norway");
        areaRepo.addArea(norway, europe);     
    }
    
    private void createAndSaveBasicTourAndAddOneImage(String caption){
        createAndSaveBasicTour();
        
        List<Tour> tours = tourRepo.findAllTours();
        Tour tour = tours.get(0);

        TourImage image = createImage(null);
        image.setCaption(caption);
        
        tourRepo.addImageToTour(tour, image);
    }
    
    private TourImage createImage(String imageName){
        if(imageName == null){
            imageName = "img-1024x768.jpg";
        }
        
        TourImage image = new TourImage();        
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream input = classLoader.getResourceAsStream(imageName);

        try {
            byte[] bytes = IOUtils.toByteArray(input);
            byte[] imageDataBytes = Base64.encodeBase64(bytes);
            String imageDataString = new String(imageDataBytes, "UTF-8");
            image.setImageData(imageDataString);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        return image;
    }
}
