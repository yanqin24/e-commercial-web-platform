package service;

import java.util.List;
import java.util.Random;

import org.apache.ibatis.session.SqlSession;
import org.springframework.test.context.jdbc.Sql;

import dao.OrderDao;
import model.CartGoodItem;
import model.Order;
import util.DBLoader;

public class OrderDaoImp implements OrderDao{
	
	/**
	 * @author 吴文军
	 * @param user_id:用户手机号
	 * @return 返回用户的所有订单信息
	 */
	@Override
	public List<Order> selectAllOrderByUser(String user_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Order> orderlist = session.selectList("conf.OrderMapper.selectAllOrderByUser", user_id);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
			return orderlist;
	}


	@Override
	public Order selectOrderById(String order_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Order order = session.selectOne("conf.OrderMapper.selectOrderById",order_id);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return order;
	}

	@Override
	public boolean deleteOrder(String order_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int res = session.delete("conf.OrderMapper.deleteOrderById", order_id);
		session.commit();
		session.close();
		System.out.println(res);
		return res == 1?true:false;
	}

	@Override
	public boolean generateOrder(Order order) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int res = session.insert("conf.OrderMapper.generateOrder", order);
		
		int ssres = session.insert("conf.OrderMapper.insertOrderGood", order);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return res==1&&ssres==order.getGoodlist().size()?true:false;
	}

	@Override
	public List<Order> getAllOrder() {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Order> orderlist = session.selectList("conf.OrderMapper.selectAllOrder");
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return orderlist;
	}


	@Override
	public List<String> getAllOrderId() {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<String> idlist = session.selectList("conf.OrderMapper.selectAllOrderId"); 
		session.close();
		// TODO Auto-generated method stub
		return idlist;
	}

	public String generateOrderId() {
		Random rand = new Random();
		List<String> idlist = getAllOrderId();
		String order_id;
		while(true) {
			boolean flag = false;
			int temp = rand.nextInt(1000000);
			order_id = String.valueOf(temp);
			for(String id:idlist) {
				if(id.equals(order_id))
					flag = true;
			}
			if(flag == false)
				break;
		}
		
		return order_id;
	}
}
