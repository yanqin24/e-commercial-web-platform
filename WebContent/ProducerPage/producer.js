var producer;
var producer_id="047100";
var index=5;
var good;
var pagenum;
var start=0;
var end=5;
$(document).ready(function () {

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
	
	$.ajaxSettings.async=false;
  $.getJSON("http://localhost:8080/DanielWu/admin/producer",function(data){
        producer=data;
    });

 
    $("#place").on("change",function(){
        if($("option:selected",this).val()=='a0'){
            producer_id="047100";
            show();
        }else if($("option:selected",this).val()=='a1'){
            producer_id="100102";
            show();
        }else if($("option:selected",this).val()=='a2'){
            producer_id="150526";
            show();
        }else if($("option:selected",this).val()=='a3'){
           producer_id="210009";
           show();
        }else if($("option:selected",this).val()=='a4'){
           producer_id="323700";
           show();
        }else if($("option:selected",this).val()=='a5'){
           producer_id="528305";
           show();
        }else if($("option:selected",this).val()=='a6'){
           producer_id="530021";
           show();
        }else if($("option:selected",this).val()=='a7'){
           producer_id="541100";
           show();
        }else if($("option:selected",this).val()=='a8'){
           producer_id="610211";
           show();
        }else if($("option:selected",this).val()=='a9'){
           producer_id="833600";
           show();
        }
    });

   
    show();

});

function show(){
    $.ajaxSettings.async=false;
    $.getJSON("http://localhost:8080/DanielWu/producer/goodlist?producer_id="+producer_id,function(data){
       //index=data.goodlist.length;
       pagenum=Math.round(data.goodlist.length/index);
       good=data;
    });
    $('#pro_img').attr('src','../producer_img/'+producer_id+'.jpg');
    $('#pagebox').empty();
    $('#pageitem').show();
    console.log(pagenum);

    if(good.goodlist.length%index!=0)
    for(var j=0; j<pagenum+1; j++){
        var ID="pageitem";
        $('#pageitem').clone().attr('id',ID+j).appendTo('#pagebox');
        $('#pageitem'+j).find('a').html(j+1);
    }else
    for(var j=0; j<pagenum; j++){
        var ID="pageitem";
        $('#pageitem').clone().attr('id',ID+j).appendTo('#pagebox');
        $('#pageitem'+j).find('a').html(j+1);
    }

    $('#pageitem').hide();

	 for(var i=0; i<producer.producers.length; i++)
	    {
	        if(producer_id==producer.producers[i].producer_id)
	            {
	                $('#proname').html(producer.producers[i].name);
	                $('#proaddress').html(producer.producers[i].province+producer.producers[i].city+producer.producers[i].county);
	                $('#protel').html("001000312");
	            }
	    }
	 for (var i=0;i<index;i++){
	        var ID= "listitem"+i;
	        $("#listitem").clone().attr('id',ID).appendTo("#showprogood");
	} 
		
	  for(var i=0; i<index; i++){
		  $('#listitem'+i).find('a').attr('href','http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+good.goodlist[i].good_id);
          $('#listitem'+i).find('#listimg').attr('src',good.goodlist[i].img_src);
          $('#listitem'+i).find('#listname').html(good.goodlist[i].breif_introduction);
          $('#listitem'+i).find('#listprice').html('￥'+good.goodlist[i].price);
          $('#listitem'+i).find('#listprice2').html(good.goodlist[i].sale_num+'人付款');
       }
     $('#listitem').hide();
}
function goto(item){
    console.log(item.innerText);
    console.log(good.goodlist.length);
    if(good.goodlist.length<5*item.innerText)
        for(var z=(item.innerText-1)*5; z<(item.innerText-1)*5+5; z++){
            console.log(z);
            $('#listitem'+z%5).find('a').attr('href','http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+good.goodlist[z].good_id);
            $('#listitem'+z%5).find('#listimg').attr('src',good.goodlist[z].img_src);
            $('#listitem'+z%5).find('#listname').html(good.goodlist[z].breif_introduction);
            $('#listitem'+z%5).find('#listprice').html('￥'+good.goodlist[z].price);
            $('#listitem'+z%5).find('#listprice2').html(good.goodlist[z].sale_num+'人付款');
            if((item.innerText-1)*5+5>good.goodlist.length)
                for(var i=good.goodlist.length%5; i<5;i++)
                    $('#listitem'+i).hide();
        }
    else{
        $('#listitem0').show();
        $('#listitem1').show();
        $('#listitem2').show();
        $('#listitem3').show();
        $('#listitem4').show();
    for(var z=(item.innerText-1)*5; z<(item.innerText-1)*5+5; z++){
        console.log(z);
        $('#listitem'+z%5).find('a').attr('href','http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+good.goodlist[z].good_id);
        $('#listitem'+z%5).find('#listimg').attr('src',good.goodlist[z].img_src);
        $('#listitem'+z%5).find('#listname').html(good.goodlist[z].breif_introduction);
        $('#listitem'+z%5).find('#listprice').html('￥'+good.goodlist[z].price);
        $('#listitem'+z%5).find('#listprice2').html(good.goodlist[z].sale_num+'人付款');
    }}
}

function viewgood(item){
	console.log(item);
}