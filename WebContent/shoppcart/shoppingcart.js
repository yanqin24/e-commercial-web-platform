var index;
var goodid=[];
var pregoodnum=[];
var goodnum=[];
var producer=[];
var producer_idlist=[];
var producer_id;
var cart=[];
$(document).ready(function(){

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
    $.ajaxSettings.async = false;
    $.getJSON("http://localhost:8080/DanielWu/admin/producer",function(data){
        producer=data;
	});
    $.ajaxSettings.async = true;
    $.getJSON("http://localhost:8080/DanielWu/user/shoppingcart",function(data){
        cart=data;
        console.log(data);
        console.log(producer);
        for(var i=0; i<cart.shoppingcart.length; i++){
            var proid='produ'+cart.shoppingcart[i].good.producer_id;
          if($('#produ'+cart.shoppingcart[i].good.producer_id).find('#produname').attr('id')==null){
            $('#produ').clone().attr('id',proid).appendTo('#display1');
            console.log("aa");
          }
        }
     
        
        $('#produ').hide();
       // $('#listitem').hide();
       // $('#produname0').html(data[0].good.producer_id);
       // $('#display1').html(each1(data));
       // $('#display2').html(each2(data));
        for(var i=0; i<producer.producers.length; i++){
            $('#produ'+producer.producers[i].producer_id).find('#produname').attr('id','produname'+producer.producers[i].producer_id);
            $('#produname'+producer.producers[i].producer_id).html(producer.producers[i].producer_id+" "+producer.producers[i].name);
        }
            index = data.shoppingcart.length;
           

        for(var z=0; z<index; z++){
            for(var pro=0; pro<producer.producers.length; pro++){
                if(data.shoppingcart[z].good.producer_id==producer.producers[pro].producer_id){
                    var listid= "listitem"+z;
                    $("#listitem").clone().attr('id',listid).appendTo("#produ"+producer.producers[pro].producer_id);
                    $('#produ'+producer.producers[pro].producer_id).find('#listitem'+z).find('#listimg').attr('src','../good_img/'+data.shoppingcart[z].good.img_src);
                    $('#produ'+producer.producers[pro].producer_id).find('#listitem'+z).find('#listname').html(data.shoppingcart[z].good.breif_introduction);
                    $('#produ'+producer.producers[pro].producer_id).find('#listitem'+z).find('#listprice').html('￥'+data.shoppingcart[z].good.price);
                    $('#produ'+producer.producers[pro].producer_id).find('#listitem'+z).find('#listnum').val(data.shoppingcart[z].amount);
                    $('#produ'+producer.producers[pro].producer_id).find('#listitem'+z).find('#listtotal').html('￥'+data.shoppingcart[z].good.price*data.shoppingcart[z].amount);
                }
            }
        }

        for(var i=0; i<producer.producers.length; i++)
            $('#produ'+producer.producers[i].producer_id).find('#listitem').hide();
           
        
//data.shoppingcart[j].amount)
        for (var j=0;j<index;j++) {
            pregoodnum.push(data.shoppingcart[j].amount);
            $('#listitem'+j).find('#listnum').attr('id','listnum'+j);
            $('#listitem'+j).find('#buttonplus').attr('id','buttonplus'+j);
            $('#listitem'+j).find('#buttonminus').attr('id','buttonminus'+j);
        }
   
     console.log(pregoodnum);

   
       
/*
        for (var j=0;j<index;j++) {
        
            
            $('#listitem'+j).find('#listname').html(data[j].good.breif_introduction);
            $('#listitem'+j).find('#listprice').html('￥' + data[j].good.price);
            $('#listitem'+j).find('#listnum'+j).html(data[j].amount);
            $('#listitem'+j).find('#listtotal').html('￥' + data[j].good.sale_num * data[j].good.price);
        } */

    },
    "json");

});

function jiesuan() {
    console.log($('#listitem0').find('#listcheckbox').prop("checked"));
    console.log($('#display1').find('#listitem0').find('#listname').html());
    var num = 0;
    producer_id = null;
    producer_idlist=[];
          for(var sub=0;sub<index;sub++){
            if($('#listitem'+sub).find('#listcheckbox').prop("checked"))
            {
            	goodid.push(cart.shoppingcart[sub].good.good_id);
            	producer_idlist.push(cart.shoppingcart[sub].good.producer_id);
            	producer_id = cart.shoppingcart[sub].good.producer_id;
            	goodnum.push(pregoodnum[sub]);
            	num++;
       
            }
            
        } 
          if(num == 0){
        	  alert("请至少选择一种商品!");
          }
          else{
        console.log(goodnum);
   /* $.post('',goodnum,function(tt){
        console.log(tt);
    });*/
  /*  $("#display1>div").each(function(i,ele){
        console.log(ele);
    });*/
        for(var i=0;i<producer_idlist.length;i++)
        	{
        		if(producer_idlist[i]!=producer_id){
        			alert("请选择同一门店下的商品");
        			return;
        		}
        			
        	}
     var idlist='';
    var goodlist='';
    var href="http://localhost:8080/DanielWu/OrderPage/Orderpage.html?good_id=";
         for(var i=0; i<goodid.length; i++){
           idlist=idlist+goodid[i];
           goodlist=goodlist+goodnum[i];
         }
         console.log(goodlist);	
    location.href=href+encodeURI(idlist)+"good_num-"+encodeURI(goodlist)+"producer_id+"+encodeURI(producer_id);
          }
}

function addnum(button) {
    var ID=button.id.substr(button.id.length-1,1);
    pregoodnum[ID] = $('#listnum'+ID).val();
    pregoodnum[ID]++;
    $('#listnum'+ID).val(pregoodnum[ID]);
    console.log(ID);
    $('#listitem'+ID).find('#listtotal').html('￥'+(cart.shoppingcart[ID].good.price*pregoodnum[ID]).toFixed(2));
}

function minusnum(button) {
    var ID=button.id.substr(button.id.length-1,1);
    pregoodnum[ID] = $('#listnum'+ID).val();
    if(pregoodnum[ID]>0)
    pregoodnum[ID]--;
    $('#listnum'+ID).val(pregoodnum[ID]);
    console.log(pregoodnum);
    $('#listitem'+ID).find('#listtotal').html('￥'+(cart.shoppingcart[ID].good.price*pregoodnum[ID]).toFixed(2));
}

function test(){

   // location.href="Orderpage.html?"+"txt="+encodeURI(s.value);
}
function each2(data){
    var html = ''; 
    var obj =data.data;
    
    for (var i = 0;i < data.length;i++){
        html += '<li class="active" style="padding-left: 64%">选择<b></b>件商品</li>';
        html += '<li class="active" style="padding-left: 15px">节省￥  <b></b></li>';
        html += '<li class="active" style="padding-left: 10px">总计￥<b></b></li>';
    }
    return html;
}

function delete_order(id){
    var tp_id = 'topic_id='+id;
    console.log();
    $.post('',tp_id,function(tt){
        console.log(tt);
        window.location.reload();
    });
}
