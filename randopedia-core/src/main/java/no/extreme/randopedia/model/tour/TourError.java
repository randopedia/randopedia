package no.extreme.randopedia.model.tour;

import java.util.List;

public class TourError {
    private List<String> nameErrors;
    private List<String> shortDescriptionErrors;
    private List<String> itineraryErrors;
    private List<String> startingPointErrors;
    private List<String> mountaineeringSkillsDescription;
    private List<String> dangerDescription;
    private List<String> comment;
    
    public List<String> getNameErrors() {
        return nameErrors;
    }

    public void setNameErrors(List<String> nameErrors) {
        this.nameErrors = nameErrors;
    }
    
    public List<String> getShortDescriptionErrors() {
        return shortDescriptionErrors;
    }

    public void setShortDescriptionErrors(List<String> shortDescriptionErrors) {
        this.shortDescriptionErrors = shortDescriptionErrors;
    }

    public List<String> getItineraryErrors() {
        return itineraryErrors;
    }

    public void setItineraryErrors(List<String> itineraryErrors) {
        this.itineraryErrors = itineraryErrors;
    }

    public List<String> getStartingPointErrors() {
        return startingPointErrors;
    }

    public void setStartingPointErrors(List<String> startingPointErrors) {
        this.startingPointErrors = startingPointErrors;
    }

    public List<String> getMountaineeringSkillsDescription() {
        return mountaineeringSkillsDescription;
    }

    public void setMountaineeringSkillsDescription(
            List<String> mountaineeringSkillsDescription) {
        this.mountaineeringSkillsDescription = mountaineeringSkillsDescription;
    }

    public List<String> getDangerDescription() {
        return dangerDescription;
    }

    public void setDangerDescription(List<String> dangerDescription) {
        this.dangerDescription = dangerDescription;
    }

    public List<String> getComment() {
        return comment;
    }

    public void setComment(List<String> comment) {
        this.comment = comment;
    }
}
