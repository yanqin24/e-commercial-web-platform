$(document).ready(function(){
    $('#recorder').hover(function() {
        $("#show").css('display', 'block');
    }, function() {
        $("#show").css('display', 'none');
    });

    $('#show').hover(function() {
        $(this).css('display', 'block');
    }, function() {
        $(this).css('display', 'none');
    });

    $.getJSON("http://localhost:8080/DanielWu/user/getuserinfo",function(msg){

		if(msg == 404)
			alert("请先登录");
		else
			{
				$("#loginInfo").hide();
				console.log(msg.user.cellphone);
				$("#loginedInfo").show();
				$("#user_idinfo").html(msg.user.cellphone);
			}
		
		
	});

    $.getJSON("http://localhost:8080/DanielWu/goods/goodlist",function(result){
        /*$.each(result, function(i, field){
          //  jsoon=field.parse();
            console.log(field);
        }*/
        //'../good_img/'+result[i-1].good_id+ '.jpg'
        console.log(result);
        for(var i=1; i<17; i++)
        {
            var id='newProduct-'+i;
            $("#"+id).find('a').attr('href', 'http://localhost:8080/DanielWu/ProductDetail/ProductDetail.html?id='+result[i-1][0].good_id);
            $("#"+id).find('img').attr('src', '../good_img/'+result[i-1][0].good_id+ '.jpg');
            $("#"+id).find('text').text(result[i-1][0].name);
            $("#"+id).find('p').text('￥'+result[i-1][0].price);
        }

     /*    for(var i=1; i<7; i++)
        {
            var id1='reclistimg2'+i;
            var id2='reclistname2'+i;
            var id3='reclistprice2'+i;
            $("#"+id1).attr('src', '../good_img/'+result[6+i-1][0].good_id+ '.jpg');
            $("#"+id2).text(result[6+i-1][0].name);
            $("#"+id3).text('￥'+result[6+i-1][0].price);
        }
 */
        
       /* for(var i=1; i<7; i++)
        {
           $('#box1'+i).click(function () {

           });
        }
*/
   /*     $("#reclistimg11").attr('src', '../good_img/'+result[0].good_id+ '.jpg');
        $("#reclistname11").text(result[0].name);
        $("#reclistprice11").text(result[0].good_id);*/

});
})
function search(){
	var desc = $("#good_description").val();
	window.location.href = "../SearchPage/search.html?description="+desc;
}
function showson(item){
    console.log(item.innerText);
    var href="http://localhost:8080/DanielWu/SearchPage/search.html?kind=";
     location.href=href+encodeURI(item.innerText);
    //window.location.href="../SearchPage/search.html";
}

function gotocart()
{
    window.location.href="http://localhost:8080/DanielWu/shoppcart/shoppingcart.html";
}