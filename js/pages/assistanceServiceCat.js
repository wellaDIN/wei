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
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        data: {category: serviceCategory},
        url: 'php_scripts/findAssistanceServicesByCategory.php',
        success: function(response){
			if(response==("\"405\"")){
				window.location.replace("404.html");
			}
			var services = JSON.parse(response);
            for (i in services){
            $("#serviceList").append(services[i].name + ' <a class="btn btn-warning" href="assistanceservice.html?id=' + services[i].id + '" role="button">See details</a><br/>');
            
            }
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}