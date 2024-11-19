package action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import model.CartGoodItem;
import model.Good;
import model.Order;
import model.User;
import model.UserGood;
import service.GoodDaoImp;
import service.OrderDaoImp;
import service.ShoppingCartDaoImp;
import service.UserDaoImp;

public class OrderAction {
	
	/**
	 * 生成订单并删除用户购物车中的数据
	 * @param user_id
	 * @param address
	 * @param order_time
	 * @param producer_id
	 * @param itemlist
	 * @return
	 */
	public boolean generateOrder(String user_id,String address,String order_time,String producer_id,List<Map> itemlist) {
		System.out.println(address);
		System.out.println(producer_id);
		System.out.println(itemlist.size());
		Order order = new Order();
		order.setOrder_id(new OrderDaoImp().generateOrderId());
		order.setCellphone(user_id);
		order.setOrder_time(order_time);
		order.setAddress(address);
		List<CartGoodItem> goodlist = new ArrayList<CartGoodItem>();
		for(Map item:itemlist) {
			CartGoodItem temp = new CartGoodItem();
			Good goodtemp = new Good();
			goodtemp.setProducer_id(producer_id);
			goodtemp.setGood_id((String)item.get("good_id"));
			temp.setGood(goodtemp);
			temp.setUser_id(user_id);
			int amount = Integer.parseInt((String)item.get("amount"));
			temp.setAmount(amount);
			
			goodlist.add(temp);
		}
		order.setGoodlist(goodlist);
		boolean res = new OrderDaoImp().generateOrder(order);
	
		if(res)
		{
			for(CartGoodItem item:order.getGoodlist())
			{
				return new ShoppingCartDaoImp().deleteGoodFromShoppingCart(item);
			}
		}
		return false;
	}
	
	public float computePrice(String user_id,String producer_id,List<Map> itemlist) {
		float total = 0.0f;
	
		for(Map item:itemlist)
		{
			UserGood producergood = new UserGood(user_id,(String)item.get("good_id"),producer_id);
			Good good = new GoodDaoImp().getGoodByProIdAndGoodId(producergood);
			int amount = Integer.parseInt((String)item.get("amount"));
			
			
			total += amount*good.getPrice();
		}
		return total;
	}
	
}	
