package no.extreme.randopedia.model.stats;

public class Stats {
	private String id;
	private long publishedTours;
	private long publishedAreas;
	private long deadAreas;
	private long tourDrafts;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getPublishedTours() {
		return publishedTours;
	}
	
	public void setPublishedTours(long publishedTours) {
		this.publishedTours = publishedTours;
	}
	
	public long getPublishedAreas() {
		return publishedAreas;
	}
	
	public void setPublishedAreas(long publishedAreas) {
		this.publishedAreas = publishedAreas;
	}

	public long getDeadAreas() {
		return deadAreas;
	}

	public void setDeadAreas(long deadAreas) {
		this.deadAreas = deadAreas;
	}

	public long getTourDrafts() {
		return tourDrafts;
	}

	public void setTourDrafts(long tourDrafts) {
		this.tourDrafts = tourDrafts;
	}
}
