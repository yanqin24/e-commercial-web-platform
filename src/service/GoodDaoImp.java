package service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import dao.GoodDao;
import model.Good;
import model.GoodProducerImg;
import model.UserGood;
import util.DBLoader;


public class GoodDaoImp implements GoodDao{

	/**
	 * @author 吴文军
	 * @param  无
	 * @return  返回所有商品信息
	 * {@code 已测试}
	 */
	@Override
	public List<Good> getAllGoods() {
		// TODO Auto-generated method stub
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> goodlist = session.selectList("conf.GoodMapper.selectGood");
		session.commit();
		session.close();
		return goodlist;
	}

	/**
	 * 
	 * 
	 * 
	 * {@code 已测试}
	 */
	@Override
	public List<Good> getGoodsByThirdClass(String third_class) {
		// TODO Auto-generated method stub
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> goodlist = session.selectList("conf.GoodMapper.selectGoodsByThirdClass", third_class);
		session.commit();
		session.close();
		return goodlist;
	}
	/**
	 * 
	 * 
	 * {@code 已测试}
	 */
	
	@Override
	public List<Good> getGoodsByFirstClass(String first_class) {
		// TODO Auto-generated method stub
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> goodlist = session.selectList("conf.GoodMapper.selectGoodsByFirstClass",first_class);
		session.commit();
		session.close();
		return goodlist;
	}
	
	/**
	 * 
	 * 
	 * {@code 已测试}
	 */

	@Override
	public List<Good> getGoodsBySecondClass(String second_class) {
		// TODO Auto-generated method stub
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> goodlist = session.selectList("conf.GoodMapper.selectGoodsBySecondClass", second_class);
		session.commit();
		session.close();
		return goodlist;
	}

	@Override
	public Good getGoodByProIdAndGoodId(UserGood producergood) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Good good = session.selectOne("conf.GoodMapper.selectGoodByProAndGood", producergood);
		session.commit();
		session.close();// TODO Auto-generated method stub
		return good;
	}

	@Override
	public List<Good> searchGoodForUser(String description) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		String description_str = "%"+description + "%";
		List<Good> goodlist = session.selectList("conf.GoodMapper.searchGoodForUser",description_str);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return goodlist;
	}

	@Override
	public List<Good> getAllGoodByProducerId(String producer_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> list = session.selectList("conf.GoodMapper.selectAllGoodByProducerId", producer_id);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return list;
	}

	@Override
	public Good getBasicGoodById(String good_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Good good = session.selectOne("conf.GoodMapper.selectGoodById", good_id);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return good;
	}

	@Override
	public float getGoodMaxPrice(String good_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		float max_price = 0.0f;
		List<String> goodidlist = session.selectList("conf.GoodMapper.selectAllGoodIdInProducer");
		for(String s:goodidlist) {
			if(s.equals(good_id))
				 max_price= session.selectOne("conf.GoodMapper.selectGoodMaxPrice", good_id);
		}
		
		session.close();
	
		// TODO Auto-generated method stub
		return max_price;
		
	}

	@Override
	public float getGoodMinPrice(String good_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		float min_price = 0.0f;
		List<String> goodidlist = session.selectList("conf.GoodMapper.selectAllGoodIdInProducer");
		for(String s:goodidlist) {
			if(s.equals(good_id))
				min_price = session.selectOne("conf.GoodMapper.selectGoodMinPrice", good_id);
		}
			
	
		session.close();
		// TODO Auto-generated method stub
		return min_price;
	}

	@Override
	public int getCollecterNumForGood(String good_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int num = session.selectOne("conf.GoodMapper.selectCollecterNumForGood", good_id);
		session.close();
		// TODO Auto-generated method stub
		return num;
	}

	@Override
	public boolean insertGood(Good good) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int bresult = session.insert("conf.GoodMapper.insertBasicInfoForGood", good);
		
		/*if(good.getImg_src().size()!=0)
		{
			int imgresult = session.insert("conf.GoodMapper.insertImgForGood", good);
		}*/
		int proresult = session.insert("conf.GoodMapper.insertProducerInfoForGood", good);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		if(bresult == 1&&proresult==1)
			return true;
		else
			return false;
	}

	@Override
	public int getSaleNumForGood(Good good) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int num = session.selectOne("conf.GoodMapper.selectSaleNumForGood",good);
		session.close();
		// TODO Auto-generated method stub
		return num;
	}
	//不能修改商品图片
	@Override
	public boolean updateGood(Good good) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int bresult =  session.update("conf.GoodMapper.updateBasicInfoForGoodById", good);
		int proresult = session.update("conf.GoodMapper.updateProducerInfoForGoodById", good);
		if(bresult == 1&&proresult==1)
			return true;
		// TODO Auto-generated method stub
		return false;
	}

	@Override
		public List<GoodProducerImg> getAllGoodProcuerImgByGoodId(String good_id) {
			// TODO Auto-generated method stub
			SqlSession session = DBLoader.getInstance().getSqlSession();
			List<GoodProducerImg> goodproducerimg = session.selectList("conf.GoodMapper.selectGoodProducerImgByGoodId",good_id);
			
			session.close();
			return goodproducerimg;
		}

	@Override
	public boolean deleteGood(String good_id, String producer_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String,Object> map = new HashMap<>();
		map.put("good_id", good_id);
		map.put("producer_id", producer_id);
		int res = session.delete("conf.GoodMapper.deleteGood", map);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return res==1?true:false;
	}

	@Override
	public List<Good> getGoodListByGoodId(String good_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> list = session.selectList("conf.GoodMapper.selectProducerAndGoodByGoodId", good_id);
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return list;
	}
}
	

