var producer;
var producer_id="047100";
var index;
var good;
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
       index=data.goodlist.length;
       good=data;
    });
   
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
          $('#listitem'+i).find('#listimg').attr('src',good.goodlist[i].img_src);
          $('#listitem'+i).find('#listname').html(good.goodlist[i].breif_introduction);
          $('#listitem'+i).find('#listprice').html('￥'+good.goodlist[i].price);
          $('#listitem'+i).find('#listprice2').html(good.goodlist[i].sale_num+'人付款');
       }
	  
	    
     $('#listitem').hide();
}