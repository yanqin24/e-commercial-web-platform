//订单有三种状态：已发货 未发货 已完成

var Finished=[];
var Shipped=[];
var UnShipped=[];
var Price={
    all:0.0,
    finished:0.0,
    shipped:0.0,
    unshipped:0.0
};


$(document).ready(function(){

    //顶部Tab切换
    $('#OrderTab a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');


    });

    $('')

    //获取用户所有订单信息 并且 处理数据
    $.getJSON("http://localhost:8080/DanielWu/user/orderlist",function(data) {
        console.log(data);
        for (var j = 0; j < data.order_list.length; j++) {
            var tempPrice=0.0;
            var index =data.order_list[j];
            var temp={
                order_id:index.order_id,
                order_time:index.order_time,
                address:index.address,
                cellphone:index.cellphone,
                goodlist:index.goodlist,
                deliver_name:index.deliver_name,
                status:index.status
            };
            if(data.order_list[j].status=="已发货"){
                for(var i in temp.goodlist){
                    tempPrice+=temp.goodlist[i].good.price * temp.goodlist[i].amount;
                }
                Price.shipped+=tempPrice;
                Shipped.push(temp);
            }else if(data.order_list[j].status=="待发货"){
                for(var i in temp.goodlist){
                    tempPrice+=temp.goodlist[i].good.price * temp.goodlist[i].amount;
                }
                Price.unshipped+=tempPrice;
                UnShipped.push(temp);
            }else if(data.order_list[j].status=="已完成"){
                for(var i in temp.goodlist){
                    tempPrice+=temp.goodlist[i].good.price * temp.goodlist[i].amount;
                }
                Price.finished+=tempPrice;
                Finished.push(temp);
            }
        }

        Price.all=Price.finished+Price.unshipped+Price.shipped;
        //渲染
        document.getElementById('total_price_all_order').innerHTML="￥"+Price.all;
        document.getElementById('total_price_finished').innerHTML="￥"+Price.finished;
        document.getElementById('total_price_shipped').innerHTML="￥"+Price.shipped;
        document.getElementById('total_price_unshipped').innerHTML="￥"+Price.unshipped;


        console.log(Finished);
        console.log(Shipped);
        console.log(UnShipped);

        document.getElementById('finished').insertAdjacentHTML("beforeEnd",ShowFinished());
        document.getElementById('shipped').insertAdjacentHTML("beforeEnd",ShowShipped());
        document.getElementById('unshipped').insertAdjacentHTML("beforeEnd",ShowUnShipped());
        document.getElementById('all_order').insertAdjacentHTML("beforeEnd",ShowFinished()+ShowShipped()+ShowUnShipped());


    });

});


function ShowShipped() {
    if(Shipped.length>0){
        var Html="";
        for (var i in Shipped) {
            Html +="<div class=\"col-xs-12\" style=\"padding:0;margin-top:10px;border:1px solid #cdcdcd;\">\n" +
                "<div class=\"order-head\">" +
                "<text class=\"col-xs-6\">订单号:"+Shipped[i].order_id+" "+Shipped[i].order_time+"</text>" +
                "<text class=\"col-xs-6\">"+Shipped[i].status+"</text></div>";

            for(var j in Shipped[i].goodlist){
                var good=Shipped[i].goodlist[j].good;
                Html +="<div  class=\"row col-xs-12\" class=\"order-item\" style=\"border-top:1px dashed #cdcdcd;margin-left: 0;padding-top: 20px;padding-bottom: 10px;\">\n" +
                    "<div class=\"col-xs-2\">\n" +
                    "  <input type=\"checkbox\" name=\"select\" value=\"select\" checked=\"checked\">\n" +
                    "  <img src=\""+good.img_src+"\" alt=\"\" style=\"width: 70px;height: 70px\">\n" +
                    "</div>\n" +
                    "<div class=\"col-xs-2\">\n" + good.breif_introduction + "</div>\n" +
                    "<div class=\"col-xs-2\">￥" +good.price+ "</div>\n" +
                    "<div class=\"col-xs-2\">\n" + "<div >\n" +
                    "<p>数量："+Shipped[i].goodlist[j].amount+"</p>\n" + "</div>\n" +
                    "</div>\n" +
                    "<div class=\"col-xs-2\">\n" +
                     // "四川省 成都市 双流区\n" +
                    "</div>\n" +
                    "<div class=\"col-xs-2\" style=\"display: flex;flex-direction: column;align-items: center\">\n" +
                    "<text id=\"shipped_"+j+"\" style=\"margin-bottom:5px;background: none;width: 65px;height: 25px;line-height: 25px;text-align: center\">已发货</text>\n" +
                    "<button id=\"shipped_check"+j+"\" style=\"margin-bottom:5px;background: none;border: 0px\">查看订单</button>\n" +
                    // "<button id=\"shipped_cancel"+j+"\" style=\"margin-bottom:5px;background: none;border: 0px\">取消订单</button>\n" +
                    "</div>\n" +
                    "</div>\n";
            }
            Html +="</div>";
        }
        return Html;
    }else
        return "";
}

