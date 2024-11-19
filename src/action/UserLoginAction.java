package action;

import javax.servlet.http.HttpSession;

import model.User;
import service.UserDaoImp;

public class UserLoginAction {
	private UserDaoImp userDaoImp;
	private User temp;
	public UserLoginAction() {
		userDaoImp = new UserDaoImp();
	}
	
	public int loginValidate(User user) {
		temp = userDaoImp.selectUserById(user.getCellphone());
		if(temp != null) {
			if(temp.isBlocked()==true) {
				return 403;
			}
			if(temp.getPassword().equals(user.getPassword())) {
				return 200;
			}
			return 400;
		}
		else return 404;
	}
	
	public int register(User user) {
			if(userDaoImp.selectUserById(user.getCellphone()) != null)
				return 400;
			else {
				userDaoImp.insertUser(user);
				return 200;
			}
	}
	
	
	public boolean islogined(HttpSession session) {
		if(session.getAttribute("user") != null)
			return true;
		return false;
	}
	
	
	
	
	
}
