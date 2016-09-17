$(document).ready(function() {

	$('input.submit').click(function() {
		if ($('input').val() == '') {
			console.log('empty input');
			return false
		};
	});

	$('input.submit.signup').click(function() {
		if ($('input.password2').val() !== $('input#password').val()) {
			console.log('password mismatch');
			console.log($('input.password2').val());
			console.log($('input#password').val());
			return false;
		};
	});

	$('button').click(function() {
		$('input').val = '';
	});

	$('div.add-item').click(function(){
		$('div.add-entry').slideToggle();
	});

	$('p.past-activities').click(function() {
		$('ul').slideToggle();
	});

	$('.mindComplete').click(function() {
		console.log('mindComplete clicked');
		var item = {
			activity: '',
			index: ''
		};
		$(this).parent().children('div').toggleClass('marked');
		var text = $(this).parent().children('div').html();
		var id = $(this).parent().data('id');
		item.activity = text;
		item.index = id;
		$.ajax('/mindComplete', {
	        type: 'POST',
	        data: JSON.stringify(item),
	        dataType: 'json',
	        contentType: 'application/json'
    	})
    	.done(function(item){
    		console.log(item.completion[0].Mind);
			location.reload();
		});
	});


	$('.bodyComplete').click(function() {
		console.log('bodyComplete clicked');
		var item = {
			activity: '',
			index: ''
		};
		$(this).parent().children('div').toggleClass('marked');
		var text = $(this).parent().children('div').html();
		var id = $(this).parent().data('id');
		item.activity = text;
		item.index = id;
		$.ajax('/bodyComplete', {
	        type: 'POST',
	        data: JSON.stringify(item),
	        dataType: 'json',
	        contentType: 'application/json'
    	})
    	.done(function(item){
    		console.log(item.completion[0].Body);
    		location.reload();
		});
	});

	$('.soulComplete').click(function() {
		console.log('soulComplete clicked');
		var item = {
			activity: '',
			index: ''
		};
		$(this).parent().children('div').toggleClass('marked');
		var text = $(this).parent().children('div').html();
		var id = $(this).parent().data('id');
		item.activity = text;
		item.index = id;
		$.ajax('/soulComplete', {
	        type: 'POST',
	        data: JSON.stringify(item),
	        dataType: 'json',
	        contentType: 'application/json'
    	})
    	.done(function(item){
    		console.log(id);
    		console.log(item.completion[0].Soul);
    		location.reload();
		});
	});

});