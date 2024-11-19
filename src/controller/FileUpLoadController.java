package controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import dao.UserDao;
import model.User;
import service.UserDaoImp;

@Controller  
public class FileUpLoadController {
	/**
	 * 已测试
	 * 用户头像上传到服务器userimg目录下
	 * @param file
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/user/upload")
	public int upLoadImg(@RequestParam("file") MultipartFile file,HttpServletRequest req) {
		String filename = file.getOriginalFilename();
		try {
			File outfile = new File(req.getServletContext().getRealPath("/userimg"),filename);
			OutputStream os = new FileOutputStream(outfile);
			BufferedOutputStream bufout = new BufferedOutputStream(os);
			try {
					InputStream is = file.getInputStream();
					BufferedInputStream bufin = new BufferedInputStream(is);
					int k;
					while((k = bufin.read())!=-1)
						{
							bufout.write(k);
						}
					bufout.flush();
					bufin.close();
					bufout.close();
					System.out.println(outfile.getPath());
					UserDaoImp userdao = new UserDaoImp();
					User user = userdao.selectUserById((String)req.getSession().getAttribute("user"));
					if(user == null)
						return 404;
					System.out.println((String)req.getSession().getAttribute("user"));
					user.setUser_img("http://localhost:8080/DanielWu/userimg/"+ file.getOriginalFilename());
					userdao.updateUserInfo(user);
					return 200;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 400;
	}
	
}
