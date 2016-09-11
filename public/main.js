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


/*

	var date = formatDate(randomDate());

		var url = "https://api.nasa.gov/planetary/apod?api_key=ul1h9pBDxKXZasQ7crI3gqduqlnms2VTs5w683FI&date=" + date;
		$.ajax({
			 url: url,
			 success: function(result) {
			  	if("copyright" in result) {
			    	$("#copyright").text("Image Credits: " + result.copyright);
			  	}
			  	else {
			    	$("#copyright").text("Image Credits: " + "Public Domain");
			  	}
			  
			  	if(result.media_type == "video") {
				    $("#apod_img_id").css("display", "none"); 
				    $("#apod_vid_id").attr("src", result.url);
				 }
			  	else {
				    $("#apod_vid_id").css("display", "none"); 
				    $("#apod_img_id").attr("src", result.url);
			  	}
				$("#apod_explanation").text(result.explanation);
				$("#apod_title").text(result.title);
				$('#photo-date').text(result.date);
				console.log(result);
				$('div.grey-out.nasa').fadeIn(300);
				$('div.box.nasa').fadeIn(300);
				$('.nasa-box').show();
			}
		});

*/


});