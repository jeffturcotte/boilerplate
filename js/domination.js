;(function($){
	if (!window.requestAnimationFrame) {
		return;
	}

	var NAMESPACE    = 'domination',
		elements     = [],
		$window      = $(window),
		windowHeight = $window.height(),
		windowTop    = $window.scrollTop(),
		windowBottom,
		activeElement,
		newWindowTop,
		newWindowHeight;

	(function animate() {
		window.requestAnimationFrame(animate);

		newWindowTop = $window.scrollTop();
		newWindowHeight = $window.height();

		if (newWindowHeight != windowHeight && newWindowTop != windowTop) {
			return;
		}

		windowTop    = newWindowTop; 
		windowHeight = newWindowHeight;
		windowBottom = newWindowTop + newWindowHeight;

		for (i in elements) {
			elements[i].each(function(){
				$(this).data(NAMESPACE).animate.call(this);
			});
		}
	})();

	var helpers = {
		bottom: function() {
			return windowBottom;
		},
		fromBottom: function() {
			return windowBottom - activeElement.offset().top;
		},
		height: function() {
			return 
		},
		top: function() {
			return windowTop;
		},
	}

	$.fn.domination = function(args){
		activeElement = $(this);
		if (!args) return helpers;
		activeElement.data(NAMESPACE, { animate: args });
		elements.push(activeElement);
	};
})(jQuery);

$(function(){
	var elems = $('.main section');
	elems.css('position', 'relative');

	elems.domination(function(){
		x = $(this).domination().fromBottom() / 400;
		if (x <= 0 || x > 1.5) return;
		y = Math.pow((x+.62), -2) * 75;
		$(this).css({ top: y, opacity: x+.3 });
	});
});
