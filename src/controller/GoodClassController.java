package controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import service.GoodClassDaoImp;

@Controller
public class GoodClassController {
	@ResponseBody
	@RequestMapping(value = "/admin/goodclass",method = RequestMethod.GET)
	public Object getAllClass() {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		List<Map<String,Object>> itemlist = new ArrayList<Map<String,Object>>();
		List<List<List<String>>> class_list = new ArrayList<List<List<String>>>();
		List<String> class1_list = new GoodClassDaoImp().getAllFstClass();
		for(String s:class1_list)
		{
			Map<String,Object> temp = new HashMap<String,Object>();
			List<Map<String,Object>> second_temp = new ArrayList<Map<String,Object>>();
			temp.put("firstclass_name", s);
			List<String> class2_list = new GoodClassDaoImp().getSndByFstClass(s);
			for(String s2:class2_list) {
				Map<String,Object> temp2 = new HashMap<String,Object>();
				temp2.put("name", s2);
				temp2.put("third_class", new GoodClassDaoImp().getTrdBySndClass(s2));
				second_temp.add(temp2);
			}
			temp.put("second_class", second_temp);
			itemlist.add(temp);
		}
		jsondata.put("class_list", itemlist);
		jsondata.put("status", 200);
		return jsondata;
	}
	
	@ResponseBody
	@RequestMapping(value = "/admin/getthirdclass")
	public Object getThirdClass() {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		List<String> third_classlist = new GoodClassDaoImp().getAllTrdClass();
		jsondata.put("status", 200);
		jsondata.put("third_classlist", third_classlist);
		return jsondata;
	}
	
	
}
