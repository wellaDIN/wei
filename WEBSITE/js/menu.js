(function ($) {
	"use strict";

	var fn = {

		// Launch Functions
		Launch: function () {
			fn.Menu();
		},

		// Menu
		Menu: function () {
			$("<em class='menu-expand'></em>").insertBefore(".sub-menu");
			$('.menu-icon').click( function () {
				$(this).add('.menu').toggleClass('open');
			});
			$('.menu-expand').click( function () {
				$(this).toggleClass('open')
				$(this).next().toggle(200);
			});
		},


	};

	$(document).ready(function () {
		fn.Launch();
	});

})(jQuery);


function hover(element) {
    element.setAttribute('src', 'images/icons/linkedin.png');
}
function unhover(element) {
    if(element.id=="Rinaldi"){
    	element.setAttribute('src', 'images/icons/Rinaldi_icon.png');
    } else {
    	element.setAttribute('src', 'images/icons/Russo_icon.png');    
    }
}       