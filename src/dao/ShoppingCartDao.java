package dao;

import model.CartGoodItem;
import model.Good;
import model.ShoppingCart;

public interface ShoppingCartDao {
	public ShoppingCart getShoppingCart(String user_id);
	
	public boolean addGoodToShoppingCart(CartGoodItem item);
	
	public boolean deleteGoodFromShoppingCart(CartGoodItem item);
}
