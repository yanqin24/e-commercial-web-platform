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

import com.sun.org.apache.regexp.internal.recompile;

import model.Good;
import model.GoodProducerImg;
import model.UserGood;
import service.GoodDaoImp;

@Controller
public class GoodController {
	
	/**
	 * 已测试
	 * 根据所传递的类别参数来返回对应的商品列表
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/goods/goodlist", method = RequestMethod.GET)
	/*修改前为List<Good>*/
	public Object getGoodList(){	
		Map<String,Object> jsondata = new HashMap<String,Object>();
		GoodDaoImp goodDaoImp = new GoodDaoImp();
		List<Good> allgoodid = goodDaoImp.getAllGoods();
		List<List<GoodProducerImg>> allgoodinfo = new ArrayList<List<GoodProducerImg>>();
		for(Good good:allgoodid){
			allgoodinfo.add(goodDaoImp.getAllGoodProcuerImgByGoodId(good.getGood_id()));
		}
//		return goodDaoImp.getAllGoods();
		return allgoodinfo;
	}
	@ResponseBody
	@RequestMapping(value = "/goods/goodlist2",method = RequestMethod.GET)
	public Object getFirstClassGoodList(String first_class,String second_class,String third_class){	
		Map<String,Object> jsondata = new HashMap<String,Object>();
		List<Good> list  = new ArrayList<Good>();
		Map<String,Object> gooditem = new HashMap<String,Object>();
		List<Map> itemlist = new ArrayList<>();
		GoodDaoImp goodDaoImp = new GoodDaoImp();	
		if(first_class!=null)
			jsondata.put("good_list", goodDaoImp.getGoodsByFirstClass(first_class));
		else if(second_class!=null)
			jsondata.put("good_list", goodDaoImp.getGoodsBySecondClass(second_class));
		else if(third_class!=null)
			jsondata.put("good_list",goodDaoImp.getGoodsByThirdClass(third_class));
		else
			jsondata.put("good_list",goodDaoImp.getAllGoods());
		if(jsondata.get("good_list") != null)
		list = (List<Good>)jsondata.get("good_list");
		for(Good item:list) {
			gooditem = new HashMap<String,Object>();
		
			gooditem.put("gooditem", item);
			if(item!=null) {
				
			gooditem.put("max_price", goodDaoImp.getGoodMaxPrice(item.getGood_id()));
			gooditem.put("min_price", goodDaoImp.getGoodMinPrice(item.getGood_id()));
			itemlist.add(gooditem);
			System.out.println(itemlist.size());
			}
		}
		
		jsondata.put("goodlist",itemlist);
		jsondata.remove("good_list");
			return jsondata;
	}
	/**
	 * 通过商品名字模糊查询
	 * @param description
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/goods/searchgood",method = RequestMethod.GET)
	public Object searchGood(String description) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		GoodDaoImp goodDaoImp = new GoodDaoImp();
		List<Good> list  = new ArrayList<Good>();
		List<Map> itemlist = new ArrayList<>();
		
		Map<String,Object> gooditem = new HashMap<String,Object>();
		List<Good> good_list = null;
		if(description != null) {
			good_list= new GoodDaoImp().searchGoodForUser(description);
		}
		else {
			jsondata.put("status", 404);
			jsondata.put("err_detail", "未传入描述参数");
			return jsondata;
		}
		jsondata.put("status", 200);
		jsondata.put("good_list", good_list);	
		if(jsondata.get("good_list") != null)
			list = (List<Good>)jsondata.get("good_list");
			for(Good item:list) {
				gooditem = new HashMap<String,Object>();
			
				gooditem.put("gooditem", item);
				if(item!=null) {
					
				gooditem.put("max_price", goodDaoImp.getGoodMaxPrice(item.getGood_id()));
				gooditem.put("min_price", goodDaoImp.getGoodMinPrice(item.getGood_id()));
				itemlist.add(gooditem);
				System.out.println(itemlist.size());
			}
			}
		jsondata.put("good_list", itemlist);
		return jsondata;
	}
	
	@ResponseBody
	@RequestMapping(value = "/goods/gooddetail",method = RequestMethod.GET)
	public Object getGoodDetailInfo(String producer_id,String good_id,HttpSession session) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		UserGood usergood = new UserGood((String)session.getAttribute("user"), good_id, producer_id);
		Good good = new GoodDaoImp().getGoodByProIdAndGoodId(usergood);
		if(good==null) {
			jsondata.put("status", 404);
		}else {
			jsondata.put("status", 200);
			jsondata.put("good",good);
		}
		return jsondata;
	}
	
	
}
