package service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import dao.AdministratorDao;
import model.Administrator;
import util.DBLoader;

public class AdministratorDaoImp implements AdministratorDao {

	@Override
	public Administrator selectAdministratorById(String id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		
		Administrator administrator = session.selectOne("conf.AdministratorMapper.selectAdministratorById",id);
		
		session.close();
		return administrator;
	}

}
