package no.extreme.randopedia.exception;

import java.util.List;

import no.extreme.randopedia.model.area.AreaError;

public class InvalidAreaException extends Exception {
    AreaError error;
    
    public InvalidAreaException(String message, AreaError error) {
        super(message);
        this.error = error;
    }

    public AreaError getError() {
        return error;
    }

}
