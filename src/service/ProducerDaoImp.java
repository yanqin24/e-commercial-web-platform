package service;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.mysql.jdbc.Connection;

import dao.ProducerDao;
import model.Good;
import model.Producer;
import util.DBLoader;

public class ProducerDaoImp implements ProducerDao{

	@Override
	public List<Producer> getAllProducerByGoodId(String good_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Producer> producerlist = session.selectList("conf.ProducerMapper.selectAllProducerByGoodId", good_id);		
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return producerlist;
	}

	@Override
	public List<Producer> getAllProducerHasGoodById(String good_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Producer> producerlist = session.selectList("conf.ProducerMapper.selectAllProducerHasGoodById", good_id);	
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return producerlist;
	}

	@Override
	public List<Good> getAllGoodForProducer(String producer_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Good> goodlist = session.selectList("conf.ProducerMapper.selectAllGoodByProId", producer_id);
		// TODO Auto-generated method stub
		session.commit();
		session.close();
		return goodlist;
	}

	@Override
	public List<Producer> getAllProducer() {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		List<Producer> list = session.selectList("conf.ProducerMapper.selectAllProducer");
		session.commit();
		session.close();
		// TODO Auto-generated method stub
		return list;
	}

	@Override
	public Producer getProducerById(String producer_id) {
		SqlSession session = DBLoader.getInstance().getSqlSession();
		Producer one = session.selectOne("conf.ProducerMapper.selectProducerById",producer_id);
		session.commit();
		session.close();// TODO Auto-generated method stub
		return one;
	}
}
