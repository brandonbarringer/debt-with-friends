(function($) {

	var App = {

		Services	: require('Services/FriendActions'),
		Models		: '',
		Views		: require('./Views/FriendsView'),
		Custom		: require('./Custom/Friends'),

	};

	// Initaliate custom scripts
	App.Custom.init();

})(jQuery);