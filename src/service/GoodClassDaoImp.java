package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import dao.GoodClassDao;
import util.DBLoader;

public class GoodClassDaoImp implements GoodClassDao {

	/**
	 * ��ȡ����һ����������
	 */
	@Override
	public List<String> getAllFstClass() {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<String> list = session.selectList("conf.GoodClassMapper.getAllFstClass");
		session.close();
		return list;
	}

	/**
	 * ��ȡ��һ�������µĵڶ����������������
	 */
	@Override
	public List<String> getSndByFstClass(String first_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<String> list = session.selectList("conf.GoodClassMapper.getSndByFstClass", first_class);
		session.close();
		return list;
	}

	/**
	 * ��ȡ�ڶ��������µĵ������������������
	 */
	@Override
	public List<String> getTrdBySndClass(String second_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<String> list = session.selectList("conf.GoodClassMapper.getTrdBySndClass", second_class);
		session.close();
		return list;
	}
	
	/**
	 * ����µ����
	 * @return 400: sql����     401�ظ����     200�ɹ�
	 */
	
	@Override
	public int insertClass(String first_class, String second_class, String third_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("first_class", first_class);
		map.put("second_class", second_class);
		map.put("third_class", third_class);
		if (!(session.selectList("conf.GoodClassMapper.getAllFstClass").contains(first_class)
				&& session.selectList("conf.GoodClassMapper.getSndByFstClass", first_class).contains(second_class))) {
			if (session.insert("conf.GoodClassMapper.insertFstAndSndClass", map) != 1) {
				session.close();
				return 400;
			}
			if (!session.selectList("conf.GoodClassMapper.getTrdBySndClass", second_class).contains(third_class)) {
				if (session.insert("conf.GoodClassMapper.insertSndAndTrdClass", map) != 1) {
					session.close();
					return 400;
				}
			}
		} else {
			if (session.selectList("conf.GoodClassMapper.getTrdBySndClass", second_class).contains(third_class)) {
				session.close();
				return 401;
			} else {
				if (session.insert("conf.GoodClassMapper.insertSndAndTrdClass", map) != 1) {
					session.close();
					return 400;
				}
			}
		}
		session.commit();
		session.close();
		return 200;
	}

	/**
	 * ɾ��һ������������
	 */
	@Override
	public boolean deleteTrdClass(String third_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		if (session.delete("conf.GoodClassMapper.deleteTrdClass", third_class) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}
	/**
	 * ɾ��һ���ڶ������ࣨ��Ӧ�ĵ��������౻ɾ����
	 */
	@Override
	public boolean deleteSndClass(String second_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		if (session.delete("conf.GoodClassMapper.deleteSndClass", second_class) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}
	
	/**
	 * ɾ��һ����һ�����ࣨ��Ӧ�ĵڶ��������౻ɾ����
	 * 
	 */
	@Override
	public boolean deleteFstClass(String first_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		if (session.delete("conf.GoodClassMapper.deleteFstClass", first_class) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}
	/**
	 * ɾ����������ϵ
	 */
	@Override
	public boolean deleteTrdWithSndClass(String third_class, String second_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("third_class", third_class);
		map.put("second_class", second_class);
		if (session.delete("conf.GoodClassMapper.deleteTrdWithSndClass", map) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}

	/**
	 * ɾ��һ������ϵ
	 */
	@Override
	public boolean deleteSndWithFstClass(String second_class, String first_class) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("second_class", second_class);
		map.put("first_class", first_class);
		if (session.delete("conf.GoodClassMapper.deleteSndWithFstClass", map) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}

	/**
	 * ���µ��������������
	 */
	@Override
	public boolean updateTrdClassName(String old_trdclass, String new_trdclass) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("old_trdclass", old_trdclass);
		map.put("new_trdclass", new_trdclass);
		if (session.delete("conf.GoodClassMapper.updateTrdClassName", map) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}
	/**
	 * ���µڶ������������
	 * 
	 */
	@Override
	public boolean updateSndClassName(String old_sndclass, String new_sndlass) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("old_sndclass", old_sndclass);
		map.put("new_sndlass", new_sndlass);
		if (session.delete("conf.GoodClassMapper.updateSndClassName", map) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}

	/**
	 * 
	 * ���µ�һ�����������
	 */
	@Override
	public boolean updateFstClassName(String old_fstclass, String new_fstclass) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("old_fstclass", old_fstclass);
		map.put("new_fstclass", new_fstclass);
		if (session.delete("conf.GoodClassMapper.updateFstClassName", map) > 0) {
			session.commit();
			session.close();
			return true;
		}
		session.close();
		return false;
	}

	@Override
	public List<String> getAllSndClass() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getAllTrdClass() {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<String> list = session.selectList("conf.GoodClassMapper.getAllTrdClass");
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return list;
	}
}
