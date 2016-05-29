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
        url: 'php_scripts/findSLService.php',
        data: {id: serviceID},
        success: function(response){
			var service = JSON.parse(response);
			if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
            $("#slservice_description").text(service.description);
            $("#slservice_activandrules").text(service["activ-rules"]);
            if(service.promo!=null){
            	$("#slservice_promo").html(service.promo + " (<a href=\"#\">Go to other promo</a>)");
			}
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
    $.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findDeviceRelatedToSLService.php',
        data: {id: serviceID},
        success: function(response){
        	var relDevices = JSON.parse(response);
            var stringRelDev = "";
			for (i in relDevices){
            	stringRelDev = stringRelDev + '<br/> <a href="device.html?id=' + relDevices[i].id + '">' + relDevices[i].name + '</a>';
            }
            	$("#relatedDevices").html(stringRelDev);
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}
