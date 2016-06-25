$(document).ready(networking);

var $itemContainer;

function networking(){
$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'http://www.weigroup.altervista.org/php_scripts/findAllNetworking.php',
        success: function(response){
            if(response==("\"405\"") || response==("\"406\"")){
				window.location.replace("404.html?id=productsNotFound");
			}
            var products = JSON.parse(response);
            for ( i in products) {
            	var string = '<div class="thumbnail element-item ' + String(products[i].brand).toLowerCase() + ' ' + String(products[i].connectivity_type).toLowerCase() + ' ' + String(products[i].activity).toLowerCase() + ' col-sm-12 col-lg-4 col-md-4" data-category="transition" style="padding-top:10px;padding-bottom:10px;text-align:center"><img src="images/devices/networking/' + products[i].name + '_landscape.png"/><h4 style="font-size:16px" class="name">' + products[i].name + '</h4><h5 class="number">' + products[i].discountedprice + '€</h5> <a href="device.html?id=' + products[i].id + '" class="btn btn-primary" role="button">See details</a></div>';
				$("#items").append(string);
            }
            	activate_filter_panel();
		},
        error: function(request, error){
			console.log(request + " : " + error);
		}
    });
   	$('#resetButton').trigger('click');
}

function activate_filter_panel(){
	
    var filters = {};
	// init Isotope
	$itemContainer = $('.itemContainer').isotope({
		itemSelector: '.element-item',
		layoutMode: 'fitRows',
		filter : function() {
			var isMatched = true;
			var $this = $(this);
			for (var prop in filters) {
				var filter = filters[prop];
				if (filter){
					isMatched = isMatched && $(this).is(filter);
				}
				if (!isMatched){
					break;
				}
			}
		return isMatched;
		}
	});
    
	// bind filter on select change
	$('.filters-select').on( 'change', function() {
		var filter = this.value;
		filters['brand'] = filter;
		$itemContainer.isotope({});
	});
    
	// bind filter on radio button click
	$('.filters').on( 'click', 'input', function() {
		var filter = this.value;
		filters['conn'] = filter;
		$itemContainer.isotope({ });
	});
    
    // bind filter on radio button click - connectivity
	$('.act-filters').on( 'click', 'input', function() {
		var filter = this.value;
		filters['act'] = filter;
		$itemContainer.isotope({ });
	});
	
    //Price Filter
	$("#price-filter").noUiSlider({
		range: [0,300],
		start: [0, 300],
		connect: true,
		slide: function(){
			var noui_val = $('#price-filter').val();
			$('.price-range-min').text('€'+noui_val[0]);
			$('.price-range-max').text('€'+noui_val[1]);
		}
	});
    
    var noui_val = $('#price-filter').val();
	$('.price-range-min').text('€'+noui_val[0]);
	$('.price-range-max').text('€'+noui_val[1]);
		
	$("#price-filter").on('change', function(){
		var val = $('#price-filter').val();
		var min = val[0];
		var max = val[1];
		var filter = function() {
			var price = $(this).find('.number').text();
			minbool = parseFloat (price, 10) > min;
			maxbool = parseFloat (price, 10) < max;
			return minbool && maxbool;
		};
		filters['price']=filter;
		$itemContainer.isotope({});
	});
	
	
	$('#resetButton').click(function(){
    	filters = {}
		$itemContainer.isotope({});
        $('#price-filter').val([0,300]);
        $('.price-range-min').text('€ 0');
		$('.price-range-max').text('€ 300');
        var $radios = $('input:radio[name=filter]');
        $radios.filter('[value="*"]').prop('checked', true);
        $radios = $('input:radio[name=actfilter]');
        $radios.filter('[value="*"]').prop('checked', true);
        $('select').val("*");
        $('select').trigger("chosen:updated");	});
}


/**Codice per risolvere il bug, andrebbe tolto*/
$(window).load(function(){
    $('#resetButton').trigger('click');
     setTimeout(function(){
		$itemContainer.isotope({});
	}, 500);
})

$(window).on('resize', function(){
	$itemContainer.isotope({});
    setTimeout(function(){
		$itemContainer.isotope({});
        setTimeout(function(){
			$itemContainer.isotope({});
		}, 500);
	}, 500);
});