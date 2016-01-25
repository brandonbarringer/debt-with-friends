(function($){

	var App = {

		el: {
			friends : $('.js-friend'),
			done : $('.js-done'),
			add : $('.js-controls .add'),
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
			});

		},
		
		init: function() {
			App.bindEvents();
			App.updateCount();
		}
	}

	// Fire up the party
	App.init();

})(jQuery);
(function($) {

	var FriendView = Backbone.View.extend({

		el: $('.js-friends'),


		initialize: function() {
			_.bindAll(this, 'render');
			this.render();
		},


		// Fetch data from the server and render all friends
	    render: function(){
      		console.log( $(this.el) );
    	},

	});

	new FriendView();

})(jQuery);

