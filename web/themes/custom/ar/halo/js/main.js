/* =================================
------------------------------------
	HALO - Photography Portfolio
	Version: 1.0
 ------------------------------------ 
 ====================================*/



'use strict';

jQuery(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	jQuery(".loader").fadeOut(); 
	jQuery("#preloder").delay(400).fadeOut("slow");

});

(function($) {

	/*------------------
		Navigation
	--------------------*/
	jQuery('.nav-switch').on('click', function(event) {
		jQuery('.main-menu').slideToggle(400);
		event.preventDefault();
	});


	/*------------------
		PORTFOLIO
	--------------------*/
	if(jQuery('.portfolio-warp').length > 0 ) {
		var containerEl = document.querySelector('.portfolio-warp');
		var mixer = mixitup(containerEl);
	}


	/*------------------
		Background set
	--------------------*/
	jQuery('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});



	/*------------------
		Hero Slider
	--------------------*/
	var w_height = $(window).innerHeight();
	jQuery('.hs-item').height(w_height);
	
	jQuery('.hero-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: true,
		mouseDrag: false,
		animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
		navText: [' ', '<i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i>'],
		items: 1,
		autoplay: true
	});
	var dot = jQuery('.hero-slider .owl-dot');
	dot.each(function() {
		var index = jQuery(this).index() + 1;
		if(index < 10){
			jQuery(this).html('0').append(index);
			jQuery(this).append('<span>.</span>');
		}else{
			jQuery(this).html(index);
			jQuery(this).append('<span>.</span>');
		}
	});


	/*------------------
		Review Slider
	--------------------*/
	jQuery('.review-slider').owlCarousel({
		margin: 10,
		loop: true,
		nav: false,
		dots: false,
		items: 1,
		autoplay: true,
	});


	/*------------------
		Work Slider
	--------------------*/
	jQuery('.work-slider').owlCarousel({
		margin: 0,
		loop: true,
		nav: true,
		dots: false,
		items: 1,
		autoplay: true,
		animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
	});


	/*------------------
		Circle progress
	--------------------*/
	jQuery('.circle-progress').each(function() {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cptitle = $(this).data("cptitle");
		var cpid 	= $(this).data("cpid");

		jQuery(this).append('<div class="'+ cpid +'"></div><div class="progress-info"><h2>'+ cpvalue +'%</h2><p>'+ cptitle +'</p></div>');

		if (cpvalue < 100) {

			jQuery('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 240,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			jQuery('.' + cpid).circleProgress({
				value: 1,
				size: 240,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}

	});


	/*------------------
		Accordions
	--------------------*/
	jQuery('.panel-link').on('click', function (e) {
		jQuery('.panel-link').parent('.panel-header').removeClass('active');
		var $this = $(this).parent('.panel-header');
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});



})(jQuery);

