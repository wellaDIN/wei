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

$(document).ready(error);

function error(){
	var msgID = findParameter("id");
    switch(msgID){
    	case "deviceNotFound" :
        	$("#msgError").text("The device could not be found.");
            break;
		case "SLServiceCatNotFound" :
        	$("#msgError").text("The Smart Life Services Category could not be found.");
            break;
		case "ServicesNotFound" :
        	$("#msgError").text("There are no services for the selected SL Services category.");
            break;
       	case "AssServiceCatNotFound" :
        	$("#msgError").text("The Assistance Services Category could not be found.");
            break;
		case "AssServicesNotFound" :
        	$("#msgError").text("There are no services for the selected Assistance Services category.");
            break;
       	case "serviceNotFound" :
        	$("#msgError").text("The service could not be found.");
            break;
        case "noDeviceInPromo" :
        	$("#msgError").text("Currently there are no devices in promotion.");
            break;
        case "noHighlights" :
        	$("#msgError").text("There are no highlights.");
            break;
		case "noSeviceInPromo" :
        	$("#msgError").text("Currently there are no services in promotion.");
            break;
       case "productsNotFound" :
        	$("#msgError").text("There are no products for this category.");
            break;
       case "SLServiceNotFound" :
        	$("#msgError").text("The service could not be found.");
            break;
        default :
        	break;
    }
}