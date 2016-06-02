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
            $("#deviceImage").attr('src',"images/devices/smartphone/" + device_name + "_1.png");
            $("#deviceImage").attr('data-large',"images/devices/smartphone/" + device_name + "_1.png");
            var i;
           	for(i=1;i<=device_img_number;i++){
            	var li;
            	var string = '"images/devices/smartphone/' + device_name + '_' + i + '.png"'
                li = document.getElementById("li"+i);
            	li.innerHTML = '<a class="fancybox" rel="product-images" href=' + string + '></a><img src=' + string + ' data-large=' + string + ' alt=""/>';        
            }
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
            $("#deviceImage").attr('src',"images/devices/tablet/" + device_name + "_1.png");
            $("#deviceImage").attr('data-large',"images/devices/tablet/" + device_name + "_1.png");
			var i;
            for(i=1;i<=device_img_number;i++){
            	var li;
            	var string = '"images/devices/tablet/' + device_name + '_' + i + '.png"'
                li = document.getElementById("li"+i);
            	li.innerHTML = '<a class="fancybox" rel="product-images" href=' + string + '></a><img src=' + string + ' data-large=' + string + ' alt=""/>';        
            }
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

function render_networking_page(){
	var deviceID = findParameter("id");	
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findNetworking.php',
        data: {id: deviceID},
        success: function(response){
        	if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
        	var networking = JSON.parse(response);
            var networking_name = networking.name;
            var networking_img_number = networking.imgnumber;
            var networking_price = networking["price"];
			var networking_promotion = networking["promotion"];
            var networking_discountedprice = networking["discountedprice"];
            var networking_description = networking.description;
            var networking_features = JSON.parse(networking.features).features;
            $("#deviceName").text(networking_name);
            $("#deviceImage").attr('src',"images/devices/networking/" + networking_name + "_1.png");
            $("#deviceImage").attr('data-large',"images/devices/networking/" + networking_name + "_1.png");
			var i;
            for(i=1;i<=networking_img_number;i++){
            	var li;
            	var string = '"images/devices/networking/' + networking_name + '_' + i + '.png"'
                li = document.getElementById("li"+i);
            	li.innerHTML = '<a class="fancybox" rel="product-images" href=' + string + '></a><img src=' + string + ' data-large=' + string + ' alt=""/>';        
            }
            //TODO DO SOMETHING WITH DESCRIPTION
            delete networking.id;
            delete networking.description;
            delete networking.name;
			delete networking.price;
			delete networking.promotion;
			delete networking.discountedprice;
            delete networking.imgnumber;
            delete networking.features;
            var table = document.getElementById("deviceTable");
			for(var i in networking){
            	var newRow = table.insertRow(table.rows.length);
                var cell1 = newRow.insertCell(0);
				var cell2 = newRow.insertCell(1);
            	cell1.innerHTML = capitalizeFirstLetter(i);
                cell2.innerHTML = networking[i];
            }
            for (var i in networking_features){
            	var newRow = table.insertRow(table.rows.length);
                var cell1 = newRow.insertCell(0);
				var cell2 = newRow.insertCell(1);
            	cell1.innerHTML = networking_features[i].featureName;
                cell2.innerHTML = networking_features[i].featureValue;               
            }
            var newRow = table.insertRow(table.rows.length);
            var cell1 = newRow.insertCell(0);
			var cell2 = newRow.insertCell(1);
            cell1.innerHTML = "Price";
            var price = networking_price;
            if(networking_promotion!=0){
            	price = price.concat(" PROMO " + networking_discountedprice);
            }
			cell2.innerHTML = price;
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}    
    });
}
    
function render_tv_page(){
	var deviceID = findParameter("id");	
	$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findTvAndSL.php',
        data: {id: deviceID},
        success: function(response){
        	if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html");
			}
        	var tv_and_smartliving = JSON.parse(response);
            var tv_and_smartliving_name = tv_and_smartliving.name;
            var tv_and_smartliving_img_number = tv_and_smartliving.imgnumber;
            var tv_and_smartliving_price = tv_and_smartliving["price"];
			var tv_and_smartliving_promotion = tv_and_smartliving["promotion"];
            var tv_and_smartliving_discountedprice = tv_and_smartliving["discountedprice"];
            var tv_and_smartliving_description = tv_and_smartliving.description;
            var tv_and_smartliving_features = JSON.parse(tv_and_smartliving.features).features;
            $("#deviceName").text(tv_and_smartliving_name);
            $("#deviceImage").attr('src',"images/devices/tv/" + tv_and_smartliving_name + "_1.png");
            $("#deviceImage").attr('data-large',"images/devices/tv/" + tv_and_smartliving_name + "_1.png");
			var i;
            for(i=1;i<=tv_and_smartliving_img_number;i++){
            	var li;
            	var string = '"images/devices/tv/' + tv_and_smartliving_name + '_' + i + '.png"'
                li = document.getElementById("li"+i);
            	li.innerHTML = '<a class="fancybox" rel="product-images" href=' + string + '></a><img src=' + string + ' data-large=' + string + ' alt=""/>';        
            }
            //TODO DO SOMETHING WITH DESCRIPTION
            delete tv_and_smartliving.id;
            delete tv_and_smartliving.description;
            delete tv_and_smartliving.name;
			delete tv_and_smartliving.price;
			delete tv_and_smartliving.promotion;
			delete tv_and_smartliving.discountedprice;
            delete tv_and_smartliving.imgnumber;
            delete tv_and_smartliving.features;
            var table = document.getElementById("deviceTable");
			for(var i in tv_and_smartliving){
            	var newRow = table.insertRow(table.rows.length);
                var cell1 = newRow.insertCell(0);
				var cell2 = newRow.insertCell(1);
            	cell1.innerHTML = capitalizeFirstLetter(i);
                cell2.innerHTML = tv_and_smartliving[i];
            }
            for (var i in tv_and_smartliving_features){
            	var newRow = table.insertRow(table.rows.length);
                var cell1 = newRow.insertCell(0);
				var cell2 = newRow.insertCell(1);
            	cell1.innerHTML = tv_and_smartliving_features[i].featureName;
                cell2.innerHTML = tv_and_smartliving_features[i].featureValue;               
            }
            var newRow = table.insertRow(table.rows.length);
            var cell1 = newRow.insertCell(0);
			var cell2 = newRow.insertCell(1);
            cell1.innerHTML = "Price";
            var price = tv_and_smartliving_price;
            if(tv_and_smartliving_promotion!=0){
            	price = price.concat(" PROMO " + tv_and_smartliving_discountedprice);
            }
			cell2.innerHTML = price;
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}    
    });
}