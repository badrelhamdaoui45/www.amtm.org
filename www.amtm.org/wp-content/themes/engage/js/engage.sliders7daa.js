( function ( $ ) {
	'use strict';

	jQuery(document).ready(function() {

		// Fullwidth slider

		$( '.fullwidth-section' ).each( function() {
			$(this).closest( '.vc_row' ).addClass( 'vc_row-fullwidth' );
		});

		// Veented Slider

    if( $('.veented-slider').length ) {

			$('.veented-slider').each( function() {

				var $slider = $(this);

	    	var previousSlideID = 0;

				var varAutoplay = $slider.data('slider-autoplay');
				var varSpeed = $slider.data('slider-speed');
				var varLoop = $slider.data('slider-loop');
				var varTouch = $slider.data('slider-touch');
				var varEffect = $slider.data('slider-effect');
				var varDirection = $slider.data('slider-direction');

				if ( $('#wrapper').hasClass( 'header-transparent' ) ) {
					$slider.closest('section').css({ 'paddingTop' : 0 });
				}

				var parentSelector = '#' + $slider.attr('id');
				var classSelector = parentSelector + ' .veented-slider-container';

				var parentRow = $slider.closest( '.vc_row' );

				if ( ! parentRow.is(':first-child') ) {

				}

				var swiper = new Swiper( classSelector, {
					pagination: parentSelector + ' .swiper-pagination',
					paginationClickable: true,
					nextButton: parentSelector + ' .swiper-button-next',
					prevButton: parentSelector + ' .swiper-button-prev',
					loop: varLoop,
					autoplay: false,
					speed: varSpeed,
					direction: varDirection,
					effect: varEffect,
					simulateTouch: varTouch,
	        autoplayDisableOnInteraction: false,
	        updateOnImagesReady: true,
	        onImagesReady: function(swiper) {

	            $( parentSelector + ' .veented-slider-loader').fadeOut();

	            swiper.params.autoplay = varAutoplay;
	            swiper.startAutoplay();

	            if( ! $slider.hasClass('veented-slider-loaded') ) {

	                $slider.addClass('veented-slider-loaded');

	                engageAnimateSliderContent( true );

	            }

	        },
					onSlideChangeStart: function( swiper ) {

						if( $(parentSelector + ' .swiper-slide-active').hasClass('color-scheme-dark') ) {

							if( !$('#main-navigation').hasClass('header-scheme-dark') ) {
								$('#main-navigation').addClass('header-scheme-dark');
								$slider.removeClass('veented-slider-navigation-white').addClass('veented-slider-navigation-dark');
							}

						} else {
							$('#main-navigation').removeClass('header-scheme-dark');
							$slider.removeClass('veented-slider-navigation-dark').addClass('veented-slider-navigation-white');
						}

					},
					onSlideChangeEnd: function( swiper ) {

						if( $slider.hasClass('veented-slider-loaded') ) {

							engageAnimateSliderContent();

						}


					}

				});

			});


			// Scroll after slider button

			$('.button-scroll-after-slider').on( 'click', function( event ) {

				var sliderHeight = $(this).closest('.veented-slider-holder').height();

				jQuery('html,body').stop().animate({
					scrollTop: sliderHeight + "px"
				}, 1200);

				event.preventDefault();

			});

    	}

    	$('.button-scroll').on( 'click', function( event ) {

    		jQuery('html,body').stop().animate({
    			scrollTop: jQuery( $anchor.attr('href') ).offset().top + "px"
    		}, 1200, 'easeInOutExpo');
    		event.preventDefault();

    	});

		// Hero Slider

		if( $('.hero-slider').length ) {

			var varAutoplay = 7000;

			var $heroSlider = $( '.hero-slider-holder' );
			varAutoplay = $heroSlider.data('autoplay');
			varSpeed = $heroSlider.data('speed');
			var varLoop = $heroSlider.data('loop');
			var varTouch = $heroSlider.data('touch');
			var varEffect = $heroSlider.data('effect');
			var varDirection = $heroSlider.data('direction');

			var varSpeed = 300;

			var swiperHero = new Swiper( '.hero-slider', {
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				autoplay: varAutoplay,
				speed: varSpeed,
				direction: varDirection,
				loop: true,
				onInit: function( swiper ) {
					swiper.stopAutoplay();
				},
				onImagesReady: function( swiper ) {

					$('.hero-slider-loader').fadeOut();

					swiper.startAutoplay();

					if( !$('.hero-slider').hasClass('hero-slider-loaded') ) {

						$('.hero-slider').addClass('hero-slider-loaded');

					}

				},
				onSlideChangeStart: function( swiper ) {

					if ( $heroSlider.closest('.vc_row').is(':first-child') && $(window).width() > 1000 && $('#wrapper').hasClass( 'header-transparent' ) ) {
						if( $('.swiper-slide-active').hasClass('color-scheme-dark') ) {
							if( !$('#header').hasClass('header-light') ) {
								$('#header').removeClass('header-dark').addClass('header-light');
							}

						} else {
							if( !$('#header').hasClass('header-dark') ) {
								$('#header').removeClass('header-light').addClass('header-dark');
							}
						}
					}

				}

			});

		}

		// Simple Swiper Slider

		if( $( '.engage-swiper-slider' ).length > 0 ) {
			//engage_swiper_slider();
			$( '.engage-swiper-slider' ).each( function() {
				engage_init_swiper( $(this) );
			});
		}

	}); // End (document).ready

}( jQuery ));

