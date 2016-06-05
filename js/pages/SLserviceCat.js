function convertCategory(category){
	if(category=='tvandent'){
    	return 'Tv and Entertainment';
    }
    if(category=='health'){
    	return 'Health';
    }
    if(category=='home'){
    	return 'Home';
    }
    if(category=='person'){
    	return 'Person';
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
    $("#" + findParameter("category") + "link").attr('style','pointer-events: none; cursor: default; color: #7a8188;');
    $("#SLOrientInfo").append(serviceCategory.replace("and","&amp;"));    
    $.ajax({
    	method: 'POST',
        crossDomain: true,
        data: {category: serviceCategory},
        url: 'http://www.weigroup.altervista.org/php_scripts/findSLServicesByCategory.php',
        success: function(response){
        	if(response==("\"405\"")){
				window.location.replace("404.html");
			}
        	var services = JSON.parse(response);
			for(i in services){
            	var c = Math.floor(i/4) + 1;
            	if(i!=0 && i%4==0){
                    $("#carouselInner").append('<div class="item"><ul class="thumbnails" id="slide' + c + '"></ul></div>');    
				}
            	var string = '<li class="col-sm-3"><div class="fff"><div class="thumbnail"><img src="images/slservices/' + serviceCategory.replace(/\s+/g, '').toLowerCase() + '/' + services[i].name + '_logo.png"></div><div class="caption"><h4>' + services[i].name+'</h4><p>' + services[i].slogan + '</p><a class="btn btn-info" href="slservice.html?id=' + services[i].id + '" role="button">See details</a></div></div></li>';
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