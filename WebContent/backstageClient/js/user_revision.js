$(document).ready(function(){
    var loc = location.href;
    var check = loc.indexof("?");
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

    for(var i = 0;i < 7;i++){
        if(i == 6){
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
    document.getElementById("cellphone").setAttribute("value",data[1]);
    document.getElementById("email").setAttribute("value",data[2]);
    document.getElementById("age").setAttribute("value",data[3]);
    document.getElementById("gender").setAttribute("value",data[4]);
    document.getElementById("money").setAttribute("value",data[5]);
    document.getElementById("address").setAttribute("value",data[6]);
}

function updata_msg(){
    var list = [];
    var arr = {};
    
    arr.name = document.getElementById("name").value;
    arr.cellphone = document.getElementById("cellphone").value;
    arr.email = document.getElementById("email").value;
    arr.age = document.getElementById("age").value;
    arr.gender = document.getElementById("gender").value;
    arr.money = document.getElementById("money").value;
    arr.address = document.getElementById("address").value;

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