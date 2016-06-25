function nameToUrl(category){
	if(category=='Tv and Entertainment'){
    	return 'tvandent';
    }
    if(category=='Health'){
    	return 'health';
    }
    if(category=='Home'){
    	return 'home';
    }
    if(category=='Person'){
    	return 'person';
    }
}

//Convert param string to jSon object
function searchToObject() {
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;
    pair = pairs[i].split("=");
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
  }

  return obj;
}

//Find the URL parameter with given id
function findParameter(id) {
	var obj = searchToObject();
    return obj[id];
}

$(document).ready(SLServiceFunction);

function SLServiceFunction(){
	var serviceID = findParameter("id");
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findSLService.php',
        data: {id: serviceID},
        success: function(response){
			var service = JSON.parse(response);
			if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html?id=SLServiceNotFound");
			}
            $("#category").attr("href", "sl_service_cat.html?category=" + nameToUrl(service.category));
            $('#category').text(service.category);
            $("#orientationInfo").append(service.name);
            $("#slservicename_title").text(service.name);
            $("#slservice_description").text(service.description);
            $("#slservice_activandrules").text(service["activ-rules"]);
            $('#slide1').css('background-image', 'url(images/slservices/'+service.category.replace(/\s/g, "").toLowerCase()+'/'+service.name.replace(/\s/g, "").toLowerCase()+'_1.png)');
            $('#slide2').css('background-image', 'url(images/slservices/'+service.category.replace(/\s/g, "").toLowerCase()+'/'+service.name.replace(/\s/g, "").toLowerCase()+'_2.png)');
            $('#slide3').css('background-image', 'url(images/slservices/'+service.category.replace(/\s/g, "").toLowerCase()+'/'+service.name.replace(/\s/g, "").toLowerCase()+'_3.png)');
            if(service.promo!=null){
            	$("#slservice_promo").html(service.promo + " (<a href=\"sl_service_promotion.html\" style=\"color: #f39c12\">Go to other promo</a>)");
			}
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
    $.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findDeviceRelatedToSLService.php',
        data: {id: serviceID},
        success: function(response){
            if(response==("\"405\"") || response==("\"406\"")){
				return;
			}
        	var relDevices = JSON.parse(response);
            var stringRelDev = "";
			for (i in relDevices){
            	stringRelDev = stringRelDev + '<br/><p style="margin-bottom: 5px"></p> <a href="device.html?id=' + relDevices[i].id + '" style="color: #f39c12">' + relDevices[i].name + '</a>';
            }
            	$("#relatedDevices").html(stringRelDev);
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}
