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

$(document).ready(deviceRelation);

function deviceRelation(){
	var deviceID = findParameter("id");
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findSLServiceRelatedToDevice.php',
        data: {id: deviceID},
        success: function(response){
        	if(response==("\"405\"") || response==("\"406\"")){
				return;
			}
        	var relServices = JSON.parse(response);
            for (i in relServices){
            	$("#relatedSLServiceCarousel").append('<div><div class="product"><div class="product-image"><img src="images/slservices/' + relServices[i].category.replace(/\s+/g, '').toLowerCase() + '/' + relServices[i].name + '_logo.png"/></div><div class="product-info" style="text-align: center"><h5 style="margin-top: 4px">' + relServices[i].name + '</h5><p class="product-categories"><a href="slservice.html?id=' + relServices[i].id + '" class="btn btn-primary" style="background-color: #34495e; border-color: #34495e; color: white; padding: 3px 6px" role="button">See more</a></p></div></div></div>');
            }
		},
        error: function(request, error){
			console.log(request + " : " + error);
		},
        async:false
    });
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findAssServiceRelatedToDevice.php',
        data: {id: deviceID},
        success: function(response){
        	if(response==("\"405\"") || response==("\"406\"")){
				return;
			}
            var relServices = JSON.parse(response);
            for (i in relServices){
            	$("#relatedAssistanceService").append('<div><div class="product"><div class="product-image"><img src="images/assistanceservices/' + relServices[i].category.replace(/\s+/g, '').toLowerCase() + '/' + relServices[i].name.replace(',', '').replace(':', '') + '.png"/></div><div class="product-info" style="text-align: center"><h5 style="margin-top: 4px">' + relServices[i].name + '</h5><p class="product-categories"><a href="assistanceservice.html?id=' + relServices[i].id + '" class="btn btn-primary" style="background-color: #34495e; border-color: #34495e; color: white; padding: 3px 6px" role="button">See more</a></p></div></div></div>');
            }
		},
        error: function(request, error){
			console.log(request + " : " + error);
		},
        async:false
    });        	

	
}