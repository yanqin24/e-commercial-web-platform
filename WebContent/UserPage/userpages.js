var user_id;
$(document).ready(function(){
	$.ajaxSettings.async = false;
    $.getJSON("http://localhost:8080/DanielWu/user/getuserinfo",function(data){
            console.log(5);
            obj = data.user;
            user_id = obj.cellphone;
        },
        "json");
    $("#age").val(obj.age);
    $("#email").val(obj.email);
    $("#username").val(obj.name);
    $("#address").val(obj.address);
    $("#gender").val(obj.gender);
    $("#user_img").attr("src",obj.user_img);
    
})


function submitmsg() {
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    /*var cellphone = document.getElementById("cellphone").value;*/
    var adress = document.getElementById("address").value;
    /*var account = document.getElementById("account").value;
    var account = document.getElementById("money").value;*/
    var gender = document.getElementsByName("gender");
    var name = document.getElementById("username").value;
    var rdVal;
    
    for(var i=0; i<gender.length;i++){
        if(gender.item(i).checked){
            rdVal = i;
            break;
        }else{
            continue;
        }
    }
    
    var list = [];
    var user = {};
    
    user.age = age; 
    if(gender[rdVal].value==3)
    	user.gender = "保密";
    if(gender[rdVal].value==2)
    	user.gender = "女";
    if(gender[rdVal].value==1)
    	user.gender = "男";
    user.name = name;

    user.email = email;
    user.cellphone = user_id;
    user.address = adress;


    var j =JSON.stringify(user);

    var username = 6;


    var obj = eval("("+j+")");

    console.log(obj);
  
    
    $.post('http://localhost:8080/DanielWu/user',user,function(tt){
    	tt = JSON.parse(tt);
    	if(tt.status==200)
    		{
    			alert("修改成功！");
    			window.location.href="user.html";
    		}
        
    });
    
}
 


var imgfile;
function submitimg(){
    var formData = new FormData();
    console.log(imgfile);
    formData.append("file", imgfile);
    $.ajax({
        url: 'http://localhost:8080/DanielWu/user/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (msg) {
            if(msg==200)
        	alert("上传成功");
        }
    });
}

function preview(file) {
    var prevDiv = document.getElementById('userimg');
    imgfile=file.files[0];
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            console.log(evt.target);
           // $(".imageFileInput").css("background-image","url(evt.target.result)");
            prevDiv.innerHTML = ' <input class="fileInput" type="file" onchange="preview(this)">'
                +'<img style="width: 100px; height: 100px;border-radius:50px" src="' + evt.target.result + '" />';
           // $(prevDiv).append("<img src="' + evt.target.result + '" />");
        }
        reader.readAsDataURL(file.files[0]);
    } else {
    }


}


function deposit(){
	var money = $("#amount").val();
	var password = $("#userpassword").val();
	var password2 = $("#userpassword2").val()
	if(password != password2){
		alert("两次输入不一致！");
		return;
	}
	$.post("http://localhost:8080/DanielWu/user/addmoney?money="+ money +"&password=" + password,function(msg){
		msg = JSON.parse(msg);
		if(msg.status==200)
		{
			alert("充值成功");
			window.location.href="http://localhost:8080/DanielWu/UserPage/user.html";
		}if(msg.status==400)
		{
			alert("充值失败");
		}
		
		
	})
	
}