package no.extreme.randopedia.helper;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;


import org.junit.Test;

public class GeoHelperTest {

    @Test
    public void test_getCenterCoordinatePositiveCoordinates() {
        List<Double> latitudes = new ArrayList<Double>();
        List<Double> longitudes = new ArrayList<Double>();
        latitudes.add(60.1);
        latitudes.add(61.2);
        latitudes.add(62.3);
        latitudes.add(63.4);
        latitudes.add(64.5);
        
        longitudes.add(12.1);
        longitudes.add(13.2);
        longitudes.add(14.3);
        longitudes.add(15.4);
        longitudes.add(16.5);
        
        List<Double> centerCoordinates = GeoHelper.getCenterCoordinate(latitudes, longitudes);

        assertEquals(62.3d, (double)centerCoordinates.get(0), 0.001);
        assertEquals(14.3d, (double)centerCoordinates.get(1), 0.001);
    }
    
    @Test
    public void test_getCenterCoordinateNegativeCoordinates() {
        List<Double> latitudes = new ArrayList<Double>();
        List<Double> longitudes = new ArrayList<Double>();
        latitudes.add(-60.1);
        latitudes.add(-61.2);
        latitudes.add(-62.3);
        latitudes.add(-63.4);
        latitudes.add(-64.5);
        
        longitudes.add(-12.1);
        longitudes.add(-13.2);
        longitudes.add(-14.3);
        longitudes.add(-15.4);
        longitudes.add(-16.5);
        
        List<Double> centerCoordinates = GeoHelper.getCenterCoordinate(latitudes, longitudes);

        assertEquals(-62.3d, (double)centerCoordinates.get(0), 0.001);
        assertEquals(-14.3d, (double)centerCoordinates.get(1), 0.001);
    }
    
    @Test
    public void test_getCenterCoordinatePosAndNegCoordinates() {
        List<Double> latitudes = new ArrayList<Double>();
        List<Double> longitudes = new ArrayList<Double>();
        latitudes.add(-10.1);
        latitudes.add(-5.2);
        latitudes.add(-4.3);
        latitudes.add(2.4);
        latitudes.add(1.5);
        
        longitudes.add(-12.1);
        longitudes.add(-5.2);
        longitudes.add(-2.3);
        longitudes.add(15.4);
        longitudes.add(20.5);
        
        List<Double> centerCoordinates = GeoHelper.getCenterCoordinate(latitudes, longitudes);

        assertEquals(-3.14d, (double)centerCoordinates.get(0), 0.001);
        assertEquals(3.26d, (double)centerCoordinates.get(1), 0.001);
    }
}
