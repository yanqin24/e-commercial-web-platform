package model;

import java.sql.Date;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;

public class Order {
	
	private String order_id;
	private String cellphone;
	private String order_time;
	private String status;
	private String address;
	private String deliver_name;
	private List<CartGoodItem> goodlist;
	
	public Order() {
		status = "´ý·¢»õ";
		deliver_name = "Ë³·á";
	}
	public String getOrder_id() {
		return order_id;
	}
	
	public void setOrder_id(String order_id) {
		this.order_id = order_id;
	}
	public String getOrder_time() {
		return order_time;
	}
	public void setOrder_time(String order_time) {
		this.order_time = order_time;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDeliver_name() {
		return deliver_name;
	}
	public void setDeliver_name(String deliver_name) {
		this.deliver_name = deliver_name;
	}
	public List<CartGoodItem> getGoodlist() {
		return goodlist;
	}
	public void setGoodlist(List<CartGoodItem> goodlist) {
		this.goodlist = goodlist;
	}

	public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}
	
	
}
