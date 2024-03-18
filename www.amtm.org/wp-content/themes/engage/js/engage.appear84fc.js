( function ( $ ) {
	'use strict';
	
	jQuery(document).ready(function() {
		
		// Counters
		
		$(".vntd-counter").appear(function(){
		
			var dataperc;
				
			$('.vntd-counter').each(function(){

                if ( $(this).find('.counter-number').text() == 0 ) {
                    dataperc = $(this).data('perc');
                    $(this).find('.counter-number').delay(6000).stop().countTo({
                        from: 0,
                        to: dataperc,
                        speed: 3000,
                        refreshInterval: 50,
                    });
                }
			});
		});
					
		// Animated Elements
		
		$('.animated.vntd-animated').appear(function() {
			if ($(this).hasClass('animatedSlider')) return false;
		    var item = $(this);
		    var animation = item.data('animation');
		    if ( !item.hasClass('visible') ) {
		        var animationDelay = item.data('animation-delay');
		        if ( animationDelay ) {
		            setTimeout(function(){
		                item.addClass( animation + " visible" );
		            }, animationDelay);
		        } else {
		            item.addClass( animation + " visible" );
		        }
		    }
		    
		});
	
	});
	
	// Counting Function
	
	$.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return jQuery(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(vntd_updateTimer, options.refreshInterval);

            function vntd_updateTimer() {
                value += increment;
                loopCount++;
                jQuery(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
	
}( jQuery ));