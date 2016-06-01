$(document).ready(tvandsl);

function tvandsl(){
$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findAllTVandSL.php',
        success: function(response){
            var products = JSON.parse(response);
            for ( i in products) {
            	var string = '<div class="thumbnail element-item ' + String(products[i].brand).toLowerCase() + ' ' + String(products[i].type).toLowerCase() + ' ' + String(products[i].connection).toLowerCase() + ' col-sm-4 col-lg-4 col-md-4" data-category="transition"><img src="http://placehold.it/320x150"/><h4 class="name">' + products[i].name + '</h4><h4 class="number">' + products[i].discountedprice + '€</h4> <a href="device.html?id=' + products[i].id + '" class="btn btn-primary" role="button">See details</a></div>';
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
	var $itemContainer = $('.itemContainer').isotope({
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
		filters['type'] = filter;
		$itemContainer.isotope({ });
	});
    
    // bind filter on radio button click - connectivity
	$('.conn-filters').on( 'click', 'input', function() {
		var filter = this.value;
		filters['conn'] = filter;
		$itemContainer.isotope({ });
	});
	
    //Price Filter
	$("#price-filter").noUiSlider({
		range: [0,1000],
		start: [0, 1000],
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
        $('#price-filter').val([0,1000]);
        $('.price-range-min').text('€ 0');
		$('.price-range-max').text('€ 1000');
		//TODO SET select and radio to all
	});
}


$(window).load(function(){
	$('#resetButton').trigger('click');
})