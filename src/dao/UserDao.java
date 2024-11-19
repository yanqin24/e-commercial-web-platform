package dao;

import java.util.List;

import model.User;

public interface UserDao {
	public List<User> selectAllUser();

	public User selectUserById(String id);

	public boolean insertUser(User user);

	public boolean deleteUserById(String id);

	public boolean updateUserInfo(User user);

	public boolean insertAddress(String user_id, String address_src);

	public boolean updateAddress(String user_id, String old_address, String new_address);

	public boolean deleteAddress(String user_id, String address_src);
}
