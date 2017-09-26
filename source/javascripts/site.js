$(document).ready(function(){
	$('.button-collapse').sideNav({
		closeOnClick: true,
		draggable: true
	});
	$('.welcome-text').addClass('scale-in');
	$('.welcome-text-1').delay(800).slideDown("slow");
});
