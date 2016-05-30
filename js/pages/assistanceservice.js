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
        url: 'php_scripts/findAssistanceService.php',
        data: {id: serviceID},
        success: function(response){
			var service = JSON.parse(response);
            var service_name = service.name;
            var service_category = service.category;
            var service_description = service.description;
            var service_highlight = service.highlight;
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
                    var string = '';
                    for(j in tab_body){
                    	string = string + '<h2 style="margin-top: 0; color: #428bca">' + tab_body[j].question + '</h2>';
                        string = string + '<h6 style="text-align:"justify">' + tab_body[j].answer + '</h6>';
                    }
                    $("#active-tab-content").html(string);
                } else {
					tab_body = tabs[i].body;
                    var string = '<div class="bhoechie-tab-content">';
                	for (j in tab_body) {
                    	string = string + '<h2 style="margin-top: 0; color: #428bca">' + tab_body[j].question + '</h2>';
                        string = string + '<h6 style="text-align:"justify">' + tab_body[j].answer + '</h6>';
                 	}
                    string = string + '</div>';
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
    		});
			if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}