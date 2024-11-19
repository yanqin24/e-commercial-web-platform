var i = 0; 
var data ;
var itemlist = [];
var item ={};
var goodid=[];
var goodnum=[];
var index;
var producer_id;
$(document).ready(function(){
    $.getJSON("",function(tt){
        data= eval("("+tt+")");
        count_num();
    },
    "json");
	$.getJSON("http://localhost:8080/DanielWu/user/getuserinfo",function(msg){

		if(msg == 404)
			alert("请先登录");
		else
			{
				$("#loginInfo").hide();
				console.log(msg.user.cellphone);
				$("#loginedInfo").show();
				$("#user_idinfo").html(msg.user.cellphone);
			}
		
		
	});


    var loc=location.href;
    var n1=loc.length;//地址的总长度
    var n2=loc.indexOf("=");//取得=号的位置
    var n3=loc.indexOf("-");
    var n4=loc.indexOf("+");
    var id=decodeURI(loc.substr(n2+1, n3-n2-9));//从=号后面的内容
    index=id.length/6;
    var num=decodeURI(loc.substr(n3+1, n4-n3-12));
    producer_id=decodeURI(loc.substr(n4+1, n1-n4));
    console.log(producer_id);
    var bit=num.length/index;
    if(producer_id=='047100')
    	{
    	 $('#producershow').html('乐鲜生活长治店');
    	}else if(producer_id=='100102'){
    		 $('#producershow').html('乐鲜生活北京店');
    	}else if(producer_id=='150526'){
    		 $('#producershow').html('乐鲜生活呼兰店');
    	}else if(producer_id=='210009'){
    		 $('#producershow').html('乐鲜生活玄武店');
    	}else if(producer_id=='323700'){
    		 $('#producershow').html('乐鲜生活龙泉店');
    	}else if(producer_id=='528305'){
    		 $('#producershow').html('乐鲜生活顺德店');
    	}else if(producer_id=='530021'){
    		 $('#producershow').html('乐鲜生活青秀店');
    	}else if(producer_id=='541100'){
    		 $('#producershow').html('乐鲜生活临桂店');
    	}else if(producer_id=='610211'){
    		 $('#producershow').html('乐鲜生活双流店');
    	}else if(producer_id=='833600'){
    		 $('#producershow').html('乐鲜生活独山子店');
    	}
    
   
    for(var i=0; i<index; i++){
    	item = {
    			"good_id":id.substr(i*6,6),
    			"amount" :num.substr(i*bit,bit)
    	}
        itemlist.push(item);
    }

    for (var j=1;j<index;j++) {
        var ID= "gooditem"+j;
        $("#gooditem0").clone().attr('id',ID).appendTo("#showgood");
    }

   /* for (var j=0;j<index;j++) {
        $('#gooditem'+j).find('#showgoname').html("aa");
        $('#gooditem'+j).find('#showgoprice').html('￥' + "aa");
        $('#gooditem'+j).find('#showgonum').html(goodnum[j]);
        $('#gooditem'+j).find('#showgototal').html('￥' + "aa");
    }*/
   

    $.getJSON("http://localhost:8080/DanielWu/user/shoppingcart",function(msg){
		if(msg == 404)
			alert("请先登录");
		else
			{
				for(var i=0;i<itemlist.length;i++)
					for(var j=0;j<msg.shoppingcart.length;j++)
					{
						if(itemlist[i].good_id==msg.shoppingcart[j].good.good_id)
							{
							    $('#gooditem'+i).find('#showgoname').html(msg.shoppingcart[j].good.name);
						        $('#gooditem'+i).find('#showgoprice').html('￥' + msg.shoppingcart[j].good.price);
						        $('#gooditem'+i).find('#showgonum').html(itemlist[i].amount);
						        $('#gooditem'+i).find('#showgototal').html('￥' + (msg.shoppingcart[j].good.price*itemlist[i].amount).toFixed(2));
							}
						
					}
			}
		
		
	});

    //alert(id);//
    // document.write(id);


});

/**
 *订单信息循环
 *
 */
