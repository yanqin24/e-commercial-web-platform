var goodlist;
var goodid=[];
var index;
$(document).ready(function () {

	    $('#recorder-main').hover(function() {
        $("#recorder").css('display', 'block');
    }, function() {
        $("#recorder").css('display', 'none');
    });

    $('#recorder').hover(function() {
        $(this).css('display', 'block');
        $("#show").css('display', 'block');
    }, function() {
        $(this).css('display', 'none');
        $("#show").css('display', 'none');
    });

    $('#show').hover(function() {
        $(this).css('display', 'block');
        $('#recorder').css('display', 'block');
    }, function() {
        $(this).css('display', 'none');
        $('#recorder').css('display', 'none');
    });
    
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
    var n3=loc.indexOf("?");
    var judge=decodeURI(loc.substr(n3+1, n2-n3-1));
    var kind=decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
    console.log(judge);
    console.log(kind);
    $.ajaxSettings.async = false; 
    $.getJSON("http://localhost:8080/DanielWu/goods/goodlist",function(data){
                    goodlist=data;
                    for(var j=0; j<data.length; j++){
                        if(data[j][0].third_class==kind){
                         // console.log( $('#product-item-'+i));
                        goodid.push(data[j][0].good_id);
                        }
                    }
                    $('#but21').hide();
                    $('#but22').hide();
                    $('#but23').hide();
                    $('#but31').hide();
                    $('#but32').hide();
                    console.log(goodlist);
                    console.log(kind);
                 
                    console.log(index);
                    
        } );
  /*       var HTML="<div id=\"product-box-0\" class=\"row-search-item\">"+
       "" <div id="product-item-0" class="column-search" style="width: 250px;height: 350px;margin-top: 30px;margin-right: 10px;">
            <div class="container">
                <div class="row-search-item">
                    <a id="click" href="#"><div class="column-search" style="width: 250px;height: 500px;margin-top: 30px;margin-right: 10px;">
                        <img id="goodimg" src="../images/food.jpg" alt="" style="width: 250px;height: 250px" >
                        <div class="row-search-item" style="padding-top: 5px;">
                            <text id="goodprice" style="width: 120px;color: red;font-size: 17px;text-align: left;margin-left: 5px">￥ 14.00</text>
                            <text id="goodsalenum" style="width: 120px;color: #cdcdcd;font-size: 14px;text-align: right;margin-right: 5px">1314人付款</text>
                        </div>
                        <text id="gooddes" style="line-height: 25px;font-size: 14px;color:#000000;margin: 5px;">小胡鸭鱼豆腐158g休闲零食小吃豆干香辣鱼豆腐</text>
                        <div class="row-search-item" style="width:100%;padding-top: 5px;margin-left: 5px;margin-right: 5px;text-align: left">
                            <div style="width:50%;">
                                <text class="glyphicon glyphicon-menu-hamburger" style="color: red;background: none;width: 20px;height: 20px"></text>
                                <text style="color: #000000;font-size: 14px;margin-left: 5px">乐鲜生活</text>
                            </div>
                            <text id="goodprodu" style="width:50%;color: #000000;font-size: 14px;margin-right: 5px;text-align: right">上海</text>
                        </div>
                    </div></a>
                </div>
            </div>
        </div>
    </div>
        $('#product-container').html();
     */
    console.log($('#product-box'));
    index=goodid.length;
    console.log(goodid);
    for (var j=0;j<index;j++) {
        if(j%4==0 && j!=0){
            var ID= "product-box-"+(j/4);
            $("#product-box").clone().attr('id',ID).appendTo("#product-container");
            $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
        }else if(j==0)
        {
            var ID= "product-box-"+(j/4);
            $("#product-box").clone().attr('id',ID).appendTo("#product-container");
            $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
        }
    }

    for (var i=1;i<index;i++){
        if (i%4!=0){
            var ID= "product-item-"+i;
            var code=parseInt(i/4);
            $("#product-item").clone().attr('id',ID).appendTo("#product-box-"+code);
            // alert(code);
        }
    } 
    $('#product-box').hide();

    console.log(judge);
    console.log(kind);

    var i=0;
    for(var j=0; j<goodlist.length; j++){
    	 if(goodlist[j][0].third_class==kind){
		    $('#product-item-'+i).find('#click').attr('href','http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+goodid[i]);
            $('#product-item-'+i).find('#goodimg').attr('src',goodlist[j][0].src);
            $('#product-item-'+i).find('#gooddes').html(goodlist[j][0].breif_introduction);
            $('#product-item-'+i).find('#goodprice').html('￥'+goodlist[j][0].price);
            $('#product-item-'+i).find('#goodsalenum').html(goodlist[j][0].sale_num+'人付款');
            $('#product-item-'+i).find('#goodprodu').html(goodlist[j][0].producer_id);
            i++;
         }
        }

    if(judge=="description")
    	search2(kind);
    

});


function opentwo(item){
    $('#but31').hide();
    $('#but32').hide();
    if(item.id=='but11'){
        $('#but21').html('糖果/巧克力');
        $('#but22').html('肉类/豆干');
        $('#but23').html('饮料/水');
        $('#but21').show();
        $('#but22').show();
        $('#but23').show();
    }else if(item.id=='but12'){
        $('#but21').html('大米/面粉');
        $('#but22').html('方便速食');
        $('#but23').html('食用油');
        $('#but21').show();
        $('#but22').show();
        $('#but23').show();
    }else{
        $('#but21').html('一次性用品');
        $('#but22').html('厨具');
        $('#but23').html('小家电');
        $('#but21').show();
        $('#but22').show();
        $('#but23').show();
    }
}

function openthree(item){
    console.log(item.id);
    if(item.innerText=='糖果/巧克力'){
        $('#but31').html('口香糖');
        $('#but32').html('巧克力');
        $('#but31').show();
        $('#but32').show();
    }else if(item.innerText=='肉类/豆干'){
        $('#but31').html('牛肉');
        $('#but32').html('豆干');
        $('#but31').show();
        $('#but32').show();
    }else if(item.innerText=='饮料/水'){
        $('#but31').html('咖啡');
        $('#but32').html('矿泉水');
        $('#but31').show();
        $('#but32').show();
    }else if(item.innerText=='大米/面粉'){
        $('#but31').html('大米');
        $('#but32').html('面粉');
        $('#but31').show();
        $('#but32').show();
    }else if(item.innerText=='方便速食'){
        $('#but31').html('八宝粥');
        $('#but32').html('火腿肠');
        $('#but31').show();
        $('#but32').show();
    }else if(item.innerText=='食用油'){
        $('#but31').html('花生油');
        $('#but32').html('调和油');
        $('#but31').show();
        $('#but32').show();
    }else if(item.innerText=='一次性用品'){
        $('#but31').html('垃圾袋');
        $('#but32').html('手套');
        $('#but31').show();
        $('#but32').show();
    }else if(item.innerText=='厨具'){
        $('#but31').html('煎锅');
        $('#but32').html('菜刀');
        $('#but31').show();
        $('#but32').show();
    }else{
        $('#but31').html('垃圾袋');
        $('#but32').html('手套');
        $('#but31').show();
        $('#but32').show();
    }
}

function opengoodlist(item){
    $('#product-container').empty();
    console.log($("#product-box"));
 
    var i=0;
    goodid.length=0;
    for(var j=0; j<goodlist.length; j++)
        if(goodlist[j][0].third_class==item.innerText){
            goodid.push(goodlist[j][0].good_id);
         }
    console.log(index);

    index=goodid.length;
    $('#product-box').show();
    for (var j=0;j<index;j++) {
        if(j%4==0 && j!=0){
            var ID= "product-box-"+(j/4);
            $("#product-box").clone().attr('id',ID).appendTo("#product-container");
            $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
        }else if(j==0)
        {
            var ID= "product-box-"+(j/4);
            $("#product-box").clone().attr('id',ID).appendTo("#product-container");
            $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
        }
    }

    for (var i=1;i<index;i++){
        if (i%4!=0){
            var ID= "product-item-"+i;
            var code=parseInt(i/4);
            $("#product-item").clone().attr('id',ID).appendTo("#product-box-"+code);
            // alert(code);
        }
    } 
    $('#product-box').hide();

    var i=0;
    for(var j=0; j<goodlist.length; j++)
    if(goodlist[j][0].third_class==item.innerText){
        goodid.push(goodlist[j][0].good_id);
        $('#product-item-'+i).find('#click').attr('href','http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+goodlist[j][0].good_id);
        $('#product-item-'+i).find('#goodimg').attr('src',goodlist[j][0].src);
        $('#product-item-'+i).find('#gooddes').html(goodlist[j][0].breif_introduction);
        $('#product-item-'+i).find('#goodprice').html('￥'+goodlist[j][0].price);
        $('#product-item-'+i).find('#goodsalenum').html(goodlist[j][0].sale_num+'人付款');
        $('#product-item-'+i).find('#goodprodu').html(goodlist[j][0].producer_id);
        i++;
     }


    
}

function search(item){
    $('#product-container').empty();
 
	console.log($('#search').val());
	var json = {
			"description":$('#search').val()
	};

	$.getJSON("http://localhost:8080/DanielWu/goods/searchgood",json,function(data){
        console.log(data);
        index=data.good_list.length;
        console.log(index);
        $('#product-box').show();
        for (var j=0;j<index;j++) {
            if(j%4==0 && j!=0){
                var ID= "product-box-"+(j/4);
                $("#product-box").clone().attr('id',ID).appendTo("#product-container");
                $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
            }else if(j==0)
            {
                var ID= "product-box-"+(j/4);
                $("#product-box").clone().attr('id',ID).appendTo("#product-container");
                $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
            }
        }
    
        for (var i=1;i<index;i++){
            if (i%4!=0){
                var ID= "product-item-"+i;
                var code=parseInt(i/4);
                $("#product-item").clone().attr('id',ID).appendTo("#product-box-"+code);
                // alert(code);
            }
        } 
        $('#product-box').hide();
        console.log("success");
        for(var i=0; i<index; i++){
        $('#product-item-'+i).find('#click').attr('href','http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+data.good_list[i].gooditem.good_id);
        $('#product-item-'+i).find('#goodimg').attr('src',data.good_list[i].gooditem.img_src[0]);
        $('#product-item-'+i).find('#gooddes').html(data.good_list[i].gooditem.breif_introduction);
        $('#product-item-'+i).find('#goodprice').html('￥'+data.good_list[i].min_price+'~'+data.good_list[i].max_price);
        $('#product-item-'+i).find('#goodsalenum').html(data.good_list[i].gooditem.sale_num+'人付款');
        $('#product-item-'+i).find('#goodprodu').html(data.good_list[i].gooditem.producer_id);
        }
},
"json");
	
}


function search2(item){
	$('#product-container').empty();
	console.log("success");
	var json = {
			"description":item
	};

	$.getJSON("http://localhost:8080/DanielWu/goods/searchgood",json,function(data){
        console.log(data);
        index=data.good_list.length;
        $('#product-box').show();
        for (var j=0;j<index;j++) {
            if(j%4==0 && j!=0){
                var ID= "product-box-"+(j/4);
                $("#product-box").clone().attr('id',ID).appendTo("#product-container");
                $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
            }else if(j==0)
            {
                var ID= "product-box-"+(j/4);
                $("#product-box").clone().attr('id',ID).appendTo("#product-container");
                $('#'+ID).find('#product-item').attr('id',"product-item-"+j);
            }
        }
    
        for (var i=1;i<index;i++){
            if (i%4!=0){
                var ID= "product-item-"+i;
                var code=parseInt(i/4);
                $("#product-item").clone().attr('id',ID).appendTo("#product-box-"+code);
                // alert(code);
            }
        } 
        $('#product-box').hide();
        
        for(var i=0; i<data.good_list.length; i++){
        $('#product-item-'+i).find('#click').attr('href','http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+data.good_list[i].gooditem.good_id);
        $('#product-item-'+i).find('#goodimg').attr('src',data.good_list[i].gooditem.img_src[0]);
        $('#product-item-'+i).find('#gooddes').html(data.good_list[i].gooditem.breif_introduction);
        $('#product-item-'+i).find('#goodprice').html('￥'+data.good_list[i].min_price+'~'+data.good_list[i].max_price);
        $('#product-item-'+i).find('#goodsalenum').html(data.good_list[i].gooditem.sale_num+'人付款');
        $('#product-item-'+i).find('#goodprodu').html(data.good_list[i].gooditem.producer_id);
        }
},
"json");
	
}


function gotocart()
{
    window.location.href="http://localhost:8080/DanielWu/shoppcart/shoppingcart.html";
}