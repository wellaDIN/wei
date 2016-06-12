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
                $("#highlightsContent").append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 portfolio-item" style="margin: 0 0 10px;"><a href="assistanceservice.html?id=' + highlights[i].id + '" class="portfolio-link"><div class="caption"><div class="caption-content"><i class="fa fa-search-plus fa-3x"></i></div></div><img src="images/assistanceservices/' + highlights[i].category.replace(/\s+/g, '').toLowerCase()  + '/' + highlights[i].name.replace(',', '').replace(':', '') + '.png" class="img-responsive" alt=""><div  style="display: flex;justify-content: center;align-items: center;text-align:center;min-height:100px;"><h4>' + highlights[i].name + '<h4></div></a></div>');
            }

		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
}