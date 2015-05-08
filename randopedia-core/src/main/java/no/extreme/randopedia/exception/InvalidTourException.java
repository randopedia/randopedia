package no.extreme.randopedia.exception;

import no.extreme.randopedia.model.tour.TourError;

public class InvalidTourException extends Exception{
    
    TourError error;
    
    public InvalidTourException(String message, TourError error) {
        super(message);
        this.error = error;
    }
    
    public TourError getError() {
        return error;
    }

}
