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

import dao.UserDao;
import model.User;
import util.DBLoader;

public class UserDaoImp implements UserDao {

	@Override
	public List<User> selectAllUser(){
		SqlSession session = DBLoader.getInstance().getSqlSession();	
		List<User> alluser = session.selectList("conf.UserMapper.selectUser");
		System.out.println(alluser.get(0).getName());
		session.close();
		return alluser;
	}
	
	@Override
	public User selectUserById(String id){
		SqlSession session = DBLoader.getInstance().getSqlSession();	
		User user = session.selectOne("conf.UserMapper.selectUserById",id);
		session.close();
		return user;
	}
	
	@Override
	public boolean insertUser(User user){
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int res = session.insert("conf.UserMapper.insertUser",user);
		session.commit();	
		session.close();	
		return res==1?true:false;
	}
	
	@Override
	public boolean deleteUserById(String id){
		SqlSession session = DBLoader.getInstance().getSqlSession();			
		int res = session.delete("conf.UserMapper.deleteUserById",id);
		session.commit();
		session.close();
		return res==1?true:false;
	}
	
	@Override
	public boolean updateUserInfo(User user){
		SqlSession session = DBLoader.getInstance().getSqlSession();
		int res = session.update("conf.UserMapper.updateUserInfo",user);
		if(user.getAddress().size()!=0) {
			Map<String, Object> map = new HashMap<>();
			User usertemp = selectUserById(user.getCellphone());
			map.put("user_id", user.getCellphone());
			map.put("new_address", user.getAddress().get(0));
			int addres=0;
			if(usertemp.getAddress().size()!=0)
			{
				map.put("old_address", usertemp.getAddress().get(0));
				addres = session.update("conf.UserMapper.updateAddress", map);
			}else {
				map.put("user_address",user.getAddress().get(0) );
				addres = session.update("conf.UserMapper.insertAddress", map);
			}
			
			session.commit();
			session.close();
			return res==1&&addres==1?true:false;
		}
		session.commit();
		session.close();
		return res==1?true:false;
		
	}
	
	@Override
	public boolean insertAddress(String user_id, String address_src) {
		int status = 0;
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", user_id);
		map.put("user_address", address_src);
		status = session.insert("conf.UserMapper.insertAddress", map);
		session.commit();
		session.close();
		if (status != 1)
			return false;
		return true;
	}

	@Override
	public boolean updateAddress(String user_id, String old_address, String new_address) {
		int status = 0;
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", user_id);
		map.put("old_address", old_address);
		map.put("new_address", new_address);
		status = session.update("conf.UserMapper.updateAddress", map);
		session.commit();
		session.close();
		if (status != 1)
			return false;
		return true;
	}

	@Override
	public boolean deleteAddress(String user_id, String address_src) {
		int status = 0;
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", user_id);
		map.put("user_address", address_src);
		status = session.delete("conf.UserMapper.deleteAddress", map);
		session.commit();
		session.close();
		if (status != 1)
			return false;
		return true;
	}

}
