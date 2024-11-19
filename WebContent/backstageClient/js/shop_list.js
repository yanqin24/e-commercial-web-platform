$(document).ready(function(){
    $.getJSON("http://localhost:8080/DanielWu/admin/producer",function(data){
        $('#display').html(each(data))
    },
    "json");
})

function each(data){
    var html = ''; 
    var obj = data.producers;

    html += '<tr><th>门店编号</th><th>门店名称</th><th>所在省份</th>';
    html += '<th>所在城市</th><th>所在区</th><th>操作</th></tr><tr>';
    
    for (var i = 0;i < obj.length;i++){
        html += '<td>'+obj[i].producer_id+'</td><td class="center">'+obj[i].name+'</td><td class="center">'+obj[i].province+'</td>';
        html += '<td class="center">'+obj[i].city+'</td><td class="center">'+obj[i].county+'</td><td class="center">';
        html += '<a href="shop_show.html?producer_id='+obj[i].producer_id+'" title="查看" class="link_icon" >&#118;</a>';
        html += '<a href="shop_revision.html?producer_id='+obj[i].producer_id+'&name='+obj[i].name+'&province='+obj[i].province+'&city='+obj[i].city+'&county='+obj[i].county+'" title="编辑" class="link_icon">&#47;</a>';
        html += '<button  title="删除" style="border:none" class="link_icon" id="'+obj[i].producer_id+'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';
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
    var index_msg = document.getElementById("search_shop").value;
    var html = "";

    html += '<tr><th>门店编号</th><th>门店名称</th><th>所在省份</th>';
    html += '<th>所在城市</th><th>所在区</th><th>操作</th></tr><tr>';
    
    for (var i = 0;i < data.length;i++){
        if(data[i].producer_id == index_msg){
            html += '<td>'+obj[i].producer_id+'</td><td class="center">'+obj[i].name+'</td><td class="center">'+obj[i].province+'</td>';
            html += '<td class="center">'+obj[i].city+'</td><td class="center">'+obj[i].county+'</td><td class="center">';
            html += '<a href="shop_show.html?producer_id='+obj[i].producer_id+'" title="查看" class="link_icon" >&#118;</a>';
            html += '<a href="shop_revision.html?producer_id='+obj[i].producer_id+'&name='+obj[i].name+'&province='+obj[i].province+'&city='+obj[i].city+'&county='+obj[i].county+'" title="编辑" class="link_icon">&#47;</a>';
            html += '<button  title="删除" style="border:none" class="link_icon" id="'+obj[i].producer_id+'" onclick="deleteproduct(id)" >&#100;</button></td></tr>';
        }
    }
    return html;
}


function deleteshop(id){
    var list=[];
    var arr = {};

    arr.producer_id = id;
           
    list.push(arr);
    var j = JSON.stringify(list);

    $.post(" ",j);
}
