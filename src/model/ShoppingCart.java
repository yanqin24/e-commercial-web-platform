package model;


import java.util.List;


public class ShoppingCart {
	private List<CartGoodItem> goodlist;

	public List<CartGoodItem> getGoodlist() {
		return goodlist;
	}
	public void setGoodlist(List<CartGoodItem> goodlist) {
		this.goodlist = goodlist;
	}
}
