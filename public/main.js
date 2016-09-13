$(document).ready(function() {

	$('input.submit').click(function() {
		if ($('input').val() == '') {
			console.log('empty input');
			return false
		}
	});

	$('button').click(function() {
		$('input').val = '';
	});

	$('div.add-item-icon').click(function(){
		$('div.add-entry').slideToggle();
	});

	$('p.past-activities').click(function() {
		$('ul').slideToggle();
	});

	$('.mindComplete').click(function() {
		console.log('mindComplete clicked');
		var item = {
			activity: ''
		};
		var text = $(this).parent().children('div').html();
		item.activity = text;
		$.ajax('/mindComplete', {
	        type: 'POST',
	        data: JSON.stringify(item),
	        dataType: 'json',
	        contentType: 'application/json'
    	})
    	.done(function(){
    		// button disable?
		});
	});

	$('.bodyComplete').click(function() {
		console.log('bodyComplete clicked');
		var item = {
			activity: ''
		};
		var text = $(this).parent().children('div').html();
		item.activity = text;
		$.ajax('/main/bodyComplete', {
	        type: 'POST',
	        data: JSON.stringify(item),
	        dataType: 'json',
	        contentType: 'application/json'
    	})
    	.done(function(){
    		// button disable?
		});
	});

	$('.soulComplete').click(function() {
		console.log('soulComplete clicked');
		var item = {
			activity: ''
		};
		var text = $(this).parent().children('div').html();
		item.activity = text;
		$.ajax('/soulComplete', {
	        type: 'POST',
	        data: JSON.stringify(item),
	        dataType: 'json',
	        contentType: 'application/json'
    	})
    	.done(function(){
    		// button disable?
		});
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

*/


});