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

import dao.SpecialClassDao;
import model.Good;
import util.DBLoader;

public class SpecialClassDaoImp implements SpecialClassDao {
	private String resource = "conf/mybatis.cfg.xml";
	InputStream inputstream;
	SqlSessionFactory factory;
	
//	public SpecialClassDaoImp(){
//		try{
//			inputstream = Resources.getResourceAsStream(resource);
//			factory = new SqlSessionFactoryBuilder().build(inputstream);
//		}
//		catch(IOException ex){
//			ex.printStackTrace();
//		}
//	}
	/**
	 * 鏌ヨ鏌愪釜鐗规畩鍒嗙被涓嬬殑鍟嗗搧
	 * @return List<Good>
	 */
	@Override
	public List<Good> selectSpecialGoodByClass(String specialclass){
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		List<Good> specialgood = session.selectList("selectSpecialGoodByClass",specialclass);
		
		session.close();
		return specialgood;
	}
	
	/**
	 * 鏌ヨ鐗规畩鍒嗙被琛ㄤ腑鐨勫晢鍝侊紝鏃犲疄闄呮剰涔夛紝浠呰addSpecialGoodByClass()璋冪敤锛岀敤浜庡垽鏂晢鍝佹槸鍚﹀瓨鍦ㄨ〃涓�
	 * @return Good
	 */
	@Override
	public Good selectSecialGoodById(String id){
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		Good specialgood = session.selectOne("selectSecialGoodById",id);
		
		session.close();
		return specialgood;
	}
	
	/**
	 * 鏌ヨ鎵�鏈夌壒娈婂垎绫诲悕
	 * @return List<String>
	 */
	@Override
	public List<String> selectAllSpecialClass(){
		try{
			inputstream = Resources.getResourceAsStream(resource);
			factory = new SqlSessionFactoryBuilder().build(inputstream,"db_info");
		}
		catch(IOException ex){
			ex.printStackTrace();
		}
		SqlSession session = factory.openSession();
		
		List<String> allspecialclass = session.selectList("selectAllSpecialClass");
		System.out.println(allspecialclass.size());
		for(String item:allspecialclass){
			System.out.println(item);
		}
		
		session.close();
		return allspecialclass;
	}
	
	/**
	 * 鏌ヨ鏌愪釜鍟嗗搧鎵�灞炵殑鎵�鏈夌壒娈婂垎绫伙紝鏃犲疄闄呮剰涔夛紝浠呰dropSpecialGoodByClass()璋冪敤锛屽垽鏂晢鍝佹槸鍚﹀睘浜庣壒娈婂垎绫�
	 * @map<String,Object>
	 */
	@Override
	public Map<String, Object> selectGoodClassById(String id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		Map<String,Object> map = session.selectOne("selectGoodClassById",id);	
		
		session.close();
		return map;
	}

	/**
	 * 鍒犻櫎specia_class琛ㄤ腑鎵�鏈変笉灞炰簬
	 */
	@Override
	public void deletetAllNormalGood() {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		List<Map<String,Object>> maplist = session.selectList("selectAllGoodClass");
		
		for(Map<String,Object> map:maplist){
			boolean belong = false;
			String id = null;
			for(Map.Entry<String, Object> entry:map.entrySet()){
//				System.out.println(entry.getKey()+"|"+String.valueOf(entry.getValue()));
				if("good_id".equals(entry.getKey())){
					id = String.valueOf(entry.getValue());
				}
				else if("true".equals(String.valueOf(entry.getValue()))){
					belong = true;
					break;
				}
			}
			if(!belong){
				deleteSpecialGoodById(id);
//				System.out.println("鍟嗗搧"+id+"锛屽凡涓嶅湪浠讳綍鐗规畩鍒嗙被");
			}
		}
		session.commit();
		session.close();
	}

