package no.extreme.randopedia.model.stats;

public class Stats {
	private String id;
	private long publishedTours;
	private long publishedAreas;
	private long tourDrafts;
	private long registeredUsers;
	
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

	public long getTourDrafts() {
		return tourDrafts;
	}

	public void setTourDrafts(long tourDrafts) {
		this.tourDrafts = tourDrafts;
	}

    public long getRegisteredUsers() {
        return registeredUsers;
    }

    public void setRegisteredUsers(long registeredUsers) {
        this.registeredUsers = registeredUsers;
    }
}
