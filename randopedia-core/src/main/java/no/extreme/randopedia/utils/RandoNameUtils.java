package no.extreme.randopedia.utils;

import java.text.Normalizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RandoNameUtils {
    
    static Logger logger = LoggerFactory.getLogger(RandoNameUtils.class);
    
    public static String getTextId(String name) {
        String textId = Normalizer.normalize(name, Normalizer.Form.NFKD);

        
        
        textId = textId.replace('ø', 'o');
        textId = textId.replace('æ', 'a');
        textId = textId.replace('Ø', 'O');
        textId = textId.replace('Æ', 'A');
        textId = textId.replace('å', 'a');
        textId = textId.replace('ä', 'a');
        textId = textId.replace('ö', 'o');
        textId = textId.replace('Å', 'a');
        textId = textId.replace('Ä', 'a');
        textId = textId.replace('Ö', 'o');

        logger.info("after replace: " + textId);
        textId = textId.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        logger.info("after diactritical: " + textId);
        textId = textId.replaceAll("[^a-zA-Z0-9]", "_");
        logger.info("After regexp: " + textId);
        return textId.toLowerCase();
    }
}