	/**
	 * 灏嗘寚瀹氬晢鍝佸姞鍏ユ寚瀹氱壒娈婂垎绫伙紝鍏堣皟鐢╯electSecialGoodById()鍒ゆ柇鍟嗗搧鏄惁鍦╯pecial_class琛ㄤ腑
	 * 鑻ヤ笉鍦紝鍒欒皟鐢╝ddSpecialGoodById()鍚戣〃涓姞鍏ユ寚瀹氬晢鍝侊紝
	 * 鎺ョ潃鐢╱pdate璇彞灏嗚〃涓寚瀹氬晢鍝佺殑鐗规畩鍒嗙被灞炴�у�肩疆涓�1
	 * 
	 * 娌℃湁瀵规寚瀹氱殑鐗规畩鍒嗙被鏄惁瀛樺湪杩涜鍒ゆ柇
	 */
	@Override
	public void addSpecialGoodByClass(String specialclass,String id) {	
		Good good = selectSecialGoodById(id);
		if(good == null)
			addSpecialGoodById(id);
		
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("specialclass", specialclass);
		map.put("id", id);
		
		session.update("addSpecialGoodByClass",map);
		session.commit();
		
		session.close();
	}
	
	/**
	 * 灏唖pecial_class琛ㄤ腑鎸囧畾鍟嗗搧鐨勬寚瀹氱壒娈婂垎绫诲�肩疆涓�0锛屽嵆浠庤鐗规畩鍒嗙被涓垹闄よ鍟嗗搧
	 * 鑻ユ鎿嶄綔鍚庯紝鍟嗗搧涓嶅啀灞炰簬浠讳綍鐗规畩鍒嗙被锛屽垯浠巗pecial_class琛ㄤ腑鍒犻櫎璇ュ晢鍝�
	 * 
	 * 娌℃湁瀵规寚瀹氱殑鐗规畩鍒嗙被鏄惁瀛樺湪杩涜鍒ゆ柇
	 */
	@Override
	public void dropSpecialGoodByClass(String specialclass, String id) {
		Good good = selectSecialGoodById(id);
		if(good == null)
			System.out.println("鎸囧畾鍟嗗搧涓嶅瓨鍦�");
		
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		Map<String,Object> inputmap = new HashMap<String,Object>();
		inputmap.put("specialclass", specialclass);
		inputmap.put("id", id);
		
		session.update("dropSpecialGoodByClass",inputmap);
		session.commit();
		
		session.close();
		
		Map<String,Object> checkmap = selectGoodClassById(id);
		for(Map.Entry<String, Object> entry: checkmap.entrySet()){
			if("good_id" != entry.getKey() && String.valueOf(entry.getValue()) == "true"){
//				System.out.println("璇ュ晢鍝佷粛灞炰簬鐗规畩鍒嗙被");
				return;
			}
		}
//		System.out.println("璇ュ晢鍝佸凡涓嶅睘浜庣壒娈婂垎绫�");
		deleteSpecialGoodById(id);
	}

	/**
	 * 鍚憇pecial_class琛ㄤ腑娣诲姞涓�涓笉灞炰簬浠讳綍鐗规畩鍒嗙被鐨勫晢鍝侊紝浠呰addSpecialGoodByClass()璋冪敤
	 */
	@Override
	public void addSpecialGoodById(String id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		session.insert("addSpecialGoodById",id);
		session.commit();
		
		session.close();
	}

	/**
	 * 鍒犻櫎special_class琛ㄤ腑鎸囧畾鍟嗗搧锛屼粎琚玠ropSpecialGoodByClass()璋冪敤
	 */
	@Override
	public void deleteSpecialGoodById(String id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		session.insert("deleteSpecialGoodById",id);
		session.commit();
		
		session.close();		
	}

	/**
	 * 鍚憇pecial_class涓坊鍔犱竴涓壒娈婂垎绫�
	 * 娌℃湁瀵硅〃涓槸鍚﹀凡瀛樺湪璇ョ壒娈婂垎绫昏繘琛屽垽鏂紝閲嶅鍒欎細鎶ラ敊
	 */
	@Override
	public void addSpecialClass(String specialclass){
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		session.update("addSpecialClass",specialclass);
		session.commit();
		session.close();
	}
	
	/**
	 * 鍒犻櫎special_class鐨勪竴涓壒娈婂垎绫诲睘鎬�
	 * 娌℃湁鍒ゆ柇琛ㄤ腑鏄惁瀛樺湪璇ョ壒娈婂垎绫�
	 */
	@Override
	public void dropSpecialClass(String specialclass){
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		session.update("dropSpecialClass",specialclass);
		session.commit();
		
		session.close();
		deletetAllNormalGood();
	}
}
