package no.extreme.randopedia.model.tag;

import java.util.List;

import no.extreme.randopedia.model.tour.client.ClientTour;

public class TagContainer {
    private Tag tag;
    private List<ClientTour> tours;

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public List<ClientTour> getTours() {
        return tours;
    }

    public void setTours(List<ClientTour> tours) {
        this.tours = tours;
    }
}
