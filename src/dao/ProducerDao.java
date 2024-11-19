package dao;

import java.util.List;

import model.Good;
import model.Producer;


public interface ProducerDao {
	public List<Producer> getAllProducer();
	
	public List<Producer> getAllProducerByGoodId(String good_id);
	
	public List<Producer> getAllProducerHasGoodById(String good_id);
	
	public List<Good> getAllGoodForProducer(String producer_id);
	
	public Producer getProducerById(String producer_id);
}