function engageAnimateSliderContent( first ) {

    if ( typeof first === 'undefined' ) { first = false; }

    var sliderElements = [
        ".veented-slide-top-heading",
        ".veented-slide-heading",
        ".veented-slide-subtitle",
        ".veented-slide-buttons"
    ];

    var delay = 50;

    if( first == true ) {
        delay = 500;
    }

    var activeSlideID = jQuery('.swiper-slide-active').attr('id');

    jQuery.each(sliderElements, function(element, elementClass) {

        if( jQuery('.' + activeSlideID + ' ' +elementClass).length > 0) {

            setTimeout(function(){

                jQuery('.' + activeSlideID + ' ' +elementClass).addClass( "fadeInUp visible" );

            }, delay);

            delay += 200;

        }

    });

    jQuery('.swiper-slide').not('.swiper-slide-active').find('.animated').stop().removeClass('visible').removeClass('fadeInUp');

}

function engage_get_swiper_settings( $sliderInstance ) {

	var varSpeed = 700;
	var varAutoplay = 24000;

	if ( $sliderInstance.data('autoplay') ) {
		varAutoplay = $sliderInstance.data('autoplay');
	}

	var effect = 'slide';

	if ( $sliderInstance.hasClass( 'hero-bg' ) ) {
		effect = 'fade';
	}

	var autoHeight = false;

	if ( $sliderInstance.hasClass( 'swiper-auto-height' ) ) {
		autoHeight = true;
	}

	var swiperSettings = {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop: true,
		autoplay: varAutoplay,
		speed: varSpeed,
		effect: effect,
		autoHeight: autoHeight,
        autoplayDisableOnInteraction: false,
		onInit: function( swiper ) {
			jQuery( '.vntd-image-slider li a' ).each( function() {
				jQuery(this).magnificPopup({
				  type: 'image',
				  gallery: {
				     enabled:true
				   }
					// other options
				});
			});
		}
	};

	return swiperSettings;

}

// Init singular slider

function engage_init_swiper( $sliderInstance ) {

	var swiperSettings = engage_get_swiper_settings( $sliderInstance );

	if ( $sliderInstance.closest( '.blog-style-masonry' ).length > 0 && ! $sliderInstance.closest( '.blog-style-masonry' ).hasClass( 'cbp-ready' ) ) {
		$sliderInstance.closest( '.blog-style-masonry' ).on( 'initComplete.cbp', function() {
			var swiperEngageSlider = new Swiper( $sliderInstance, swiperSettings );
		});
	} else {
		var swiperEngageSlider = new Swiper( $sliderInstance, swiperSettings );
	}

	$sliderInstance.addClass( 'vntd-ready' );

}

function engage_swiper_slider() {

	varSpeed = 700;
	varAutoplay = 7000;
	var sliderSelector = '.engage-swiper-slider';
	var $slider = jQuery( '.engage-swiper-slider' );

	var swiperSettings = engage_get_swiper_settings();

	if ( jQuery( '.engage-swiper-slider' ).closest( '.blog-style-masonry' ).length > 0 && ! jQuery( '.engage-swiper-slider' ).closest( '.blog-style-masonry' ).hasClass( 'cbp-ready' ) ) {
		jQuery( '.engage-swiper-slider' ).closest( '.blog-style-masonry' ).on( 'initComplete.cbp', function() {
			var swiperEngageSlider = new Swiper( sliderSelector, swiperSettings );
		});
	} else {
		var swiperEngageSlider = new Swiper( sliderSelector, swiperSettings );
	}

}
