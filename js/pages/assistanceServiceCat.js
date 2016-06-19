function convertCategory(category){
	if(category=='lineman'){
    	return 'Line Management';
    }
    if(category=='costandpay'){
    	return 'Cost Monitoring and Payment';
    }
    if(category=='techsupp'){
    	return 'Technical Support';
    }
    if(category=='smartlife'){
    	return 'Smart Life';
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

$(document).ready(slCategory);

function slCategory(){
	var serviceCategory = convertCategory(findParameter("category"));
    if(serviceCategory == null){
			window.location.replace("404.html?id=AssServiceCatNotFound");
    }
    $("#" + findParameter("category") + "link").attr('style','pointer-events: none; cursor: default; color: #7a8188;');
	$("#ASOrientInfo").append(serviceCategory);    
    $.ajax({
    	method: 'POST',
        crossDomain: true,
        data: {category: serviceCategory},
        url: 'http://www.weigroup.altervista.org/php_scripts/findAssistanceServicesByCategory.php',
        success: function(response){
			if(response==("\"405\"")){
				window.location.replace("404.html?id=AssServicesNotFound");
			}
			var services = JSON.parse(response);
            $("#serviceList").append('<hr>');
            for (i in services){
            $("#serviceList").append('··· ' + services[i].name + ' ···<br/><a class="btn btn-warning" href="assistanceservice.html?id=' + services[i].id + '" role="button" style="padding: 1px 12px; font-size:12px">See details</a><hr>');
            
            }
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}


