function hideScrollbar(){
	var parents = document.getElementsByClassName('container1');
	var childs = document.getElementsByClassName('container2');
	var size = Object.keys(childs).length;
	for(i=0;i<size;i++){
		var parent = parents[i];
    	var child = childs[i];
		var number = child.offsetWidth - child.clientWidth + 2;
    	number = number + "px";
		child.style.paddingRight = number;
		child.style.marginTop = number;
		child.style.marginRight = "-" + number;
		child.style.marginLeft = number;
		child.style.margiBottom = number;
	}
}

function nameToUrl(category){
	if(category=='Line Management'){
    	return 'lineman';
    }
    if(category=='Cost Monitoring and Payment'){
    	return 'costandpay';
    }
    if(category=='Technical Support'){
    	return 'techsupp';
    }
    if(category=='Smart Life'){
    	return 'smartlife';
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

$(document).ready(AssistanceServiceFunction);

function AssistanceServiceFunction(){
	var serviceID = findParameter("id");
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findAssistanceService.php',
        data: {id: serviceID},
        success: function(response){
        	if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html?id=serviceNotFound");
			}
			var service = JSON.parse(response);
            var service_name = service.name;
            var service_category = service.category;
            var service_description = service.description;
            if(service.highlight!=0){
            	service_description = service_description + '<br><br> This is one of our highlights, the most frequently asked assistance services. <a href="highlights.html" style="padding: 1px 12px; font-size:9px" class="btn btn-warning" role="button">Go To Highlights</a>';
            }
            $("#description").html(service_description);
            $("#category").attr("href", "assistance_service_cat.html?category=" + nameToUrl(service_category));
            $('#category').text(service_category);
            $("#orientationInfo").append(service_name);
			var tabs = JSON.parse(service.body).tabs;
            for (i in tabs){
            	//Create a left tab with the tab category name;
                if(i==0){
                	$("#active-tab").text(tabs[i].tab_category);
                } else {
                    $("#tab-left-list").append('<a href="#" class="list-group-item text-center">' + tabs[i].tab_category + '</a>');
                }
             	//Create the content of the right tab
                if(i==0){
                	tab_body = tabs[0].body;
                    var string = '<div class="container2" style="height: 350px">';
                    for(j in tab_body){
                    	string = string + '<h3 style="margin-top: 0; margin-right:16px; color: #428bca">' + tab_body[j].question + '</h3>';
                        string = string + '<h5 style="text-align:justify;margin-right:16px">' + tab_body[j].answer + '</h4>';
                    }
                    string = string + '<br><br></div>';
                    $("#active-tab-content").html(string);
                } else {
					tab_body = tabs[i].body;
                    var string = '<div class="bhoechie-tab-content container1"><div class="container2" style="height: 350px">';
                	for (j in tab_body) {
                    	string = string + '<h3 style="margin-top: 0; margin-right:16px; color: #428bca">' + tab_body[j].question + '</h3>';
                        string = string + '<h5 style="text-align:justify;margin-right:16px">' + tab_body[j].answer + '</h5>';
                 	}
                    string = string + '<br><br></div></div>';
                    $("#tab-contents-div").append(string);
            	}   
            }
            $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        		e.preventDefault();
        		$(this).siblings('a.active').removeClass("active");
        		$(this).addClass("active");
        		var index = $(this).index();
        		$("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        		$("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
                hideScrollbar();
    		});
			if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
            hideScrollbar();
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
    $.ajax({
    	method: 'POST',
        crossDomain: true,
        data: {id: serviceID},
        url: 'http://www.weigroup.altervista.org/php_scripts/findDeviceRelatedToAssService.php',
        success: function(response){
			if(response==("\"405\"")){
            	alert('There are no related devices. Check the database');
			}
			var relDevices = JSON.parse(response);
            for (i in relDevices){
            	$("#relatedDevice").append('<div class="product"><div class="product-image"><img src="images/devices/' + relDevices[i].category.toLowerCase() + '/' + relDevices[i].name.replace("@", "") + '_1.png"></div><div class="product-info" style="text-align: center"><h5 style="margin-top: 4px">' + relDevices[i].name + '</h5><p class="product-categories"><a href="device.html?id=' + relDevices[i].id + '" class="btn btn-primary" style="background-color: #34495e; border-color: #34495e; color: white; padding: 3px 6px" role="button">See more</a></p></div></div>');
            }
		},
        error: function(request, error){
			console.log(request + " : " + error);
		},
        async:false
    });
}


window.onresize = function(event) {
	hideScrollbar();
};
  