function login() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
 
    var user = {
		"cellphone":username.value,
		"password":password.value
	}
   $.ajax({
	   type :"post",
    	url:"http://localhost:8080/DanielWu/user/login/signup",
    	datatype: "json",
    	data:user,
    	async :true,
    	success:function(msg){
            var tt = JSON.parse(msg);
            if(tt.status==200){
            	alert("登陆成功！");
            	window.location.href = "http://localhost:8080/DanielWu/MainPage/Mainpage.html";
            }
            if(tt.status==400)
            	alert("密码错误！");
            if(tt.status==404)
            	alert("账号不存在！");
            if(tt.status==403)
            	alert("账号已冻结,请联系管理员");
        }
    })
    
    
}
function register() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
   
    var user = {
		"cellphone":username.value,
		"password":password.value
	}
    console.log(user);
    $.ajax({
    	url:'http://localhost:8080/DanielWu/user/login/signin'	,
    	type:"post",
    	datatype:"json",
    	data:user,
    	async :true,
    	success:function(tt){
    		tt= JSON.parse(tt);
            if(tt.status==200)
            	{
		        	alert("注册成功！");
		        	window.location.href = "http://localhost:8080/DanielWu/Mlogin/mlogin.html";
            	}
            	
            if(tt.status==400)
            	alert("账号已存在！");
            
            
    	}
    }
    )
    
}


