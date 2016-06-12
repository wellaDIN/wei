$(document).ready(devicePromotion);

function devicePromotion(){
$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findSLServiceInPromo.php',
        success: function(response){
        	if(response==("\"405\"")){
				window.location.replace("404.html");
			}
            var servicesPromo = JSON.parse(response);
            for (i in servicesPromo){
                var c = Math.floor(i/4) + 1;
                if(i!=0 && i%4==0){
                    $("#carouselInner").append('<div class="item"><ul class="thumbnails" id="slide' + c + '"></ul></div>');    
				}
                var string = '<li class="col-sm-3" style="padding-bottom: 20px;"><div class="fff"><div class="thumbnail"><img src="images/slservices/' + servicesPromo[i].category.replace(/\s+/g, '').toLowerCase() + '/' + servicesPromo[i].name + '_logo.png"></div><div class="caption" style="text-align: center;"><h4>' + servicesPromo[i].name+'</h4><p>' + servicesPromo[i].promo + '</p><a class="btn btn-info" href="slservice.html?id=' + servicesPromo[i].id + '" role="button">See details</a></div></div></li>';
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