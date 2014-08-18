package no.extreme.randopedia.factory;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import org.springframework.stereotype.Component;

@Component
public class OutputStreamFactory {
    
    public FileOutputStream getFileOutputStream(String fileName) throws FileNotFoundException {
        return new FileOutputStream(fileName);
    }
}
