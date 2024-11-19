var user =[];
var product = [];


$(document).ready(function(){
    $.getJSON("/user/orderlist",function(data1){
        user = eval("("+data1+")");
    },
    "json");
    $.getJSON("/user",function(data2){
        product = eval("("+data2+")");
    },
    "json");
    $('#display1').html(each1());
    
});


function each1(){
    var html = ''; 

    html += '<div class="col-md-4"><h5>付款账户：'+user.account+'</h5>';
    html += '<h5 style="padding-top: 22%">余额：'+user.money+'</h5>';
    html += '</div><div class="col-md-8"><h5>收款方：'+product.producer_id+'</h5>';
    html += '<h3 style="padding-top: 8%;text-align: right;">应付金额:<b style="color: red">￥'+product.price+'</b></h3></div>';
    
    return html;

}


function sendyes(){

    var money = 100;
    var locationmoney = {};

    locationmoney.money = money;
    var j = JSON.stringify(locationmoney);

    window.localStorage.setItem("store",j);

    alert("支付成功");
}