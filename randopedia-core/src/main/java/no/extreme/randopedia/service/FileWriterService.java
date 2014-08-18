package no.extreme.randopedia.service;

import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.extreme.randopedia.factory.OutputStreamFactory;

@Service
public class FileWriterService {
    
    @Autowired
    private OutputStreamFactory outputStreamFactory;
    
    public void writeFile(String fileName, byte[] fileData) throws IOException {
        FileOutputStream fos = outputStreamFactory.getFileOutputStream(fileName);
        try {
            fos.write(fileData);
        } finally {
            fos.close();
        }
    }

}
