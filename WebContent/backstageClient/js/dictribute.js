var select1 = [];
var select2 = [];
var select3 = [];

$(document).ready(function () {
    $.getJSON("/goods/goodclass/fstclass",function(data){
        select1 = eval("("+data+")");
        $('#distribute1').each1();
    })
})

function each1(){
    for(var i = 0 ; i < select1.length ; i++) {
        distribute1.options[i] = new Option(select1[i]);
    }
}

function change1(target){
    var m = target.selectedIndex ;
    var list = [];
    var tar = {};

    tar.frist_class = select1[m];

    list.push(tar);
    var j =JSON.stringify(list);

    $.post("/goods/goodclass/sndclass",j,function(data){
        select2 = eval("("+data+")");
        $('#distribute2').each2();
    })
}

function each2(){
    for(var i = 0 ; i < select1.length ; i++) {
        distribute2.options[i] = new Option(select2[i]);
    }
}

function change2(target){
    var m = target.selectedIndex ;
    var list = [];
    var tar = {};

    tar.scond_class = select2[m];

    list.push(tar);
    var j =JSON.stringify(list);

    $.post("/goods/goodclass/trdclass",j,function(data){
        select2 = eval("("+data+")");
        $('#distribute3').each3();
    })
}

function each3(){
    for(var i = 0 ; i < select1.length ; i++) {
        distribute3.options[i] = new Option(select3[i]);
    }
}

function revision1(){
    var revision = document.getElementById("distribute1").selectedIndex;
    var new_revision = document.getElementById("newclass1").Value;
    var list = [];
    var newclass = {};
    
    revision = select1[revision];
    newclass.old_fstclass = revision;
    newclass.new_fstclass = new_revision;
    list.push(newclass);

    var j = JSON.stringify(list);

    $.post("/goods/goodclass/fstclass",list,function(){
        alert("修改成功");
    });
}

function revision2(){
    var revision = document.getElementById("distribute2").selectedIndex;
    var new_revision = document.getElementById("newclass2").Value;
    var list = [];
    var newclass = {};
    
    revision = select2[revision];
    newclass.old_sndclass = revision;
    newclass.new_sndlasss = new_revision;
    list.push(newclass);

    var j = JSON.stringify(list);

    $.post("/goods/goodclass/fstclass",list,function(){
        alert("修改成功");
    });
}

function revision3(){
    var revision = document.getElementById("distribute3").selectedIndex;
    var new_revision = document.getElementById("newclass3").Value;
    var list = [];
    var newclass = {};
    
    revision = select3[revision];
    newclass.old_trdclass = revision;
    newclass.new_trdclass = new_revision;
    list.push(newclass);

    var j = JSON.stringify(list);

    $.post("/goods/goodclass/fstclass",list,function(){
        alert("修改成功");
    });
}

function delete1(){
    var revision = document.getElementById("distribute1").selectedIndex;
    var list = [];
    var delete_class = {};

    revision = select1[revision];
    delete_class.first_class = revision;
    list.push(delete_class);

    var j = JSON.stringify(list);
    $.post("/goods/goodclass/fstclass",list,function(){
        window.location.href="../product_detail.html";
    });
}

function delete2(){
    var revision = document.getElementById("distribute1").selectedIndex;
    var list = [];
    var delete_class = {};

    revision = select1[revision];
    delete_class.second_class = revision;
    list.push(delete_class);

    var j = JSON.stringify(list);
    $.post("/goods/goodclass/fstclass",list,function(){
        window.location.href="../product_detail.html";
    });
}

function delete3(){
    var revision = document.getElementById("distribute1").selectedIndex;
    var list = [];
    var delete_class = {};

    revision = select1[revision];
    delete_class.third_class = revision;
    list.push(delete_class);

    var j = JSON.stringify(list);
    $.post("/goods/goodclass/fstclass",list,function(){
        window.location.href="../product_detail.html";
    });
}

