(function($){

	var App = {

		el: {
			friends : $('.friend'),
			done : $('.done'),
			add : $('.controls .add'),
			addFriend : $('.navbar .add'),
			submit : $('.addFriend input[type="submit"]'),
			form : $('.addFriend'),
			numbers: $('.number')
		},
		friend: {
			actions: {
				open: function() {
					var openPos = $(this).prev('.controls').width();
					$(this).animate({ left: openPos },
						App.friend.anim.speed,
						App.friend.anim.easing
					).addClass('open')
				},
				close: function() {
					var offset = $(this).prev('.controls').offset();
					var closePos = offset.left;
					$(this).animate({ left: closePos },
						App.friend.anim.speed,
						App.friend.anim.easing
					).removeClass('open')
				},
			},
			anim: {
				speed: 400,
				easing: 'easeOutBack'
			}
		},
		makeFriend: function(name, currency, debtAmount) {
			this.name = name;
			this.currency = currency;
			this.debt = debtAmount;
			console.log( this );
		},
		updateInDebt: function() {
			var items = $('ul li');
			items.each(function(idx) {
				var debt = $(this).data('indebt');
				var count = $(this).data('count');

				if (count > 0) {
					debt = -1
				} else if (count < 0) {
					debt = 1
				} else {
					debt = 0;
				}
			})
		},
		updateCount: function() {
			var numbers = App.el.numbers;
			var count;
			$(numbers).each(function() {
				var currentCount = Math.abs( $(this).parents('li').data('count') );
				od = new Odometer({
				  el: this,
				  value: currentCount
				});

				$.extend($(this), od)

				$(this).on('addNumber', function(){
					currentCount ++
					$(this).context.odometer.update(currentCount)
				});

				od.update(currentCount);

			});
		},
		bindEvents: function () {

			App.el.friends.each(function() {

				$.extend(this, App.friend.actions);

				$(this).on('click', function() {
					$(this).hasClass('open') ? this.close() : ( $('.open').trigger('close'), this.open() )
				});

			});

			App.el.done.on('click', function() {
				 var friend = $(this).parent().siblings('.friend');
				 friend.trigger('close');
			});

			App.el.add.on('click', function() {
				$(this).siblings('.number').trigger('addNumber');
				App.updateInDebt();
			});

		},
		init: function() {

			App.bindEvents();
			App.updateCount();
			App.makeFriend();
			
		}

	}

	App.init();


	

	// addFriend.on('click', function(){
	// 	if(submit.val() === 'Success!') {
	// 		submit.val('Invite')
	// 	}
	// 	if(form.hasClass('open')) {
	// 		form.animate({height: '0px'}).removeClass('open');
	// 	}
	// 	else {
	// 		form.animate({height: '40px'}).addClass('open');
	// 	}
	// });

	// submit.on('click', function(e){
	// 	e.preventDefault();
	// 	$(this).val('Success!');
	// 	form.delay(1200).animate({height: '0px'}).removeClass('open');

	// })



	


	// done.on('click', function() {
	// 	var openFriend = $(this).parents('.controls').next('.open');
	// 	openFriend.animate({marginLeft: '1%'}, 600, 'easeOutBack' ).removeClass('open')
	// });

	// add.each(function(idx) {
	// 	var ones = $(this).prev('.number').find('.ones');
	// 	var tens = $(this).prev('.number').find('.tens');
	// 	var indebt = $(this).parents('li').data('indebt');
	// 	var count = $(this).parents('li').data('count');
	// 	var marginIncrement = $(this).parents('li').height();
	// 	var marginReset = 0
	// 	var negMarginReset = 540;
	// 	var speed = 300;
	// 	var easing = 'easeOutBack';

	// 	$updateCount = function(val) {
	// 		var margin = marginIncrement;
	// 		var onesStr;
	// 		var tensStr;

	// 		val = Math.abs(val)

	// 		if( val < 10) {
	// 			onesStr = val.toString()[0];
	// 			ones.css({marginTop: -margin*Number(onesStr)});
	// 		}
	// 		else if (val >= 10) {
	// 			onesStr = val.toString()[1];
	// 			tensStr = val.toString()[0];
	// 			ones.css({marginTop: -margin*Number(onesStr)});
	// 			tens.css({marginTop: -margin*Number(tensStr)});
	// 		}
	// 	}

	// 	$updateDebt = function(el, val) {
	// 		$(el).parents('li').attr('data-inDebt', val);
	// 		indebt = val
	// 	} 

	// 	$updateCount(count);

	// 	$(this).on('click', function(){
	// 		count ++
	// 		$(this).parents('li').attr('data-count', count);

	// 		if(count > 0) {
	// 			$updateDebt(this, -1);
	// 		}
	// 		else if(count < 0){
	// 			$updateDebt(this, 1);

	// 		}
	// 		else {
	// 			$updateDebt(this, 0);
	// 		}

	// 		if( count > 0 && count % 10 === 0 ) {
	// 			ones.animate({marginTop: marginReset}, speed, easing);
	// 			tens.animate({marginTop: '-=' + marginIncrement}, speed, easing);
	// 		} 
	// 		else if( count < 0 && count % 10 === 0) {
	// 			ones.animate({marginTop: marginReset}, speed, easing);
	// 		}
	// 		else if( count < 0 && count % 10 !== -9 ) {
	// 			ones.animate({marginTop: '+=' + marginIncrement}, speed, easing);
	// 		}
	// 		else if( count < 0 && count % 10 === -9 ) {
	// 			tens.animate({marginTop: '+=' + marginIncrement}, speed, easing);
	// 			ones.animate({marginTop: '-=' + negMarginReset}, speed, easing);
	// 		}
	// 		else if (count === 0) {
	// 			tens.animate({marginTop: marginReset}, speed, easing);
	// 			ones.animate({marginTop: 	marginReset}, speed, easing);
	// 		}
	// 		else {
	// 			ones.animate({marginTop: '-=' + marginIncrement}, speed, easing);
	// 		}
	// 	});
		
	// });


})(jQuery);