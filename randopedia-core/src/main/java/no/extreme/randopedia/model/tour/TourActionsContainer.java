package no.extreme.randopedia.model.tour;

import java.util.ArrayList;
import java.util.List;

public class TourActionsContainer {
    private List<TourAction> actions;

    public List<TourAction> getActions() {
        if(actions == null) {
            actions = new ArrayList<TourAction>();
        }
        return actions;
    }

    public void setActions(List<TourAction> actions) {
        this.actions = actions;
    }
}
