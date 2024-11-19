var list= {};
var goodlist=[];
var producer=[];
var label;
var id;
var littleid;
$(document).ready(function(){
   
	$.getJSON("http://localhost:8080/DanielWu/user/getuserinfo",function(msg){

		if(msg == 404)
			alert("请先登录");
		else
			{
				$("#loginInfo").hide();
				console.log(msg.cellphone);
				$("#loginedInfo").show();
				$("#user_idinfo").html(msg.user.cellphone);
			}
		
		
	});
	 	var loc=location.href;
	    var n1=loc.length;//地址的总长度
	    var n2=loc.indexOf("=");//取得=号的位置
	    id=decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
        console.log(id);
        $.ajaxSettings.async = false;
     
    $.getJSON("http://localhost:8080/DanielWu/goods/goodlist",function(data){
            // $('#display1').html(each1(data));
            // $('#display2').html(each2(data));
        $.each(data, function (k, v) {
            goodlist[k] = v;
        });
        for(var i=0;i<data.length;i++)
    			{
    				if(id==data[i][0].good_id)
    					{
    						littleid=i;
	    					$('#gooddetades').html(data[i][0].breif_introduction);
	    		            $('#gooddetaprice').html('￥'+data[i][0].price);
	    		            $('#good_img').attr("src",data[i][0].src);
	    		            list= {
	    		            		   "good_id":data[i][0].good_id,
	    		            		   "producer_id":"",
	    		            		   "amount":""
	    		            		   };
	    		            break;
    					}
    			}
  
         /*   var index = data.length;
            for (var j=0;j<index;j++) {
                var ID= "listitem"+j;
                $("#listitem").clone().attr('id',ID).appendTo("#display1");
            }

            /!*     for (var i=1;i<index;i++){
                     if (i%4!=0){
                         var ID= "product-item-"+i;
                         var code=parseInt(i/4);
                         $("#product-item-0").clone().attr('id',ID).appendTo("#product-box-"+code);
                         // alert(code);
                     }
                 }*!/
            $('#listname').html(data[0].good.breif_introduction);
            $('#listprice').html('￥'+data[0].good.price);
            $('#listnum').html(data[0].good.sale_num);
            $('#listtotal').html('￥'+data[0].good.sale_num*data[0].good.price);*/
        },
        "json");
        $.getJSON("http://localhost:8080/DanielWu/admin/producer",function(msg){
            console.log(msg);
            console.log(goodlist);
            var index;
            for(var i=0; i<goodlist.length; i++)
                if(id==goodlist[i][0].good_id){
                    index=i;
                    for(var j=0; j<goodlist[i].length; j++)
                            producer.push(goodlist[i][j].producer_id);
                }


            console.log(producer);
            for(var i=2; i<10; i++){
                $('#proshow1').clone().attr('id','proshow'+i).appendTo('#proshow');
            }

            for(var i=1; i<10; i++)
                $('#proshow'+i).find('a').attr('id','#chositem'+i);

             $.each(msg.producers, function (k, v) {
                 if(k==0){
                            $('#proshow0').html(msg.producers[0].name+' <span class="caret"></span>');
                 }else{
                             $('#proshow'+k).find('a').html(msg.producers[k].name);
                 }
            });

            $("#chosprodu").on("change",function(){
                if($("option:selected",this).val()=='a0'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                        for(var i=0; i<producer.length; i++)
                            if(producer[i]=="047100"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='047100')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a1'){
                	 $('#ifgood').html('否');
                	 $('#gooddetaprice').html('无');
                         for(var i=0; i<producer.length; i++)
                         if(producer[i]=="100102"){
                            $('#ifgood').html('是');
                            for(var j=0;j<producer.length;j++)
                            	if(producer[j]=='100102')
                            		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                            label=producer[i];
                        }
                }else if($("option:selected",this).val()=='a2'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                        for(var i=0; i<producer.length; i++)
                            if(producer[i]=="150526"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='150526')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a3'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                         for(var i=0; i<producer.length; i++)
                            if(producer[i]=="210009"){
                                $('#ifgood').html('是');
                                console.log(littleid);
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='210009')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a4'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                         for(var i=0; i<producer.length; i++)
                            if(producer[i]=="323700"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='323700')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a5'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                        for(var i=0; i<producer.length; i++)
                            if(producer[i]=="528305"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='528305')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a6'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                         for(var i=0; i<producer.length; i++)
                            if(producer[i]=="530021"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='530021')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a7'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                         for(var i=0; i<producer.length; i++)
                            if(producer[i]=="541100"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='541100')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a8'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                         for(var i=0; i<producer.length; i++)
                            if(producer[i]=="610211"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='610211')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }else if($("option:selected",this).val()=='a9'){
                   $('#ifgood').html('否');
                   $('#gooddetaprice').html('无');
                         for(var i=0; i<producer.length; i++)
                            if(producer[i]=="833600"){
                                $('#ifgood').html('是');
                                for(var j=0;j<producer.length;j++)
                                	if(producer[j]=='833600')
                                		$('#gooddetaprice').html('￥'+goodlist[littleid-1][j].price);
                                label=producer[i];
                            }
                }
            });
          
	    });

})

function getnum() {
    return $('#gooddetanum').val();
}

function joincart() {
    if($('#ifgood').html()=='是')
    {
	var id=$('#gooddetades').html();
    console.log(id);
    
    list.producer_id=label;
    list.amount=$('#gooddetanum').val()
    if(list.amount=="")
	{
		alert("请填写商品数量");
		return;
	}
    
    $.ajax({
    type :"post",
    url:"http://localhost:8080/DanielWu/user/addtocart",
    datatype: "json",
    data:list,
    async :true,
    success:function(msg){
        var tt = JSON.parse(msg);
        if(tt.status==200){
            alert("加入购物车成功！");
            window.location.href = "http://localhost:8080/DanielWu/MainPage/Mainpage.html";
        }
        if(tt.status==400)
            alert("加入失败！");
        if(tt.status==404)
            alert("请先登录！");
    }
});
    }else{
        alert('没有货物!');
    }
}

function favour() {
	if($('#ifgood').html()=='是')
	{
    var itemjson = {
    		"good_id":id,
    		"producer_id":label
    }
    
    console.log(itemjson);
    var j =JSON.stringify(itemjson);
    $.post('http://localhost:8080/DanielWu/user/collection',itemjson,function(tt){
        console.log(tt);
        tt = JSON.parse(tt);
        if(tt.status == 403)
        	alert("收藏夹中已有该商品,请勿重复收藏");
        if(tt.status == 200)
        	alert("收藏成功！");
    });
	}else{
		alert('该门店没有此商品！');
	}
}


function gotocart()
{
    window.location.href="http://localhost:8080/DanielWu/shoppcart/shoppingcart.html";
}