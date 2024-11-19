package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.Good;
import model.Producer;
import service.ProducerDaoImp;

@Controller
public class ProducerController {
	
	/**
	 * 获取所有的门店信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/admin/producer",method = RequestMethod.GET)
	public Object getAllProducer() {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		List<Producer> producer_list = new ProducerDaoImp().getAllProducer();
		jsondata.put("status", 200);
		jsondata.put("producers", producer_list);
		return jsondata;	
	}
	@ResponseBody
	@RequestMapping(value = "/producer",method = RequestMethod.GET)
	public Object getProducer(String producer_id) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		Producer producer = new ProducerDaoImp().getProducerById(producer_id);
		if(producer_id == null) {
			jsondata.put("status", 404);
			jsondata.put("err_detail", "未传入商家id");
			return jsondata;
		}
		jsondata.put("status", 200);
		jsondata.put("producer", producer);
		return jsondata;	
	}
	@ResponseBody
	@RequestMapping(value = "/producer/goodlist")
	public Object getGoodsInProducer(String producer_id) {
		Map<String,Object> jsondata = new HashMap<String,Object>();
		if(producer_id== null)
		{
			jsondata.put("status", 404);
			jsondata.put("errdetail", "传入参数为空");
			return jsondata;
		}
		List<Good> good_list = new ProducerDaoImp().getAllGoodForProducer(producer_id);
		jsondata.put("goodlist",good_list);
		return jsondata;
	}
	
}
