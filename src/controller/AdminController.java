package controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import action.UserLoginAction;
import model.Good;
import model.Order;
import model.User;
import service.GoodDaoImp;
import service.OrderDaoImp;
import service.UserDaoImp;

@Controller
public class AdminController {
	
	/**
	 * 获取所有用户信息
	 * @return
	 */
	@RequestMapping("/admin/getalluser")
	@ResponseBody
	public Object getAllUser() {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		jsondata.put("status", 200);
		List<User> users = new UserDaoImp().selectAllUser();
		jsondata.put("userlist",users);
		return jsondata;
	}
	
	
	/**
	 * 更新商品信息
	 * @param good
	 * @return
	 */
	@RequestMapping("/admin/updategood")
	@ResponseBody
	public Object updateGood(Good good) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(good.getGood_id() == null||good.getProducer_id()==null)
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "传入参数为空");
			return jsondata;
		}
		boolean res = new GoodDaoImp().updateGood(good);
		if(res) {
			jsondata.put("status", 200);
		}
		else {
			jsondata.put("status", 400);
			jsondata.put("errdetail", "修改失败");
		}
		return jsondata;
	}
	
	
	
	/**获取所有订单信息
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/admin/orderlist",method= RequestMethod.GET)
	public Object getAllOrder() {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		jsondata.put("status", 200);
		List<Order> list = new OrderDaoImp().getAllOrder();
		jsondata.put("orderlist",list);
		return jsondata;
	}
	
	/**
	 * 删除指定订单
	 * 
	 * @param order_id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/admin/deleteorder")
	public Object deleteOrderById(String order_id) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(order_id == null)
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "未传入商品ID");
			return jsondata;
		}
		System.out.println(order_id);
		boolean res = new OrderDaoImp().deleteOrder(order_id);
		System.out.println(res);
		if(res) {
			jsondata.put("status", 200);
		}else
		{
			jsondata.put("status", 400);
			jsondata.put("errdetail", "删除失败或者未找到该订单");
		}
		return jsondata;
	}
	
	/**
	 * 删除商品    
	 * @param good_id
	 * @param producer_id
	 * @return
	 */
	
	@ResponseBody
	@RequestMapping(value = "/admin/deletegood")
	public Object deleteGood(String good_id,String producer_id) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(good_id == null||producer_id==null)
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "未传入商品参数");
			return jsondata;
		}
		boolean res = new GoodDaoImp().deleteGood(good_id, producer_id);
		System.out.println(res);
		if(res) {
			jsondata.put("status", 200);
		}else
		{
			jsondata.put("status", 400);
			jsondata.put("errdetail", "删除失败或者未找到该商品");
		}
		return jsondata;
	}
	/**
	 * 修改用户信息（主要冻结和解冻操作，已测试）
	 * @param cellphone
	 * @param blocked
	 * @param email
	 * @param gender
	 * @param address
	 * @param name
	 * @param age
	 * @param password
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/admin/updateuser",method = RequestMethod.POST)
	public Object updateUserInfo(String cellphone,String blocked,String email,String gender,String address,String name,String age,String password) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(cellphone == null) {
			jsondata.put("status", 404);
			jsondata.put("errdetail", "传入参数为空");
			return jsondata;
		}
		System.out.println(blocked);
		boolean state = false;
		User usertemp = new UserDaoImp().selectUserById(cellphone);
		if(blocked != null) {
			if(blocked.equals("已激活"))
				state = true;
			if(blocked.equals("已冻结"))
				state=false;
			usertemp.setBlocked(state);
		}
		
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
		User usert = new UserDaoImp().selectUserById(cellphone);
		jsondata.put("status", status);
		jsondata.put("state", usert.isBlocked());
		return jsondata;
	}
	/**
	 * 管理员添加商品（已测试）
	 * @param good
	 * @param price
	 * @param inventory
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/admin/addgood",method=RequestMethod.POST)
	public Object addGood(Good good,String price,String inventory) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(good.getGood_id()==null||good.getProducer_id()==null)
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "未传入参数");
			return jsondata;
		}
		
		float pricetemp = Float.parseFloat(price);
		int inventorytemp = Integer.parseInt(inventory);
		
		good.setInventory(inventorytemp);
		good.setPrice(pricetemp);
		boolean res = new GoodDaoImp().insertGood(good);
		if(res) {
			jsondata.put("status", 200);
		}else {
			jsondata.put("status", 400);
			jsondata.put("errdetail", "添加失败");
		}
		return jsondata;
	}
	
	
	/**
	 * 管理员通过商品ID进行查询（已测试）
	 * @param good_id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/admin/searchgood",method=RequestMethod.GET)
	public Object searchGoodById(String good_id) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		List<Good> goodlist = new GoodDaoImp().getGoodListByGoodId(good_id);
		if(good_id == null)
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "未传入参数");
			return jsondata;
		}
		
		if(goodlist.isEmpty()) {
			jsondata.put("status", 404);
			jsondata.put("errdetail", "未找到该商品");
		}else {
			for(Good g:goodlist) {
				g.setGood_id(good_id);
			}
			jsondata.put("status", 200);
			jsondata.put("goodlist", goodlist);
		}
		return jsondata;
	}
	
	
}
