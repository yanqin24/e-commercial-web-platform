$(document).ready(function(){
    $.getJSON("http://localhost:8080/DanielWu/admin/orderlist",function(data){
        $('#display').html(each(data))
    },
    "json");
})

function each(data){
    var html = ''; 
    var obj = data.orderlist;

    html += '<tr><th>商品编号</th><th>联系电话</th><th>下单时间</th><th>发货';
    html += '状态</th><th>收获地址</th><th>快递公司</th><th>操作</th></tr>';

    for (var i = 0;i < obj.length;i++){
        html += '<tr><td class="center">'+obj[i].order_id+'</td>';
        html += '<td>'+obj[i].cellphone+'</td><td>'+obj[i].order_time+'</td><td>';
        html += '<address>'+obj[i].status+'</address>';
        html += '</td><td class="center">'+obj[i].address+'</td>';
        html += '<td class="center">'+obj[i].deliver_name+'</td><td class="center">';
        html += '<button  title="删除" style="border:none" class="link_icon" id="'+obj[i].order_id+'" onclick="deleteorder(id)" >&#100;</button></td></tr>';
    }
    return html;
}

function search() {
    $.getJSON("https://oss.caoyu.online/basic/orderlist.json",function(data){
        $('#display').html(searchmsg(data))
    },

    "json");
}

function searchmsg(data) {
    var index_msg = document.getElementById("search_order").value;
    var obj = data.order_list;
    var html = "";

    html += '<tr><th>商品编号</th><th>联系电话</th><th>下单时间</th><th>发货';
    html += '状态</th><th>收获地址</th><th>快递公司</th><th>操作</th></tr>';

    for (var i = 0;i < obj.length;i++){
        if(obj[i].order_id == index_msg){
            html += '<tr><td class="center">'+obj[i].order_id+'</td>';
            html += '<td>'+obj[i].cellphone+'</td><td>'+obj[i].order_time+'</td><td>';
            html += '<address>'+obj[i].status+'</address>';
            html += '</td><td class="center">'+obj[i].address+'</td>';
            html += '<td class="center">'+obj[i].deliver_name+'</td><td class="center">';
            html += '<button  title="删除" style="border:none" class="link_icon" id="'+obj[i].order_id+"_"+obj[i].producer_id+'" onclick="deleteorder(id)" >&#100;</button></td></tr>';
        }   
    }
    return html;
}

function deleteorder(id){

    $.getJSON("http://localhost:8080/DanielWu/admin/deleteorder?order_id="+id,function(tt){
    	
    	if(tt.status==200)
    		{
    			alert("删除订单成功");
    			window.location.reload();
    		}
    	if(tt.status==400)
    		{
    			alert("删除失败");
    		}
    },
    "json");
}

function delete_order(data,id){
    var good = id;
    var obj = data.orderlist;
    
    for(var i = 0;i < obj.length;i++){



        if(obj[i].good_id == good){
            var list=[];
            var arr = {};

            arr.good_id = good;
            arr.producer_id = obj[i].producer_id;

            list.push(arr);
            var j = JSON.stringify(list);

            $.post("http://localhost:8080/DanielWu/admin/deleteorder",arr,function(tt){
            	
            });
        }
    }
}