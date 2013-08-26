var iframes;
var transition_type;

var current_frame;
var	next_frame;

var timer;
var delay_time = 5000;

function init() {
	TweenLite.ticker.fps(60);

	timer = setInterval(transition, delay_time);

	var w = $(window).width();
	var h = $(window).height();

	iframes = $("iframe");

	iframes.each(
		function(index) {
			$(this).width(w);
			$(this).height(h);
		}
	);

	$(iframes[0]).css({opacity: 1});
	current_frame = $(iframes[0]);

}

function swap(a, b) {
	switch(transition_type) {

		default:
			TweenLite.to(a, 1, {alpha: 0});
			TweenLite.to(b, 1, {alpha: 1});
			break;
	}
}

function transition() {
	var next = Math.floor(Math.random()*$(iframes).length);
	if (current_frame == iframes[next]) {
		transition();
	}
	else {
		swap(current_frame, iframes[next]);
		current_frame = iframes[next];
	}
}