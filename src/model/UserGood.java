package model;

public class UserGood {
	private String user_id;
	private String good_id;
	private String producer_id;
	public String getUser_id() {
		return user_id;
	}
	
	public UserGood(String user_id, String good_id, String producer_id) {
		super();
		this.user_id = user_id;
		this.good_id = good_id;
		this.producer_id = producer_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getGood_id() {
		return good_id;
	}
	public void setGood_id(String good_id) {
		this.good_id = good_id;
	}
	public String getProducer_id() {
		return producer_id;
	}
	public void setProducer_id(String producer_id) {
		this.producer_id = producer_id;
	}
}
