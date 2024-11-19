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
	 * @author 吴文军
	 * @return 返回一个唯一的数据库加载器实例
	 */
	
	public static DBLoader getInstance() {
		if(dbloader == null) {
			dbloader = new DBLoader();
			return dbloader;
		}
		return dbloader;
	}
	
	/**
	 * @author 吴文军
	 * @see 数据库加载器的私有构造函数
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
	 * @author 吴文军
	 * @return 返回一个sqlsession数据库连接对象
	 */
	public SqlSession getSqlSession() {
		sqlsession = factory.openSession();
		return sqlsession;
	}
	
}
