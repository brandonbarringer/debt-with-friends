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

module.exports = new FriendView;


