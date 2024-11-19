package dao;

import java.util.List;

import model.Collection;
import model.Good;

public interface CollectionDao {
	
	public List<Good> getCollectionList(String user_id);
	
	public int insertIntoCollection(String user_id, String good_id, String producer_id);
	
	public boolean deleteCollection(String user_id, String good_id, String producer_id);
	
	public Good getGoodInCollection(String user_id, String good_id, String producer_id);
}
