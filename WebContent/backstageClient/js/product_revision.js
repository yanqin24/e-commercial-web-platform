$(document).ready(function(){
    var loc = location.href;
    var check = loc.indexOf("?");
    if(check != -1){
        get_msg(loc);
    }
})

function get_msg(loc){
    var len = loc.length; // url长度
    var n = 0; //起点
    var n1 = location.indexOf("=",n); //=号位置
    var n2 = location.indexOf("&",n); //&号位置
    var data = [];

    for(var i = 0;i < 9;i++){
        if(i == 8){
            data[i] = decodeURI(loc.substr(n1+1,len-n1));
            put_data(data);
            break;
        }
        data[i] = decodeURI(loc.substr(n1+1,n2-n1));
        n = n2 + 1;       
    }
}

function put_data(data) {
    document.getElementById("name").setAttribute("value",data[0]);
    document.getElementById("good_id").setAttribute("value",data[1]);
    document.getElementById("producer_id").setAttribute("value",data[2]);
    document.getElementById("price").setAttribute("value",data[3]);
    document.getElementById("breif_introduction").setAttribute("value",data[4]);
    document.getElementById("third_class").setAttribute("value",data[5]);
    document.getElementById("inventory").setAttribute("value",data[6]);
    document.getElementById("slae_num").setAttribute("value",data[7]);
    document.getElementById("introduction").setAttribute("value",data[8]);
}

function add_msg(){
    var list = [];
    var arr = {};
    
    arr.name = document.getElementById("name").value;
    arr.good_id = document.getElementById("good_id").value;
    arr.producer_id = document.getElementById("producer_id").value;
    arr.price = document.getElementById("price").value;
    arr.breif_introduction = document.getElementById("breif_introduction").value;
    arr.third_class = document.getElementById("third_class").value;
    arr.inventory = document.getElementById("inventory").value;
    arr.introduction = document.getElementById("introduction").value;
  
    console.log(arr);
    $.post('http://localhost:8080/DanielWu/admin/addgood',arr,function(tt){
        tt = JSON.parse(tt);
    	if(tt.status == 404){
            alert("服务器繁忙,请稍后再尝试！");
        }
        });
    }
