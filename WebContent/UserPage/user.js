var obj = [];
var m = 0;

$(document).ready(function(){
	$.ajaxSettings.async = false;
    $.getJSON("http://localhost:8080/DanielWu/user/getuserinfo",function(data){
            console.log(5);
            obj = data.user;
        },
        "json");

    $('#display-1').html(each1());
    $('#display-2').html(each2());
})

$(document).ready(function(){
    // var loc=location.href;
    // var n1=loc.length;
    // var n2=loc.indexOf("=");
    // var id=decodeURI(loc.substr(n2+1, n1-n2));

    // if(n2 < 0 ){
    //     m = 0;
    //     console.log(-1);
    // }else{
    //     m = id;
    //     console.log(0);
    // }
    var j = window.localStorage.getItem("store");

    console.log(j);
    var json = JSON.parse(j);

    console.log(json);

    if(json!=""){
        //m = json.user.money;
    }	

});

function each1(){
    var html = "";

    html +='<div style="height: 30px"> </div><label  >用户名：</label><text id="name">'+obj.name+'</text>';
    html +='<div style="height: 30px"> </div><label >年龄：</label><text id="age">'+obj.age+'</text>';
    html +='<div style="height: 30px"> </div><label>性别：</label><text id="gender">'+obj.gender+'</text>';
    html +='<div style="height: 30px"> </div><label >邮箱：</label><text id="email">'+obj.email+'</text>';

    return html;
}


function each2(){
    var html = "";
    var totalmoney = obj.money - m;

    if(totalmoney < 0){
        alert("您已欠"+totalmoney+"元！");
    }
    html +='<div style="height: 30px"> </div><label >联系电话：</label><text id="cellphone">'+obj.cellphone+'</text>';
    html +='<div style="height: 30px"> </div><label >收货地址：</label><text id="address">'+obj.address+'</text>';
   // html +='<div style="height: 30px"> </div><label >银行卡号：</label><text id="account">'+obj.account+'</text>';
    html +=' <div style="height: 30px"> </div><label >余额：</label><text id="money">'+totalmoney+'</text>';

    return html;
}
