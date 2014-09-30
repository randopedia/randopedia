package no.extreme.randopedia.helper;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.math3.stat.descriptive.moment.Mean;

public class GeoHelper {

    public static List<Double> getCenterCoordinate(List<Double> latitudes, List<Double> longitudes) {
        Mean mean = new Mean();
        double[] latitudesArray = ArrayUtils.toPrimitive(latitudes.toArray(new Double[latitudes.size()]));
        double[] longitudesArray = ArrayUtils.toPrimitive(longitudes.toArray(new Double[latitudes.size()]));
        double meanLatitude = mean.evaluate(latitudesArray);
        double meanLongitude = mean.evaluate(longitudesArray);
        
        List<Double> meanCoordinates = new ArrayList<Double>();
        meanCoordinates.add(meanLatitude);
        meanCoordinates.add(meanLongitude);
        
        return meanCoordinates;
    }
}
