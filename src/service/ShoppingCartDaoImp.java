package service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dao.ShoppingCartDao;
import model.ShoppingCart;
import model.UserGood;
import util.DBLoader;
import model.CartGoodItem;
import model.Good;
public class ShoppingCartDaoImp implements ShoppingCartDao{

	@Override
	public ShoppingCart getShoppingCart(String user_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		ShoppingCart cart = new ShoppingCart();
		List<CartGoodItem> cartgoodlist = session.selectList("conf.ShoppingCartMapper.selectGoodItem", user_id);
		cart.setGoodlist(cartgoodlist);
		return cart;
	}
	
	@Override
	public boolean addGoodToShoppingCart(CartGoodItem item) {
		// TODO Auto-generated method stub
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Integer amount = session.selectOne("conf.ShoppingCartMapper.selectAmountByItem", item);
		if(amount != null)
			item.setAmount(amount + item.getAmount()); 
		deleteGoodFromShoppingCart(item);
		int result = session.insert("conf.ShoppingCartMapper.insertGoodToCart", item);
		System.out.println(result);
		session.commit();
		session.close();
		return result == 1?true:false;
	}

	@Override
	public boolean deleteGoodFromShoppingCart(CartGoodItem item) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int result = session.delete("conf.ShoppingCartMapper.deleteGoodByIdFromCart", item);
		session.commit();
		session.close();
		return result == 1?true:false;// TODO Auto-generated method stub
	}
}
