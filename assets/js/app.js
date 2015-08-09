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

				$(this).attr('data-inDebt', debt);
			})
		},
		updateCount: function() {
			var numbers = App.el.numbers;
			var count;
			$(numbers).each(function() {
				var currentCount = $(this).parents('li').data('count');
				od = new Odometer({
				  el: this,
				  value: currentCount
				});

				$.extend($(this), od)

				$(this).on('addNumber', function(){
					currentCount ++
					$(this).context.odometer.update(currentCount);
					App.updateInDebt();
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


})(jQuery);