function ShowUnShipped() {
    if(UnShipped.length>0){
        var Html="";
        for (var i in UnShipped) {
            Html +="<div class=\"col-xs-12\" style=\"padding:0;margin-top:10px;border:1px solid #cdcdcd;\">\n" +
                "                            <div class=\"order-head\">\n" +
                "                                <text class=\"col-xs-6\">订单号:"+UnShipped[i].order_id+" "+UnShipped[i].order_time+"</text>\n" +
                "                                <text class=\"col-xs-6\">"+UnShipped[i].status+"</text>\n" +
                "                            </div>";

            for(var j in UnShipped[i].goodlist){
                var good=UnShipped[i].goodlist[j].good;
                Html +="                            <div  class=\"row col-xs-12\" class=\"order-item\" style=\"border-top:1px dashed #cdcdcd;margin-left: 0;padding-top: 20px;padding-bottom: 10px;\">\n" +
                    "                                <div class=\"col-xs-2\">\n" +
                    "                                    <input type=\"checkbox\" name=\"select\" value=\"select\" checked=\"checked\">\n" +
                    "                                    <img src=\""+good.img_src+"\" alt=\"\" style=\"width: 70px;height: 70px\">\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">\n" + good.breif_introduction +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">￥" +good.price+
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">\n" +
                    "                                    <div >\n" +
                    "                                        <p>数量："+UnShipped[i].goodlist[j].amount+"</p>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">\n" +
                    // "                                    四川省 成都市 双流区\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\" style=\"display: flex;flex-direction: column;align-items: center\">\n" +
                    "                                    <text id=\"unshipped_"+j+"\" style=\"margin-bottom:5px;background: none;width: 65px;height: 25px;line-height: 25px;text-align: center\">未发货</text>\n" +
                    "                                    <button id=\"unshipped_check"+j+"\" style=\"margin-bottom:5px;background: none;border: 0px\">查看订单</button>\n" +
                    // "                                    <button id=\"unshipped_cancel"+j+"\" style=\"margin-bottom:5px;background: none;border: 0px\">取消订单</button>\n" +
                    "                                </div>\n" +
                    "                            </div>\n";

            }
            Html +="</div>";
        }
        return Html;
    }else
        return "";
};



function ShowFinished() {
    if(Finished.length>0){
        var Html="";
        for (var i in Finished) {
            Html +="<div class=\"col-xs-12\" style=\"padding:0;margin-top:10px;border:1px solid #cdcdcd;\">\n" +
                "                            <div class=\"order-head\">\n" +
                "                                <text class=\"col-xs-6\">订单号:"+Finished[i].order_id+" "+Finished[i].order_time+"</text>\n" +
                "                                <text class=\"col-xs-6\">"+Finished[i].status+"</text>\n" +
                "                            </div>";

            for(var j in Finished[i].goodlist){
                var good=Finished[i].goodlist[j].good;
                Html +="                            <div  class=\"row col-xs-12\" class=\"order-item\" style=\"border-top:1px dashed #cdcdcd;margin-left: 0;padding-top: 20px;padding-bottom: 10px;\">\n" +
                    "                                <div class=\"col-xs-2\">\n" +
                    "                                    <input type=\"checkbox\" name=\"select\" value=\"select\" checked=\"checked\">\n" +
                    "                                    <img src=\""+good.img_src+"\" alt=\"\" style=\"width: 70px;height: 70px\">\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">\n" + good.breif_introduction +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">￥" +good.price+
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">\n" +
                    "                                    <div >\n" +
                    "                                        <p>数量："+Finished[i].goodlist[j].amount+"</p>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\">\n" +
                    // "                                    四川省 成都市 双流区\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-xs-2\" style=\"display: flex;flex-direction: column;align-items: center\">\n" +
                    "                                    <text id=\"finished_"+j+"\" style=\"margin-bottom:5px;background: none;width: 65px;height: 25px;line-height: 25px;text-align: center\">已完成</text>\n" +
                    "                                    <button id=\"finished_check"+j+"\" style=\"margin-bottom:5px;background: none;border: 0px\">查看订单</button>\n" +
                    // "                                    <button id=\"finished_cancel"+j+"\" style=\"margin-bottom:5px;background: none;border: 0px\">取消订单</button>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" ;

            }
            Html +="</div>";
        }
        return Html;
    }else
        return "";
}
