$(document).ready(smartphones);

function smartphones(){
$.ajax({
    	method: 'POST',
        crossDomain: true,
        url: 'php_scripts/findAllSmartphones.php',
        success: function(response){
            var smartphones = JSON.parse(response);
            for ( i in smartphones) {
                        //TODO GESTIRE windows phone come class
            	var string = '<div class="thumbnail element-item ' + smartphones[i].brand.toLowerCase() + ' ' + smartphones[i].os.toLowerCase() + ' col-sm-4 col-lg-4 col-md-4" data-category="transition"><img src="http://placehold.it/320x150"/><h4 class="name">' + smartphones[i].name + '</h4><h4 class="number">' + smartphones[i].discountedprice + ' €</h4><h4 class="size" style="display:none">' + smartphones[i].size + '</h4>  <a href="device.html?id=' + smartphones[i].id + '" class="btn btn-primary" role="button">See details</a></div>';
				$("#items").append(string);
            }
            	activate_filter_panel();
		},
        error: function(request, error){
			console.log(request + " : " + error);
		},
        async:false
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
		filters['os'] = filter;
		$itemContainer.isotope({ });
	});
	
    //Price Filter
	$("#price-filter").noUiSlider({
		range: [0,900],
		start: [0, 900],
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
	
	//Display size filter
	$("#size-filter").noUiSlider({
			range: [0,7],
			start: [0, 7],
			connect: true,
			slide: function(){
				var size_val = $('#size-filter').val();
				$('.size-range-min').text(size_val[0] + ' inch');
				$('.size-range-max').text(size_val[1] + ' inch');
			}
		});
		var size_val = $('#size-filter').val();
	$('.size-range-min').text(size_val[0] + ' inch');
	$('.size-range-max').text(size_val[1] + ' inch');
		
	$("#size-filter").on('change', function(){
		var val = $('#size-filter').val();
		var min = val[0];
		var max = val[1];
		var filter = function() {
			var size = $(this).find('.size').text();
			minbool = parseFloat (size, 10) > min;
			maxbool = parseFloat (size, 10) < max;
			return minbool && maxbool;
		};
		filters['size']=filter;
		$itemContainer.isotope({});
	});
		
	$('#resetButton').click(function(){
    	filters = {}
		$itemContainer.isotope({});
        $('#size-filter').val([0,7]);
        $('.size-range-min').text('0 inch');
		$('.size-range-max').text('7 inch');
        $('#price-filter').val([0,900]);
        $('.price-range-min').text('€ 0');
		$('.price-range-max').text('€ 900');
		$('select').val("*");
        $('select').trigger("chosen:updated");
		var $radios = $('input:radio[name=filter]');
        $radios.filter('[value="*"]').prop('checked', true);        
	});
}


$(window).load(function(){
	$('#resetButton').trigger('click');
})