$(document).ready(function(){
    var loc = location.href;
    var check = loc.indexOf("?");
    if(check != -1){
        get_msg(loc);
    }
})

$(document).ready(function(){
    $.getJSON("",function(data){
        $('#display').html(each(data))
    },
    "json");
})

var producerid = 0;

function get_msg(loc){
    var len = loc.length; // url长度
    var n1 = location.indexOf("="); //=号位置

    producerid = decodeURI(loc.substr(n1+1,len-n1));      
}

function each(data){
    var html = ''; 
    
    html += '<tr><th>缩略图</th><th>产品名称</th><th>货号</th><th>门店号</th><th>单价</th>';
    html += '<th>介绍</th><th>分类</th><th>库存</th><th>已售</th><th>备注</th><th>操作</th></tr><tr>';
    
    for (var i = 0;i < data.length;i++){
        if(data[i].producer_id == producerid){
            html += '<td class="center"><img src="'+data[i].src+'" width="50" height="50"/></td>';
            html += '<td>'+data[i].name+'</td><td class="center">'+data[i].good_id+'</td><td class="center">'+data[i].producer_id+'</td>';
            html += '<td class="center"><strong class="rmb_icon">'+data[i].price+'</strong></td>';
            html += '<td class="center">'+data[i].breif_introduction+'</td><td class="center">'+data[i].third_class+'</td>';
            html += '<td class="center">'+data[i].inventory+'</td><td class="center">'+data[i].slae_num+'</td>';
            html += '<td class="center">'+data[i].introduction+'</td><td class="center">';
            html += '<a href="product_revision.html?';
            html += 'name='+data[i].name+'&good_id='+data[i].good_id+'&producer_id='+data[i].producer_id+'&price='+data[i].price+'&breif_introduction='+data[i].breif_introduction+'&third_class='+data[i].third_class+'&inventory='+data[i].inventory+'&slae_num='+data[i].slae_num+'&introduction='+data[i].introduction+'"';
            html += 'title="编辑" class="link_icon">&#101;</a>';
            html += '<button  title="删除" style="border:none" class="link_icon" id="'+data[i].good_id+'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';
        }
    }
    return html;
}
    
function search() {
    $.getJSON("/goods/goodlist",function(data){
        $('#display').html(searchmsg(data))
    },
    "json");
}
    
function searchmsg(data) {
    var index_msg = document.getElementById("search_product").value;
    var html = "";
    var reg = new RegExp(index_msg);

    html += '<tr><th>缩略图</th><th>产品名称</th><th>货号</th><th>单价</th>';
    html += '<th>介绍</th><th>分类</th><th>库存</th><th>已售</th><th>备注</th><th>操作</th></tr><tr>';
    
    for (var i = 0;i < data.length;i++){
        if(data[i].good_id == index_msg||data[i].producer_id == producerid){
            html += '<td class="center"><img src="'+data[i].src+'" width="50" height="50"/></td>';
            html += '<td>'+data[i].name+'</td><td class="center">'+data[i].good_id+'</td><td class="center">'+data[i].producer_id+'</td>';
            html += '<td class="center"><strong class="rmb_icon">'+data[i].price+'</strong></td>';
            html += '<td class="center">'+data[i].breif_introduction+'</td><td class="center">'+data[i].third_class+'</td>';
            html += '<td class="center">'+data[i].inventory+'</td><td class="center">'+data[i].slae_num+'</td>';
            html += '<a href="product_revision.html?';
            html += 'name='+data[i].name+'&good_id='+data[i].good_id+'&producer_id='+data[i].producer_id+'&price='+data[i].price+'&breif_introduction='+data[i].breif_introduction+'&third_class='+data[i].third_class+'&inventory='+data[i].inventory+'&slae_num='+data[i].slae_num+'&introduction='+data[i].introduction+'"';
            html += 'title="编辑" class="link_icon">&#101;</a>';
            html += '<button  title="删除" style="border:none" class="link_icon" id="'+data[i].good_id+'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';
        }else if(data[i].name.match(reg)||data[i].producer_id == producerid){
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
    return html;
}


function deleteproduct(id){
    var list=[];
    var arr = {};

    arr.good_id = id;
    arr.producer_id = producerid;
    
    list.push(arr);
    var j = JSON.stringify(list);

    $.post(" ",j);
}
