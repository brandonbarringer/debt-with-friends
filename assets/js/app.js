(function($){

	var friend = $('.friend');
	var done = $('.done');
	var add = $('.add');
	var count = 0;

	friend.on('click', function() {
		if( $(this).hasClass('open') ) {
			$(this).animate({marginLeft: '1%'}, 600, 'easeOutBack').removeClass('open');
		}
		else {
			$(this).animate({marginLeft: '60%'}, 600, 'easeOutBack').addClass('open');
		}
	});

	done.on('click', function() {
		$('.open').animate({marginLeft: '1%'}, 600, 'easeOutBack' ).removeClass('open')
	});

	add.on('click', function(){
		var ones = $(this).prev('.number').find('.ones');
		var tens = $(this).prev('.number').find('.tens');
		count ++
		console.log( count );
		if( count % 10 === 0 ) {
			ones.animate({marginTop:'0'}, 300, 'easeOutBack')
			tens.animate({marginTop:'-=60'}, 300, 'easeOutBack')
		} 
		else {
			ones.animate({marginTop:'-=60'}, 300, 'easeOutBack')
		}
	})






})(jQuery);