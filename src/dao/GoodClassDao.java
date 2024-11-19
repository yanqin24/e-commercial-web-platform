package dao;

import java.util.List;

public interface GoodClassDao {
	public List<String> getAllFstClass();
	
	public List<String> getAllSndClass();
	
	public List<String> getAllTrdClass();

	public List<String> getSndByFstClass(String first_class);

	public List<String> getTrdBySndClass(String second_class);

	public int insertClass(String first_class, String second_class, String third_class);

	public boolean deleteTrdClass(String third_class);

	public boolean deleteSndClass(String second_class);

	public boolean deleteFstClass(String first_class);
	
	public boolean deleteTrdWithSndClass(String third_class, String second_class);

    public boolean deleteSndWithFstClass(String second_class, String first_class);

	public boolean updateTrdClassName(String old_trdclass, String new_trdclass);

	public boolean updateSndClassName(String old_sndclass, String new_sndlass);

	public boolean updateFstClassName(String old_fstclass, String new_fstclass);
}
