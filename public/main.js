$(document).ready(function() {

	$('input.submit').click(function() {
		if ($('input').val() == '') {
			console.log('empty input');
			return false
		}
	});

	$('form').submit(function() {
		$('input').val = '';
	});

	$('div.add-item-icon').click(function(){
		$('div.add-entry').slideToggle();
	});


/*
	$('div.nasa-selection').on('click', '.check', function() {
		console.log('nasa option clicked');
	//	$('div.grey-out.nasa').fadeIn(300);
    //    $('div.box.nasa').fadeIn(300);
        $('.nasa-box').show();
	});


	$('div.youtube-selection').on('click', '.check', function() {
		console.log('5-min workout selection');
	//	$('div.grey-out.youtube').fadeIn(300);
    //    $('div.box.youtube').fadeIn(300);
		$('.youtube-box').show();
	});

	$(document).bind('keydown',function(e){
	  if ( e.which == 27 ) {
	     $('.box').fadeOut(1000);
	     $('.grey-out').fadeOut(1000);
	     $('.nasa-box').hide();
	     $('.youtube-box').hide();
	  };
	});

  	$('.grey-out').click(function() {
  		$('.box').fadeOut(300);
	    $('.grey-out').fadeOut(300);
	    $('.nasa-box').hide();
	    $('.youtube-box').hide();
  	});
	

*/


});