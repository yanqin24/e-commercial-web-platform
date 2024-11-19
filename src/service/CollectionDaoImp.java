package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import dao.CollectionDao;
import model.Collection;
import model.Good;
import util.DBLoader;

/**
 * @author JsonBorn
 *
 */
public class CollectionDaoImp implements CollectionDao {
	private Collection collection = new Collection();
	/**
	 * @param:用户id
	 * @return:指定用户的收藏夹对象
	 */
	@Override
	public List<Good> getCollectionList(String user_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> temp = new ArrayList<>();
		List<Good> good_list = session.selectList("conf.CollectionMapper.getCollectionByUserId", user_id);
		for(Good item:good_list) {
			Good goodtemp = session.selectOne("conf.GoodMapper.selectGoodByProAndGood", item);
			temp.add(goodtemp);
		}
		
		session.close();
		return temp;
	}
	/**
	 * @param:用户id，收藏的物品id，供货商id
	 * @return:若输入的物品id与供货商id有误，返回false
	 */
	@Override
	public int insertIntoCollection(String user_id, String good_id, String producer_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", user_id);
		map.put("good_id", good_id);
		map.put("producer_id", producer_id);
		System.out.println(map);
		if(session.selectOne("conf.GoodMapper.selectGoodByProAndGood", map) == null)
			return 404;
		if(getGoodInCollection(user_id, good_id, producer_id) != null)
			return 403; //�ղؼ������и���Ʒ
		session.insert("conf.CollectionMapper.insertIntoCollection", map);
		session.commit();
		session.close();
		return 200;
	}
	/**
	 * @param:用户id，收藏的物品id，供货商id
	 * @return:若输入的物品id与供货商id有误，返回false
	 */
	@Override
	public boolean deleteCollection(String user_id, String good_id, String producer_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", user_id);
		map.put("good_id", good_id);
		map.put("producer_id", producer_id);
		System.out.println(map);
		if(session.selectOne("conf.GoodMapper.getGoodForFullInfo", map) == null)
			return false;
		session.insert("conf.CollectionMapper.deleteCollection", map);
		session.commit();
		session.close();
		return true;
	}
	@Override
	public Good getGoodInCollection(String user_id, String good_id, String producer_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", user_id);
		map.put("good_id", good_id);
		map.put("producer_id", producer_id);
		Good good = session.selectOne("conf.CollectionMapper.selectGoodInCollection",map);
		// TODO Auto-generated method stub
		return good;
	}

}
