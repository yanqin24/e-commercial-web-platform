package model;

public class Producer {
	private String producer_id;
	private String name;
	private String province;
	private String city;
	private String county;
	private String src;
	public String getProducer_id() {
		return producer_id;
	}
	public void setProducer_id(String producer_id) {
		this.producer_id = producer_id;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	
}
