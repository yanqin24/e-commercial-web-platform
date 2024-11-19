package dao;

import java.util.List;

import model.Order;

public interface OrderDao {	
		public List<Order> selectAllOrderByUser(String user_id);
		
		public Order selectOrderById(String order_id);
		
		public boolean deleteOrder(String order_id);
		
		public boolean generateOrder(Order order);
		
		public List<Order> getAllOrder();	
		
		public List<String> getAllOrderId();
}
