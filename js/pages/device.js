//Capitalize just the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

$(document).ready(deviceFunction);

function deviceFunction(){
	var deviceID = findParameter("id");
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findDeviceCategory.php',
        data: {id: deviceID},
        success: function(response){
			var category = JSON.parse(response)["category"];
			if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
			switch(category) {
    			case "Smartphone":
					render_smartphone_page();
					break;
                case "Tablet":
                	render_tablet_page();
					break;
                case "Networking":
                	render_networking_page();
					break;
                case "Tv":
                	render_tv_page();
					break;
    			default:
         			alert(category);
			}
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}

function render_smartphone_page(){
	var deviceID = findParameter("id");	
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findSmartphone.php',
        data: {id: deviceID},
        success: function(response){
        	if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
        	var device = JSON.parse(response);
            var device_name = device.name;
            var device_img_number = device.imgnumber;
            var device_price = device["price"];
			var device_promotion = device["promotion"];
            var device_discountedprice = device["discountedprice"];
            var device_description = device.description;
            $("#deviceName").text(device_name);
            $("#deviceImage").attr('src',"images/" + device_name + "_1.png");
            $("#deviceImage").attr('data-large',"images/" + device_name + "_1.png");
			/** CODICE CHE TOCCA LO SLIDE
            var i;
            var ul = document.getElementById("imgSlides");
            for(i=1;i<=device_img_number;i++){
                var string = '"images/' + device_name + '_' + i + '.png"'
				var li = document.createElement("li");
  				li.innerHTML = '<a class="fancybox" rel="product-images" href=' + string + '></a><img src=' + string + ' data-large=' + string + '/>';
  				ul.appendChild(li);
            }
            */
            //TODO DO SOMETHING WITH DESCRIPTION
            delete device.id;
            delete device.description;
            delete device.name;
			delete device.price;
			delete device.promotion;
			delete device.discountedprice;
            var table = document.getElementById("deviceTable");
			for(var i in device){
            	var newRow = table.insertRow(table.rows.length);
                var cell1 = newRow.insertCell(0);
				var cell2 = newRow.insertCell(1);
            	cell1.innerHTML = capitalizeFirstLetter(i);
				switch(i){
                	case "size" :
                    	cell2.innerHTML = device[i].concat(" inches");
                        break;
                    case "memory" :
                    	cell2.innerHTML = device[i].concat(" GB");
                        break;
                    case "ram" :
                    	cell2.innerHTML = device[i].concat(" GB");
                        break;
                    default :
                    	cell2.innerHTML = device[i];
                }
            }
            var newRow = table.insertRow(table.rows.length);
            var cell1 = newRow.insertCell(0);
			var cell2 = newRow.insertCell(1);
            cell1.innerHTML = "Price";
            var price = device_price;
            if(device_promotion!=0){
            	price = price.concat(" PROMO " + device_discountedprice);
            }
			cell2.innerHTML = price;
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}    
    });
    
}


function render_tablet_page(){
	var deviceID = findParameter("id");	
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findTablet.php',
        data: {id: deviceID},
        success: function(response){
        	if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
        	var device = JSON.parse(response);
            var device_name = device.name;
            var device_img_number = device.imgnumber;
            var device_price = device["price"];
			var device_promotion = device["promotion"];
            var device_discountedprice = device["discountedprice"];
            var device_description = device.description;
            var device_conn_gsm = device.conn_gsm;
            var device_conn_wifi = device.conn_wifi;
            $("#deviceName").text(device_name);
            $("#deviceImage").attr('src',"images/" + device_name + "_1.png");
            $("#deviceImage").attr('data-large',"images/" + device_name + "_1.png");
			/**var i;
            var ul = document.getElementById("imgSlides");
            for(i=1;i<=device_img_number;i++){
                var string = '"images/' + device_name + '_' + i + '.png"'
				var li = document.createElement("li");
  				li.innerHTML = '<a class="fancybox" rel="product-images" href=' + string + '></a><img src=' + string + ' data-large=' + string + '/>';
  				ul.appendChild(li);
            }*/
            //TODO DO SOMETHING WITH DESCRIPTION
            delete device.id;
            delete device.description;
            delete device.name;
			delete device.price;
			delete device.promotion;
			delete device.discountedprice;
            delete device.imgnumber;
            delete device.conn_gsm;
            delete device.conn_wifi;
            var table = document.getElementById("deviceTable");
			for(var i in device){
            	var newRow = table.insertRow(table.rows.length);
                var cell1 = newRow.insertCell(0);
				var cell2 = newRow.insertCell(1);
            	cell1.innerHTML = capitalizeFirstLetter(i);
				switch(i){
                	case "size" :
                    	cell2.innerHTML = device[i].concat(" inches");
                        break;
                    case "memory" :
                    	cell2.innerHTML = device[i].concat(" GB");
                        break;
                    case "ram" :
                    	cell2.innerHTML = device[i].concat(" GB");
                        break;
                    default :
                    	cell2.innerHTML = device[i];
                }
            }
            var connRow = table.insertRow(table.rows.length);
            var cell1 = connRow.insertCell(0);
			var cell2 = connRow.insertCell(1);
            cell1.innerHTML = "Connectivity";
            var string;
            if(device_conn_gsm!=0 && device_conn_wifi!=0){
            	string = "3G/4G, WiFi";
            }
            if(device_conn_gsm==0 && device_conn_wifi!=0){
            	string = "WiFi";
            }
            if(device_conn_gsm!=0 && device_conn_wifi==0){
            	string = "3G/4G";
            }
            if(device_conn_gsm==0 && device_conn_wifi==0){
            	string = "Not available";
            }
            cell2.innerHTML = string;
            var newRow = table.insertRow(table.rows.length);
            var cell1 = newRow.insertCell(0);
			var cell2 = newRow.insertCell(1);
            cell1.innerHTML = "Price";
            var price = device_price;
            if(device_promotion!=0){
            	price = price.concat(" PROMO " + device_discountedprice);
            }
			cell2.innerHTML = price;
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}    
    });
    
}