$(document).ready(devicePromotion);

function devicePromotion(){
$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findDeviceInPromo.php',
        success: function(response){
        	if(response==("\"405\"")){
				window.location.replace("404.html");
			}
            var devicesPromo = JSON.parse(response);
            for (i in devicesPromo){
                var c = Math.floor(i/4) + 1;
                if(i!=0 && i%4==0){
                    $("#carouselInner").append('<div class="item"><ul class="thumbnails" id="slide' + c + '"></ul></div>');    
				}
                var string = '<li class="col-sm-3"><div class="fff"><div class="thumbnail"><img src="images/devices/' + devicesPromo[i].category.replace(/\s+/g, '').toLowerCase() + '/' + devicesPromo[i].name + '_1.png"></div><div class="caption"><h4>' + devicesPromo[i].name+'</h4><p> <strike>' + devicesPromo[i].price + ' €</strike> ' + devicesPromo[i].discountedprice + ' €</p><a class="btn btn-info" href="device.html?id=' + devicesPromo[i].id + '" role="button">See details</a></div></div></li>';
            	$("#slide" + c).append(string);
            }
            if(c<2){
        			$("#sliderController").hide();
            }
        	
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}