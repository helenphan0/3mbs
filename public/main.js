function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function randomDate(){
   var startDate = new Date(2012,1,1).getTime();
   var endDate =  new Date().getTime();
   var spaces = (endDate - startDate);
   var timestamp = Math.round(Math.random() * spaces);
   timestamp += startDate;
   return new Date(timestamp);
};

function formatDate(date){
    var month = randomDate().getMonth();
    var day = randomDate().getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return String(date.getFullYear()) + '-' + month + '-' + day;
};


function getWorkout() {
	var request = {
		part: 'snippet',
		key: 'AIzaSyDnahmSz7sdcFj_jMe6pb-P5vPxdO9Me2A',
		maxResults: '25',
		videoEmbeddable: 'true',
		type: 'video',
		q: '5-minute workout easy',
		r: 'json',
	};
	
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: request,
		type: "GET"
	})
	.done(function(result) {
		var x = getRandom(0, result.items.length);
		console.log(x);
		console.log(result.items[x].snippet.title);
		console.log(result.items[x].id.videoId);

		var videourl = "https://www.youtube.com/embed/" + result.items[x].id.videoId + "?html5=1";
		$('#workout-vid').attr('src', videourl);
		$('p.titleYT').text(result.items[x].snippet.title);
		});
};


$(document).ready(function() {

	$('input.submit').click(function() {

		if ($('input').val() == '') {
			console.log('empty input');
			return false
		}
	});

	$('div.add-item-icon').click(function(){
		$('div.add-entry').slideToggle();
	})


	$('div.nasa-selection').on('click', '.check', function() {
		console.log('nasa option clicked');
		$('div.grey-out.nasa').fadeIn(300);
        $('div.box.nasa').fadeIn(300);
        $('.nasa-box').show();
		
	});


	$('div.youtube-selection').on('click', '.check', function() {
		console.log('5-min workout selection');
		getWorkout();
		$('div.grey-out').fadeIn(300);
		$('div.box').fadeIn(300);
		$('.youtube-box').show();
		

	})

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
				$("#apod_explaination").text(result.explanation);
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