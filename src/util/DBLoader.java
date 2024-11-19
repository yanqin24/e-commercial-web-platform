package util;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class DBLoader {
	private static DBLoader dbloader = null;
	private SqlSession sqlsession = null;
	private String xml_src = "conf/mybatis.cfg.xml";
	private SqlSessionFactory factory = null;
	
	/**
	 * @author ���ľ�
	 * @return ����һ��Ψһ�����ݿ������ʵ��
	 */
	
	public static DBLoader getInstance() {
		if(dbloader == null) {
			dbloader = new DBLoader();
			return dbloader;
		}
		return dbloader;
	}
	
	/**
	 * @author ���ľ�
	 * @see ���ݿ��������˽�й��캯��
	 */
	private DBLoader() {
		try {
			InputStream inputstream = Resources.getResourceAsStream(xml_src);
			factory = new SqlSessionFactoryBuilder().build(inputstream);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	
	
	/**
	 * @author ���ľ�
	 * @return ����һ��sqlsession���ݿ����Ӷ���
	 */
	public SqlSession getSqlSession() {
		sqlsession = factory.openSession();
		return sqlsession;
	}
	
}
