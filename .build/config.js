var config = {
		jsPaths: {
				customJs	: '../assets/js/custom/', // custom frontend dependencies
				vendorJs	: '../assets/js/vendor/', // third party vendor stuff
				appJs			: '../assets/js/app/', // backbone/angular/whatever app
				jsDist		: '../assets/js/dist/',
				bowerDir	: '../assets/js/vendor/bower_components/' // drop bower components in here

		},

		stylePaths: {
				sassDir 	: '../assets/sass/',
				sassMain 	: '../assets/sass/app.scss',
				cssDist		: '../assets/css/',
		}	
}


module.exports = config;