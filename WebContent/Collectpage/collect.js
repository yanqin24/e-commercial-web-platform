const LINECOUNT=3;  //一行排多少个商品
var Collect=[];

$(document).ready(function () {


    $.getJSON("http://localhost:8080/DanielWu/user/collection/",function(data){
        if(data.status==200){
            Collect=data.good_list;
        }else{
            console.log("收藏夹数据获取失败！");
        }
        Create();
    });

});

function Create() {
    var index=Collect.length;
    $("#product-item-0").show();
    for (var j=0;j<index;j++) {
        if(j%LINECOUNT==0 && j!=0){
            var ID= "product-box-"+(j/LINECOUNT);
            $("#product-box-0").clone().attr('id',ID).appendTo("#product-container");
            $('#'+ID).find('#product-item-0').attr('id',"product-item-"+j);
        }
    }

    for (var i=1;i<index;i++){
        if (i%LINECOUNT!=0){
            var ID= "product-item-"+i;
            var code=parseInt(i/LINECOUNT);
            $("#product-item-0").clone().attr('id',ID).appendTo("#product-box-"+code);
        }
    }


    if(Collect.length > 0){
        for (var x in Collect) {
            $("#product-item-"+x).find("[name='colgoodimg']").attr('src',Collect[x].img_src[0]);
            $("#product-item-"+x).find("[name='colgoodprice']").text("￥ "+Collect[x].price);
            $("#product-item-"+x).find("[name='colgoodsalenum']").text(Collect[x].access_num+"人付款");
            $("#product-item-"+x).find("[name='colgooddes']").text(Collect[x].breif_introduction);
            $("#product-item-"+x).find("[name='colgoodprodu']").text("未知");
        }
    }else{
        $("#product-item-0").hide();
    }
}


function submitmsg() {
    var name = document.getElementById("name");
    var phone_num = document.getElementById("phone_num");
    var account_num = document.getElementById("account_num");
    var gender = document.getElementsByName("gender")
    var rdVal;
    
    for(var i=0; i<gender.length;i++){
        if(gender.item(i).checked){
            rdVal = i;
            break;
        }else{
            continue;
        }
    }
   
    var list = [];
    var user = {};

    user.name = name.value;
    user.gender = gender[rdVal].value;
    user.phone_num = phone_num.value;
    user.account_num =account_num.value

    list.push(user);
    var j =JSON.stringify(list);

    console.log(j);

    $.post('',j,function(tt){
        console.log(tt);
    });
}

var imgfile;
function submitimg(){
    var formData = new FormData();
    console.log(imgfile);
    formData.append("file", imgfile);
    $.ajax({
        url: '',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (msg) {
            alert(msg);
        }
    });
}

function preview(file) {
    var prevDiv = document.getElementById('userimg');
    imgfile=file.files[0];
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            console.log(evt.target);
           // $(".imageFileInput").css("background-image","url(evt.target.result)");
            prevDiv.innerHTML = ' <input class="fileInput" type="file" onchange="preview(this)">'
                +'<img style="width: 100px; height: 100px" src="' + evt.target.result + '" />';
           // $(prevDiv).append("<img src="' + evt.target.result + '" />");
        }
        reader.readAsDataURL(file.files[0]);
    } else {
    }


}