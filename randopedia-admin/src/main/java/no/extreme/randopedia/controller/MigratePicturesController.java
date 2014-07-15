package no.extreme.randopedia.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import no.extreme.randopedia.model.migration.MigrationResult;
import no.extreme.randopedia.model.tour.Tour;
import no.extreme.randopedia.model.tour.TourImage;
import no.extreme.randopedia.repository.TourRepositoryMongoImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sun.misc.BASE64Decoder;

@Controller
@RequestMapping(value = "/admin")
public class MigratePicturesController {

    @Value("${pictures.migrate.directory}")
    private String BASE_PICTURE_PATH;

    Logger logger = LoggerFactory.getLogger(MigratePicturesController.class);

    @Autowired
    TourRepositoryMongoImpl tourRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/migratePictures", produces = "application/json")
    public @ResponseBody
    MigrationResult migratePictures() throws IOException {

        List<Tour> tours = tourRepository.findAllTours();
        for (Tour tour : tours) {
            List<TourImage> tourImages = tour.getTourImages();
            int i = 0;
            if (tourImages != null) {
                for (TourImage image : tourImages) {
                    String imageDataBase64 = image.getImageData();
                    String[] imageParts = imageDataBase64.split(",");
                    
                    BASE64Decoder decoder = new BASE64Decoder();
                    byte[] decodeBuffer = decoder.decodeBuffer(imageParts[1]);
                    String fileName = 
                            BASE_PICTURE_PATH + "/" + tour.getClientId()
                            + "_" + i + ".jpg";
                    FileOutputStream fos = new FileOutputStream(fileName);
                    try {
                        fos.write(decodeBuffer);
                    } finally {
                        fos.close();
                    }

                    i++;
                }
            }
        }

        MigrationResult result = new MigrationResult();
        result.setResult("OK");

        return result;
    }
}
