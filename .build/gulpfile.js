// Gulp Dependencies
var config = require('./config');
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var bower_concat = require('gulp-concat-vendor');

// Style Dependencies
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

// Test Dependencies (this should be fun :P)
var mochaPhantomjs = require('gulp-mocha-phantomjs');

// Handle concat'ing scripts for front end
gulp.task('js-scripts', function() {
		return gulp.src([config.jsPaths.customJs + '**/*.js', config.jsPaths.appJs + '**/*.js'])
	    	.pipe(concat('app.js'))
	    	.pipe(gulp.dest(config.jsPaths.jsDist));
});

// Handle compass 
gulp.task('compass', function() {
	  gulp.src(config.stylePaths.sassDir + '*/**.scss')
	    .pipe(compass({
		      css: config.stylePaths.cssDist,
		      sass: config.stylePaths.sassDir,
	    }))
	    .pipe(minifyCSS())
	    .pipe(gulp.dest(config.stylePaths.cssDist));
});

// Watch all the things and concat/sass
gulp.task('watch', function() {
  	gulp.watch(config.jsPaths.customJs + '**/*.js', ['js-scripts']);
  	gulp.watch(config.jsPaths.appJs + '**/*.js', ['js-scripts']);
  	gulp.watch(config.stylePaths.sassDir + '*/**.scss', ['compass']);
});

// Concat and minify bower components
gulp.task('vendors', function() {
	 gulp.src(config.jsPaths.bowerDir + '*')
	 .pipe(bower_concat('bower.js'))
	 .pipe(uglify())
   .pipe(gulp.dest(config.jsPaths.jsDist)); 
})

// Set default tasks
gulp.task('default', ['watch']);