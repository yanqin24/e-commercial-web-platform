package controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.SimpleFormatter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.util.JSONPObject;

import action.OrderAction;
import action.UserLoginAction;
import model.CartGoodItem;
import model.Good;
import model.Order;
import model.ShoppingCart;
import model.User;
import model.UserGood;
import service.CollectionDaoImp;
import service.GoodDaoImp;
import service.OrderDaoImp;
import service.ShoppingCartDaoImp;
import service.UserDaoImp;

/**
 * ��½     ע��    ���ﳵ    ����      �ղؼ�     ������Ϣ
 * @author ���ľ�
 *
 */
@Controller
public class UserController {

	/**
	 * �Ѳ���
	 * �û���½
	 * @param user
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/user/login/signup",method = RequestMethod.POST)
	public Object signup(User user,HttpSession session) {
	
		Map<String,Object> jsondata = new HashMap<String,Object>();
		int status = new UserLoginAction().loginValidate(user);
		if(status==403) {
			jsondata.put("status", status);
			jsondata.put("errdetail","�˺��Ѷ���");
			return jsondata;
		}
		if(status == 200) {
			session.setAttribute("user", user.getCellphone());
		}
		jsondata.put("status", status);
		return jsondata;
	}
	
	/**
	 * �Ѳ���
	 * �û�ע��
	 * @param user
	 * @return
	 */
	@ResponseBody 
	@RequestMapping(value = "/user/login/signin",method = RequestMethod.POST)
	public Object signin(User user) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		System.out.println(user.getCellphone());
		if(user.getCellphone()==null) {
			jsondata.put("status", 404);
			return jsondata;
		}
		int status = new UserLoginAction().register(user);
		jsondata.put("status", status);
		return jsondata;
	}
	
	/**
	 * �Ѳ���
	 * ��ȡ�û����ﳵ
	 * @param session
	 * @param req
	 * @return
	 */
	
	@ResponseBody
	@RequestMapping(value = "user/shoppingcart",method = RequestMethod.GET)
	public Object getShoppingcart(HttpSession session,HttpServletRequest req) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(!new UserLoginAction().islogined(session))
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		jsondata.put("status", 200);
		jsondata.put("shoppingcart", new ShoppingCartDaoImp().getShoppingCart((String)session.getAttribute("user")).getGoodlist());
		return jsondata;
	}
	
	
	/**
	 * �Ѳ���
	 * ��ȡ�û�������Ϣ
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "user/getuserinfo",method = RequestMethod.GET)
	public Object getUserInfo(HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(!new UserLoginAction().islogined(session))	
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		
		User user = new UserDaoImp().selectUserById((String)session.getAttribute("user"));
		if(user == null)
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		jsondata.put("status", 200);
		jsondata.put("user", user);
		return jsondata;
	}
	
	
	/**
	 * �Ѳ���
	 * ����Ʒ���뵽�û����ﳵ
	 * @param good_id
	 * @param producer_id
	 * @param amount
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "user/addtocart",method = RequestMethod.POST)
	public Object addtocart(String good_id,String producer_id,String amount,HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(!new UserLoginAction().islogined(session))	
			{
				jsondata.put("status", 404);
				return jsondata;
			}
		CartGoodItem item = new CartGoodItem();	
		
		Good good = new Good();
		good.setGood_id(good_id);
		good.setProducer_id(producer_id);
		item.setGood(good);
		item.setUser_id((String)session.getAttribute("user"));	
		item.setAmount(Integer.parseInt(amount));
		if(new ShoppingCartDaoImp().addGoodToShoppingCart(item))
			{ 
				jsondata.put("status", 200);
				return jsondata;
			}
		jsondata.put("status", 400);
		return jsondata;
	}
	

	
	/**
	 * �Ѳ���
	 * ��ȡ�û������ж���
	 * @param session
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "user/orderlist", method= RequestMethod.GET)
	public Object getOrderList(HttpSession session,HttpServletRequest req) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(!new UserLoginAction().islogined(session))	
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		List<Order> orderlist = new OrderDaoImp().selectAllOrderByUser((String)session.getAttribute("user"));
		jsondata.put("status", 200);
		jsondata.put("order_list",orderlist);
		return jsondata;
	}
	
	/**
	 * �Ѳ���
	 * ���ܶ�����Ϣ�����ɶ���
	 * @param session
	 * @param map
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "user/orderlist", method= RequestMethod.POST)
	public Object generateOrder(HttpSession session,@RequestBody Map json,HttpServletRequest req) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(!new UserLoginAction().islogined(session))	
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		float totalprice = 0.0f;
		List<Map> itemlist = (List<Map>)json.get("order"); //������Ʒ����һ��������map
		String producer_id = (String)json.get("producer_id");   //
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String order_time = df.format(System.currentTimeMillis());
		String address = (String)json.get("address");
		String user_id = (String)session.getAttribute("user");
		User user = new UserDaoImp().selectUserById(user_id);
		for(Map item:itemlist) {
			UserGood producergood = new UserGood(user_id, (String)item.get("good_id"), producer_id);
			Good good = new GoodDaoImp().getGoodByProIdAndGoodId(producergood);
			if(good == null) {
				jsondata.put("status", 404);
				jsondata.put("errdetail", "���̼��޴���Ʒ");
				return jsondata;
			}
		}
		float total =new OrderAction().computePrice(user_id,producer_id,itemlist);
		if(total <= user.getMoney())
		{
			user.setMoney(user.getMoney()-total);
			new UserDaoImp().updateUserInfo(user);
		}
		else {
			jsondata.put("status", 400);
			jsondata.put("errdetail", "����");
			return jsondata;
		}
		boolean res = new OrderAction().generateOrder(user_id, address, order_time, producer_id, itemlist);
		if(res) {
			System.out.println(user_id + "����" +total+"Ԫ����������Ʒ,time:" + order_time);
			jsondata.put("status", 200);
		}
		else
		{
			jsondata.put("status",403);
			jsondata.put("errdetail", "���ɶ���ʧ��");
		}
		return jsondata;
	}

	/**
	 * �Ѳ���
	 * ��ȡ�û��ղؼ��е���Ʒ�б�
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "user/collection",method = RequestMethod.GET)
	public Object getUserCollection(HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		String user_id = (String) session.getAttribute("user");
		if(!new UserLoginAction().islogined(session))
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		jsondata.put("good_list", new CollectionDaoImp().getCollectionList(user_id));
		jsondata.put("status", 200);	
		return jsondata;
	}
	
	/**
	 * 
	 * @param map
	 * @param session
	 * @return
	 */
	
	@ResponseBody
	@RequestMapping(value = "/user/collection", method = RequestMethod.POST)
	public Object insertIntoCollection(String good_id,String producer_id, HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		String user_id = (String) session.getAttribute("user");
		if(!new UserLoginAction().islogined(session))
		{
			jsondata.put("status", 404);
			jsondata.put("description", "�û�δ��½");
			return jsondata;
		}
			jsondata.put("status", new CollectionDaoImp().insertIntoCollection(user_id, good_id, producer_id));
		return jsondata;
	}
	
	@ResponseBody
	@RequestMapping(value = "/user/collection", method = RequestMethod.DELETE)
	public Object deleteCollection(Map<String, Object> map, HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		String user_id = (String) session.getAttribute("user");
		if(!new UserLoginAction().islogined(session))
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		String good_id = (String) map.get("good_id");
		String producer_id = (String) map.get("producer_id");
		if(good_id==null||producer_id==null)
		{
			jsondata.put("status",404);
			jsondata.put("errdetail", "δ�������");
			return jsondata;
		}
		if (!new CollectionDaoImp().deleteCollection(user_id,good_id,producer_id))
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "ɾ��ʧ�ܻ��ղؼ��޸���Ʒ");
		}
			else
				jsondata.put("status", 200);
		return jsondata;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/user/shoppingcart",method = RequestMethod.DELETE)
	public Object deleteItemFromCart(HttpSession session,Map json) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(!new UserLoginAction().islogined(session))
		{
			jsondata.put("status", 404);
			return jsondata;
		}
		CartGoodItem item = new CartGoodItem();
		item.setUser_id((String)json.get("user_id"));
		item.getGood().setGood_id((String)json.get("good_id"));
		item.getGood().setProducer_id((String)json.get("producer_id"));
		if(!new ShoppingCartDaoImp().deleteGoodFromShoppingCart(item))
		{
			jsondata.put("status", 400);
		}
		else
			jsondata.put("status", 200);
		return jsondata;
	}
	
	/**
	 * 
	 * �޸��û�������Ϣ���������뵫������ͷ��
	 * @param user
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/user",method = RequestMethod.POST)
	public Object updateUserInfo(String cellphone,String blocked,String email,String gender,String address,String name,String age,String password,HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(cellphone == null) {
			jsondata.put("status", 404);
			jsondata.put("errdetail", "�������Ϊ��");
			return jsondata;
		}
		if(!new UserLoginAction().islogined(session))
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "δ��¼");
			return jsondata;
		}
		
		User usertemp = new UserDaoImp().selectUserById(cellphone);
		if(password != null)
		{
			usertemp.setPassword(password);
		}
		if(address != null)
		{
			List<String> addresslist = new ArrayList<String>();
			addresslist.add(address);
			usertemp.setAddress(addresslist);
		}
		if(age != null) {
			usertemp.setAge(Integer.parseInt(age));
		}
		if(email!=null)
		usertemp.setEmail(email);
		if(gender!=null)
		usertemp.setGender(gender);
		if(name!=null)
		usertemp.setName(name);
		boolean res = new UserDaoImp().updateUserInfo(usertemp);
		int status = res?200:400;
		jsondata.put("status", status);
		return jsondata;
	}
	
	
	
	@RequestMapping(value = "/user/logout",method = RequestMethod.GET)
	public Object logout(HttpSession session) {
		if(new UserLoginAction().islogined(session))
		{
			session.setAttribute("user",null);
			return "../Mlogin/mlogin";
		}
		return "../Mlogin/mlogin";
	}
	
	@ResponseBody
	@RequestMapping(value = "/user/addmoney", method = RequestMethod.POST)
	public Object addMoney(String money,String password, HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		String user_id = (String) session.getAttribute("user");
		if(!new UserLoginAction().islogined(session))
		{
			jsondata.put("status", 404);
			jsondata.put("description", "�û�δ��½");
			return jsondata;
		}
		if(money==null)
		{
			jsondata.put("status", 404);
			jsondata.put("description", "δ�����ֵ��");
			return jsondata;
		}
		User user = new UserDaoImp().selectUserById(user_id);
		if(!user.getPassword().equals(password)) {
			jsondata.put("status", 400);
			jsondata.put("errdetail", "�����������");
		}
		user.setMoney(user.getMoney() + Float.parseFloat(money));
		boolean res= new UserDaoImp().updateUserInfo(user);
		if(res) {
			jsondata.put("status", 200);
			
		}else
		{
			jsondata.put("status", 400);
			jsondata.put("errdetail", "��ֵ����");
		}
		return jsondata;
	}
	
	
	
	
	
	
}
