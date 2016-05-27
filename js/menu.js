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