function count_num(){
    
    if(i < data.good.length)
    {
        $('#display1').html(each1(data));
        $('#display2').html(each2(data));
        $('#display3').html(each3(data));
        $('#display4').html(each4(data));
    }
}

/**
 *表4
 *
 * @param {*} data
 * @returns
 */
function each4(data){
    var html = ''; 
    var obj =data.good;
        
    html += '<b>实付金额:￥'+obj.price+'</b>';   
    
    return html;
}

/**
 *表3
 *
 * @param {*} data
 * @returns
 */
function each3(data){
    var html = ''; 
    var obj =data.good;
    
    
    html += '<div class="container" style="width: 800px;height: 170px;border:1px solid rgba(155, 145, 145, 0.925); margin-left: 22%;>';
    html += '<div class="row"><div class="col-md-3"><img style="margin-left: 50px;margin-top: 60px" src="'+obj[i].good_img+'"></div>';
    html += '<div class="col-md-4"><li style="list-style-type: none;margin-top: 70px"><b>'+obj[i].bre_introduction+'</b></li></div><div class="col-md-1">';
    html += '<li style="list-style-type: none;margin-top: 90px">'+obj[i].price+'</li></div><div class="col-md-1"><li style="list-style-type: none;margin-top: 90px">'+obj[i].sale_num+'</li>';
    html += '</div><div class="col-md-1"><li style="list-style-type: none;margin-top: 90px">0.00</li></div><div class="col-md-1">';
    html += '<li style="list-style-type: none;margin-top: 90px">'+obj[i].sale_num*obj[i].price+'</li></div><div class="col-md-1">';
    html += '<input type="button" style="border: none;font-size: 12px; margin-top: 83px" value="删除" id="'+obj.good_id+'" onclick="delete_order(id)"></input>';
    html += '</div></div></div>'
        
    return html;
}

/**
 *表2
 *
 * @param {*} data
 * @returns
 */
function each2(data){
    var html = ''; 
    var obj =data.producer;
   
    html += '<li style="padding-top: 1px">店名：</li>';
    html += '<li style="padding-top: 10px">联系电话：</li>';
    html += '<li style="padding-top: 10px">发货地址：</li>';
    html += '<li style="padding-top: 7px">收货地址：'+obj.adress+'</li>';
   
    return html;  
}


/**
 *表1
 *
 * @param {*} data
 * @returns
 */
function each1(data){
    var html = ''; 
    var obj =data.user;
    
    html += '<li >联系人姓名：'+obj.username+'</li>';
    html += '<li style="padding-top: 7px">联系电话：'+obj.cellphone+'</li>';
    html += '<li style="padding-top: 7px">联系邮箱：'+obj.email+'</li>';
    html += '<li style="padding-top: 7px">收货地址：'+obj.adress+'</li>';
    

    return html;
}


/**
 *删除订单
 *
 * 
 */
function delete_order(id){

    var list = [];
    var good = {};

    good.good_id = id;

    list.push(good);
    var j =JSON.stringify(list);

    $.post('',j,function(tt){
        console.log(tt);
        count_num();
    });
}

/**
 *提交订单
 *
 */
function sendyes(){

    console.log(document.getElementById('delivername').value);


    var jsonn={
        "order":itemlist,
        "producer_id": producer_id,
        "address": "beijing"
        };
    console.log(jsonn);

    /* var good = data.good;

    var j =JSON.stringify(good);

    i++; */
    var jsondata;
    jsondata = JSON.stringify(jsonn);
    $.ajax({
         type :"post",
         url:"http://localhost:8080/DanielWu/user/orderlist",
         datatype: "json",
         contentType :"application/json",
         data:jsondata,
         async :true,
         success:function(msg){
             var tt = JSON.parse(msg);
             if(tt.status==200){
                 alert("购买成功！");
                 window.location.href = "http://localhost:8080/DanielWu/MainPage/Mainpage.html";
             }
             if(tt.status==400)
                 alert("账户余额不足！");
             if(tt.status==404)
                 alert("商品不存在！");
         }
     })
    }
 
    
