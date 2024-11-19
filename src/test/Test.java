package test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import dao.SpecialClassDao;
import model.CartGoodItem;
import model.Good;
import model.Producer;
import model.User;
import service.CollectionDaoImp;
import service.GoodDaoImp;
import service.OrderDaoImp;
import service.ProducerDaoImp;
import service.ShoppingCartDaoImp;
import service.SpecialClassDaoImp;
import service.UserDaoImp;

public class Test {
	public static void main(String[] args) throws Exception{
//		SpecialClassDaoImp specialclassdao = new SpecialClassDaoImp();
//		List<Good> specialgood = specialclassdao.selectSpecialGoodByClass("hot_product");
//		specialclassdao.addSpecialClass("goodproduct");
//		specialclassdao.dropSpecialClass("newclass");
//		List<String> allspecialclass = specialclassdao.selectAllSpecialClass();
//		Good good = specialclassdao.selectSecialGoodById("000001");	
//		specialclassdao.addSpecialGoodByClass("hot_product","000005");
//		specialclassdao.dropSpecialGoodByClass("hot_product","000005");
//		specialclassdao.addSpecialGoodById("000011");
//		specialclassdao.deleteSpecialGoodById("000011");
//		specialclassdao.selectGoodClassById("000001");
//		specialclassdao.deletetAllNormalGood();
		/*CartGoodItem item = new CartGoodItem();
		Good good = new Good();
		good.setGood_id("000002");
		good.setProducer_id("100102");
		item.setGood(good);
		item.setUser_id("13978325636");
		System.out.println(new ShoppingCartDaoImp().deleteGoodFromShoppingCart(item));*/
		
	}
}
