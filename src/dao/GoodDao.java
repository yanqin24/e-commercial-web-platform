package dao;

import java.util.List;

import model.Good;
import model.GoodProducerImg;
import model.UserGood;

public interface GoodDao {
	//锟斤拷取锟斤拷品锟斤拷锟斤拷锟桔革拷
	public float getGoodMaxPrice(String good_id);
	
	//锟斤拷取锟斤拷品锟斤拷锟斤拷小锟桔革拷
	public float getGoodMinPrice(String good_id);
	
	//锟斤拷取锟斤拷锟斤拷锟斤拷品
	public List<Good> getAllGoods();
	
	//锟斤拷锟斤拷锟斤拷品ID锟斤拷取锟斤拷品锟斤拷息
	public Good getBasicGoodById(String good_id);
	
	//锟斤拷锟捷碉拷锟斤拷锟斤拷锟斤拷锟斤拷锟饺★拷锟狡凤拷斜锟�
	public List<Good> getGoodsByThirdClass(String third_class);
	
	//锟斤拷锟捷碉拷一锟斤拷锟斤拷锟斤拷锟饺★拷锟狡凤拷斜锟�
	public List<Good> getGoodsByFirstClass(String first_class);
	
	//锟斤拷锟捷第讹拷锟斤拷锟斤拷锟斤拷锟饺★拷锟狡凤拷斜锟�
	public List<Good> getGoodsBySecondClass(String second_class);
	
	 //锟斤拷锟斤拷锟教硷拷ID锟斤拷锟斤拷品ID锟斤拷取锟斤拷细锟斤拷品锟斤拷息锟斤拷锟斤拷锟桔革拷
	public Good getGoodByProIdAndGoodId(UserGood producergood);
	
	//锟斤拷取锟斤拷锟斤拷锟矫伙拷锟斤拷锟斤拷锟斤拷锟斤拷模锟斤拷锟斤拷询锟斤拷品锟叫憋拷
	public List<Good> searchGoodForUser(String description);
	 
	//锟斤拷取某锟斤拷锟教硷拷锟铰碉拷锟斤拷锟斤拷锟斤拷品
	public List<Good> getAllGoodByProducerId(String producer_id);
	
	//锟斤拷取某锟斤拷锟斤拷品锟斤拷锟秸诧拷锟斤拷锟斤拷
	public int getCollecterNumForGood(String good_id);
	
	//锟斤拷锟斤拷碌锟斤拷锟狡�
	public boolean insertGood(Good good);
	
	//锟斤拷取某锟斤拷锟教家碉拷锟斤拷品锟斤拷锟斤拷锟斤拷锟斤拷
	public int getSaleNumForGood(Good good);
	
	//锟睫革拷锟斤拷品
	public boolean updateGood(Good good);

	public List<GoodProducerImg> getAllGoodProcuerImgByGoodId(String good_id);
	
	public boolean deleteGood(String good_id,String producer_id);
	
	public List<Good> getGoodListByGoodId(String good_id);
  }
