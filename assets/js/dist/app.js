(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function($) {

	var App = {

		// Services	: require('Services/FriendActions'),
		//Models		: require(''),
		Custom		: require('./Custom/Friends'),
		Views		: require('./Views/FriendsView'),

	};

	App.Custom.init();

})(jQuery);
},{"./Custom/Friends":2,"./Views/FriendsView":3}],2:[function(require,module,exports){
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
module.exports = App;


},{}],3:[function(require,module,exports){
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

module.exports = FriendView;



},{}]},{},[1]);
