$(document).ready(function(){
    $.getJSON("http://localhost:8080/DanielWu/goods/goodlist",function(data){
        $('#display').html(each(data))
    },
    "json");
})
    
function each(data){
    var html = ''; 
    
    html += '<tr><th>缩略图</th><th>产品名称</th><th>货号</th><th>门店号</th><th>单价</th>';
    html += '<th>介绍</th><th>分类</th><th>库存</th><th>已售</th><th>备注</th><th>操作</th></tr><tr>';
    
    for (var i = 0;i < data.length;i++){
    	for(var j=0;j<data[i].length;j++){
        html += '<td class="center"><img src="'+data[i][j].src+'" width="50" height="50"/></td>';
        html += '<td>'+data[i][j].name+'</td><td class="center">'+data[i][j].good_id+'</td><td class="center">'+data[i][j].producer_id+'</td>';
        html += '<td class="center"><strong class="rmb_icon">'+data[i][j].price+'</strong></td>';
        html += '<td class="center">'+data[i][j].breif_introduction+'</td><td class="center">'+data[i][j].third_class+'</td>';
        html += '<td class="center">'+data[i][j].inventory+'</td><td class="center">'+data[i][j].sale_num+'</td>';
        html += '<td class="center">'+data[i][j].introduction+'</td><td class="center">';
        html += '<a href="product_revision.html?';
        html += 'name='+data[i][j].name+'&good_id='+data[i][j].good_id+'&producer_id='+data[i][j].producer_id+'&price='+data[i][j].price+'&breif_introduction='+data[i][j].breif_introduction+'&third_class='+data[i][j].third_class+'&inventory='+data[i][j].inventory+'&slae_num='+data[i][j].slae_num+'&introduction='+data[i][j].introduction+'"';
        html += 'title="编辑" class="link_icon">&#101;</a>';
        html += '<button  title="删除" style="border:none" class="link_icon" id="'+data[i][j].good_id+"_"+data[i][j].producer_id+'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';
    }
  }
    return html;
}
    
function search() {
	var good_id = $("#search_product").val();
    $.getJSON("http://localhost:8080/DanielWu/admin/searchgood?good_id=" + good_id,function(data){
    	$('#display').html(searchmsg(data))
    	
    	
    },
    "json");
}
    
function searchmsg(data) {
    var index_msg = document.getElementById("search_product").value;
    var html = "";
    var reg = new RegExp(index_msg);

    html += '<tr><th>缩略图</th><th>产品名称</th><th>货号</th><th>门店号</th><th>单价</th>';
    html += '<th>介绍</th><th>分类</th><th>库存</th><th>已售</th><th>备注</th><th>操作</th></tr><tr>';
   
    data = data.goodlist;
    console.log(data);
    if(data!=null){
    for (var i = 0;i < data.length;i++){
        if(data[i].good_id == index_msg){
        	 html += '<td class="center"><img src="'+data[i].img_src[0]+'" width="50" height="50"/></td>';
             html += '<td>'+data[i].name+'</td><td class="center">'+data[i].good_id+'</td><td class="center">'+data[i].producer_id+'</td>';
             html += '<td class="center"><strong class="rmb_icon">'+data[i].price+'</strong></td>';
             html += '<td class="center">'+data[i].breif_introduction+'</td><td class="center">'+data[i].third_class+'</td>';
             html += '<td class="center">'+data[i].inventory+'</td><td class="center">'+data[i].sale_num+'</td>';
             html += '<td class="center">'+data[i].introduction+'</td><td class="center">';
             html += '<a href="product_revision.html?';
             html += 'name='+data[i].name+'&good_id='+data[i].good_id+'&producer_id='+data[i].producer_id+'&price='+data[i].price+'&breif_introduction='+data[i].breif_introduction+'&third_class='+data[i].third_class+'&inventory='+data[i].inventory+'&slae_num='+data[i].slae_num+'&introduction='+data[i].introduction+'"';
             html += 'title="编辑" class="link_icon">&#101;</a>';
             html += '<button  title="删除" style="border:none" class="link_icon" id="'+data[i].good_id+"_" +data[i].producer_id +'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';
           /* html += '<td class="center"><img src="'+data[i].img_src[0]+'" width="50" height="50"/></td>';
            html += '<td>'+data[i].name+'</td><td class="center">'+data[i].good_id+'</td><td class="center"><strong class="rmb_icon">'+data[i].price+'</strong></td>';
            html += '<td class="center">'+data[i].breif_introduction+'</td>';
            html += '<td class="center">'+data[i].third_class+'</td><td class="center">'+data[i].inventory+'</td>';
            html += '<td class="center">'+data[i].sale_num+'</td><td class="center">'+data[i].producer_id+'</td><td class="center">';
            html += '<a href="product_revision.html?';
            html += 'name='+data[i].name+'&good_id='+data[i].good_id+'&producer_id='+data[i].producer_id+'&price='+data[i].price+'&breif_introduction='+data[i].breif_introduction+'&third_class='+data[i].third_class+'&inventory='+data[i].inventory+'&slae_num='+data[i].slae_num+'&introduction='+data[i].introduction+'"';
            html += 'title="编辑" class="link_icon">&#101;</a>';
            html += '<button  title="删除" style="border:none" class="link_icon" id="'+data[i].good_id+'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';*/
        }else if(data[i].name.match(reg)){
            html += '<td class="center"><img src="'+data[i].src+'" width="50" height="50"/></td>';
            html += '<td>'+data[i].name+'</td><td class="center">'+data[i].good_id+'</td>';
            html += '<td class="center"><strong class="rmb_icon">'+data[i].price+'</strong></td>';
            html += '<td class="center">'+data[i].breif_introduction+'</td><td class="center">'+data[i].third_class+'</td>';
            html += '<td class="center">'+data[i].inventory+'</td><td class="center">'+data[i].slae_num+'</td>';
            html += '<a href="product_revision.html?';
            html += 'name='+data[i].name+'&good_id='+data[i].good_id+'&producer_id='+data[i].producer_id+'&price='+data[i].price+'&breif_introduction='+data[i].breif_introduction+'&third_class='+data[i].third_class+'&inventory='+data[i].inventory+'&slae_num='+data[i].slae_num+'&introduction='+data[i].introduction+'"';
            html += 'title="编辑" class="link_icon">&#101;</a>';
            html += '<button  title="删除" style="border:none" class="link_icon" id="'+data[i].good_id+'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';
        }
    }
   }else{
	   alert("未找到该商品");
   }
    return html;
}


function deleteproduct(id){
	var list = id.split("_");
	var producer_id;
	var good_id;
	if(list.length==2)
	{
		good_id= list[0];
		 producer_id= list[1];
	}
	
    $.getJSON("http://localhost:8080/DanielWu/admin/deletegood?good_id="+good_id + "&producer_id=" + producer_id,function(data){
        data = JSON.parse(data);
        if(data.status==200){
        	alert("删除成功");
        	window.location.reload();
        }if(data.status==400)
        	{
        		alert("删除失败");
        	}
    },
    "json");
}

function deletepro(id,data){
    var list=[];
    var arr = {};

    for (var i = 0;i < data.length;i++){
        if(data[i].good_id == id){
            var producer_id = data[i].producer_id;
            break;
        }
    }
    arr.good_id = id;
    arr.producer_id = producer_id;
           
    list.push(arr);
    var j = JSON.stringify(list);

    $.post(" ",j);
}