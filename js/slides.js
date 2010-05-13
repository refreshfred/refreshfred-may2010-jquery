var presentation = {
	viewportwidth: null,
	viewportheight: null,
	container: null,
	slides: [],
	currentSlide: 0,
	
	showSlide: function(index, direction) {
		presentation.slides[index].hide();

		/* Passing a direction is optional; if we get one, we need to do some extra legwork */
		if(direction === "left") {
			presentation.currentSlide = index === 0 ? index : index - 1;
			presentation.slides[index - 1].fadeIn("slow");
			presentation.positionSlide();
		} else if(direction === "right") {
			presentation.currentSlide = index === presentation.slides.length - 1 ? index : index + 1;
			presentation.slides[index + 1].fadeIn("slow");
			presentation.positionSlide();
		}		
	},
	
	positionSlide: function() {		
		presentation.container.animate({
			top: ((presentation.viewportheight - presentation.container.height()) - 40) / 2,
			left: ((presentation.viewportwidth - presentation.container.width()) -40) / 2
		});
	}
};

$(document).ready(function() {
	presentation.viewportwidth = (typeof window.innerWidth !== "undefined" ? window.innerWidth : document.documentElement.clientWidth);
	presentation.viewportheight = (typeof window.innerHeight !== "undefined" ? window.innerHeight : document.documentElement.clientHeight);
	presentation.container = $("#container");
	
	/* Grab a reference to every slide on the page, and store it away in a native array so we can access jQuery objects as needed */
	$(".slide").each(function () {
		presentation.slides.push($(this));
	});
	
	/* Bring in the first slide... */
	presentation.slides[0].fadeIn("slow");
	presentation.positionSlide();

	/* Bind keyboard events to facilitate slide switching */
	$(document).keydown(function(e) {
		/* Keyboard codes are stored in the event object (e) that we get passed. Conversion... */
		var code = (e.keyCode ? e.keyCode : e.which).toString();

		
		/* If the user presses the left arrow key and we're not on the first slide, let them go back */
		if(code === "37" && presentation.currentSlide > 0) {
			presentation.showSlide(presentation.currentSlide, "left");
			
		/* If the user presses right, and they're not on the final slide, let them move forward */
		} else if(code === "39" && presentation.currentSlide < presentation.slides.length - 1) {
			presentation.showSlide(presentation.currentSlide, "right");
		
		/* If there's no action, hard return here, it's just cleaner. */
		} else {
			return;
		}
	});
	
	/* Watch the window resize events, so we can reset our alignment of boxes and junk */
	$(window).resize(function() {
		presentation.viewportwidth = (typeof window.innerWidth !== "undefined" ? window.innerWidth : document.documentElement.clientWidth);
		presentation.viewportheight = (typeof window.innerHeight !== "undefined" ? window.innerHeight : document.documentElement.clientHeight);		
		presentation.moveSlide();
	});
});