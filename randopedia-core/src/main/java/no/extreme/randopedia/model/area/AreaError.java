package no.extreme.randopedia.model.area;

import java.util.List;

public class AreaError {
    private List<String> nameErrors;
    private List<String> descriptionErrors;
    
    public List<String> getNameErrors() {
        return nameErrors;
    }
    public void setNameErrors(List<String> nameErorrs) {
        this.nameErrors = nameErorrs;
    }
    public List<String> getDescriptionErrors() {
        return descriptionErrors;
    }
    public void setDescriptionErrors(List<String> descriptionErrors) {
        this.descriptionErrors = descriptionErrors;
    }
    
    
}
