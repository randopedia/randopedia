package no.extreme.randopedia.repository;

import java.util.List;

import no.extreme.randopedia.model.tour.TourAction;

public interface ActionRepository {

    void saveTourAction(TourAction action);
    TourAction findTourActionById(String id);
	List<TourAction> findAllTourActions(String tourId);
}