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

    for(var i = 0;i < 5;i++){
        if(i == 4){
            data[i] = decodeURI(loc.substr(n1+1,len-n1));
            put_data(data);
            break;
        }
        data[i] = decodeURI(loc.substr(n1+1,n2-n1));
        n = n2 + 1;       
    }
}

function put_data(data) {
    document.getElementById("producer_id").setAttribute("value",data[0]);
    document.getElementById("name").setAttribute("value",data[1]);
    document.getElementById("province").setAttribute("value",data[2]);
    document.getElementById("city").setAttribute("value",data[3]);
    document.getElementById("conuty").setAttribute("value",data[4]);
}

function updata_msg(){
    var list = [];
    var arr = {};
    
    arr.producer_id = document.getElementById("producer_id").value;
    arr.name = document.getElementById("name").value;
    arr.province = document.getElementById("province").value;
    arr.city = document.getElementById("city").value;
    arr.county = document.getElementById("county").value;


    console.log(arr);

    if(list.indexOf("") != -1){
        list.push(arr);
        var j = JSON.stringify(list);
        $.post('',j,function(tt){
            if(tt == 404){
                alert("服务器繁忙,请稍后再尝试！");
            }
        });
    }else{
        alert("信息不能为空!");
    }
}