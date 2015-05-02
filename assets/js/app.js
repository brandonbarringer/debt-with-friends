(function($){

	var friend = $('.friend');
	var done = $('.done');
	var add = $('.controls .add');
	var addFriend = $('.navbar .add');
	var submit = $('.addFriend input[type="submit"]');
	var form = $('.addFriend');

	addFriend.on('click', function(){
		if(submit.val() === 'Success!') {
			submit.val('Invite')
		}
		if(form.hasClass('open')) {
			form.animate({height: '0px'}).removeClass('open');
		}
		else {
			form.animate({height: '40px'}).addClass('open');
		}
	});

	submit.on('click', function(e){
		e.preventDefault();
		$(this).val('Success!');
		form.delay(1200).animate({height: '0px'}).removeClass('open');

	})



	friend.on('click', function() {
		if( $(this).hasClass('open') ) {
			$(this).animate({marginLeft: '1%'}, 600, 'easeOutBack').removeClass('open');
		}
		else {
			$('.open').animate({marginLeft: '1%'}, 600, 'easeOutBack' ).removeClass('open')
			$(this).animate({marginLeft: '60%'}, 600, 'easeOutBack').addClass('open');
		}
	});


	done.on('click', function() {
		var openFriend = $(this).parents('.controls').next('.open');
		openFriend.animate({marginLeft: '1%'}, 600, 'easeOutBack' ).removeClass('open')
	});

	add.each(function(idx) {
		var ones = $(this).prev('.number').find('.ones');
		var tens = $(this).prev('.number').find('.tens');
		var indebt = $(this).parents('li').data('indebt');
		var count = $(this).parents('li').data('count');
		var marginIncrement = $(this).parents('li').height();
		var marginReset = 0
		var negMarginReset = 540;
		var speed = 300;
		var easing = 'easeOutBack';

		$updateCount = function(val) {
			var margin = marginIncrement;
			var onesStr;
			var tensStr;

			val = Math.abs(val)

			if( val < 10) {
				onesStr = val.toString()[0];
				ones.css({marginTop: -margin*Number(onesStr)});
			}
			else if (val >= 10) {
				onesStr = val.toString()[1];
				tensStr = val.toString()[0];
				ones.css({marginTop: -margin*Number(onesStr)});
				tens.css({marginTop: -margin*Number(tensStr)});
			}
		}

		$updateDebt = function(el, val) {
			$(el).parents('li').attr('data-inDebt', val);
			indebt = val
		} 

		$updateCount(count);

		$(this).on('click', function(){
			count ++
			$(this).parents('li').attr('data-count', count);

			if(count > 0) {
				$updateDebt(this, -1);
			}
			else if(count < 0){
				$updateDebt(this, 1);

			}
			else {
				$updateDebt(this, 0);
			}

			if( count > 0 && count % 10 === 0 ) {
				ones.animate({marginTop: marginReset}, speed, easing);
				tens.animate({marginTop: '-=' + marginIncrement}, speed, easing);
			} 
			else if( count < 0 && count % 10 === 0) {
				ones.animate({marginTop: marginReset}, speed, easing);
			}
			else if( count < 0 && count % 10 !== -9 ) {
				ones.animate({marginTop: '+=' + marginIncrement}, speed, easing);
			}
			else if( count < 0 && count % 10 === -9 ) {
				tens.animate({marginTop: '+=' + marginIncrement}, speed, easing);
				ones.animate({marginTop: '-=' + negMarginReset}, speed, easing);
			}
			else if (count === 0) {
				tens.animate({marginTop: marginReset}, speed, easing);
				ones.animate({marginTop: 	marginReset}, speed, easing);
			}
			else {
				ones.animate({marginTop: '-=' + marginIncrement}, speed, easing);
			}
		});
		
	});


})(jQuery);