;(function($){
	if (!window.requestAnimationFrame || !window.innerWidth || !window.pageYOffset) {
		//return;
	}

	var NAMESPACE = 'domination',
		elements = [],
		activeElement;

	(function animate() {
		window.requestAnimationFrame(animate);

		for (i in elements) {
			elements[i].each(function(){
				$(this).data(NAMESPACE).animate.call(this);
			});
		}
	})();

	var helpers = {
		bottom: function() {
			return window.pageYOffset + window.innerHeight;
		},
		fromBottom: function() {
			return window.pageYOffset + window.innerHeight - activeElement.offset().top;
		},
		height: function() {
			return window.innerHeight;
		},
		top: function() {
			return window.pageXOffset;
		}
	};

	$.fn.domination = function(args){
		activeElement = $(this);
		if (!args) return helpers;
		activeElement.data(NAMESPACE, { animate: args });
		elements.push(activeElement);
	};
})(jQuery);

$(function(){
	var elems = $('.main section:not(:eq(0))').filter(':not(:eq(0))');
	elems.css('position', 'relative');

	elems.domination(function(){
		x = $(this).domination().fromBottom() / 250;
		if (x <= 0 || x > 1.5) return;
		y = Math.pow((x+.99), -1.01) * 220;
		$(this).css({ top: y, opacity: x+.3 });
	});
});
