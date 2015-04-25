(function($){

	var friend = $('.friend');
	var done = $('.done')

	friend.on('click', function() {
		console.log( this );
		$(this).animate({marginLeft: '50%'})
	});

	done.on('click', function() {
		$(this).parent('.controls').next('.friend').animate({marginLeft: '1%'})
	})




})(jQuery);