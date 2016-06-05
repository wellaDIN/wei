$(document).ready(highlights);

function highlights(){
$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findHighlights.php',
        success: function(response){
        	if(response==("\"405\"")){
				window.location.replace("404.html");
			}
            var highlights = JSON.parse(response);
            for (i in highlights){
                $("#highlightsContent").append('<div class="col-sm-4 portfolio-item"><a href="assistanceservice.html?id=' + highlights[i].id + '" class="portfolio-link"><div class="caption"><div class="caption-content"><i class="fa fa-search-plus fa-3x"></i></div></div><img src="images/assistanceservices/' + highlights[i].category.replace(/\s+/g, '').toLowerCase()  + '/' + highlights[i].name.replace(',', '').replace(':', '') + '.png" class="img-responsive" alt="">' + highlights[i].name + '</a></div>');
            }

		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}