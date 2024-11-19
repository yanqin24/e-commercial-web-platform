$(document).ready(function(){
    $.getJSON("http://localhost:8080/DanielWu/admin/getalluser",function(data){
        $('#display').html(each(data))
    },
    "json");
})

function each(data){
    var html = ''; 
    var obj = data.userlist;

    html += '<tr><th>会员头像</th><th>会员名</th><th>手机号码</th><th>电子邮件</th>';
    html += '<th>会员年龄</th><th>会员性别</th><th>会员账户</th><th>注册地址</th><th>状态</th><th>操作</th></tr>';

    for (var i = 0;i < obj.length;i++){
    	if(!obj[i].blocked)
    		obj[i].blocked = "已激活";
    	else
    		obj[i].blocked = "已冻结";
        html += '<tr><td class="center"><img style="border-radius:50px" src="'+obj[i].user_img+'" width="50" height="50"/></td>';
        html += '<td class="center">'+obj[i].name+'</td>';
        html += '<td> ' +obj[i].cellphone +'</td><td class="center">'+obj[i].email+'</td><td class="center">'+obj[i].age+'</td>';
        html += '<td class="center">'+obj[i].gender+'</td><td class="center">'+'<strong class="rmb_icon">'+obj[i].money+'</td><td class="center">';
        html += "LifeFresh"+'</strong></td><td class="center">'+obj[i].blocked+'';
        html += '</td><td class="center"><a href="user_revision.html?user_img='+obj[i].user_img+'&name='+obj[i].name+'&cellphone='+obj[i].cellphone+'&email='+obj[i].email+'&age='+obj[i].age+'&gender='+obj[i].gender+'&money='+obj[i].money+'&address='+obj[i].address+'" title="编辑" class="link_icon">&#101;</a>';
        html += '<button  title="删除" style="border:none" class="link_icon" id="'+obj[i].cellphone+'_' +obj[i].blocked+'" onclick="blockuser(id)" >&#100;</button></td></tr>';
    }
    return html;
}

function search() {
    $.getJSON("/user/getuserinfo",function(data){
        $('#display').html(searchmsg(data))
    },

    "json");
  }

function searchmsg(data) {
    var index_msg = document.getElementById("search_user").value;
    var obj = data.user;
    var html = "";

    html += '<tr><th>会员头像</th><th>会员名</th><th>手机号码</th><th>电子邮件</th>';
    html += '<th>会员年龄</th><th>会员性别</th><th>会员账户</th><th>注册地址</th><th>操作</th></tr>';

    for (var i = 0;i < obj.length;i++){
        if(obj[i].cellphone == index_msg || obj[i].name == index_msg){
            html += '<tr><td class="center"><img src="'+obj[i].user_img+'" width="50" height="50"/></td>';
            html += '<td class="center">'+obj[i].name+'</td>';
            html += '<td>LifeFresh</td><td class="center">'+obj[i].cellphone+'</td><td class="center">'+obj[i].email+'</td>';
            html += '<td class="center">'+obj[i].age+'</td><td class="center">'+obj[i].gender+'</td><td class="center">';
            html += '<strong class="rmb_icon">'+obj[i].money+'</strong></td><td class="center"><strong class="rmb_icon">'+obj[i].address+'</strong>';
            html += '</td><td class="center"><a href="user_detail.html" title="编辑" class="link_icon">&#101;</a>';
            html += '<button onclick="blockuser()" title="删除" class="link_icon">&#100;</a></td></tr>';
        }   
    }
    return html;
}

function blockuser(id){
    var list=[];
    list = id.split('_');
    var arr = {};
    if(list.length==2)
    {	
    	arr.cellphone = list[0];
    	arr.blocked = list[1];
    }else{
    	alert("失败");
    }
    
   

    $.post("http://localhost:8080/DanielWu/admin/updateuser",arr,function(msg){
    	msg = JSON.parse(msg);
    	if(msg.status==200&&msg.state==true){
    		alert("已冻结");
    		window.location.reload();
    	}
    	if(msg.status==200&&msg.state==false){
    		alert("已激活");
    		window.location.reload();
    	}if(msg.status==400)
    		{
    			alert("操作失败");
    		}
    });
}