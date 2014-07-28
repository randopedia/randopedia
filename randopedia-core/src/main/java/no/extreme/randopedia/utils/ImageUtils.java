package no.extreme.randopedia.utils;

import java.io.IOException;

import sun.misc.BASE64Decoder;

public class ImageUtils {
    
    public static byte[] getImageBytesFromBase64(String imageDataBase64) throws IOException {
        String[] imageParts = imageDataBase64.split(",");
        
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] decodeBuffer = decoder.decodeBuffer(imageParts[1]);
    
        return decodeBuffer;
    }

}
