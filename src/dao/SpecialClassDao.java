package dao;

import java.util.List;
import java.util.Map;

import model.Good;

public interface SpecialClassDao {
	public List<Good> selectSpecialGoodByClass(String specialclass);
	
	public Good selectSecialGoodById(String id);
	
	public List<String> selectAllSpecialClass();
	
	public Map<String,Object> selectGoodClassById(String id);
	
	public void deletetAllNormalGood();
	
	public void addSpecialGoodByClass(String specialclass,String id);
	
	public void dropSpecialGoodByClass(String specialclass,String id);
	
	public void addSpecialGoodById(String id);
	
	public void deleteSpecialGoodById(String id);
	
	public void addSpecialClass(String specialclass);
	
	public void dropSpecialClass(String specialclass);
}
