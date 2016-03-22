var gulp = require("gulp");
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require("path");
var nodemon = require("gulp-nodemon");

gulp.task("develop",function(){ //shut and restart the server
	nodemon({
		script:'app.js',
		ext:'jade js scss',
		tasks:['lint','sass'],
		ignore :['node_modules/','bin/'],
		env : {'NODE_ENV':'development'} 
	}).on('restart',function(){
		console.log("restarted!");
	})
});

gulp.task('lint',function(){ //hint the .js code
	gulp.src("public/javascripts/js/*.js")
		.pipe(jshint());
});

// gulp.task('script',function(){ // concat all the public js into one js file
// 	gulp.src("public/javascripts/js/*.js")
// 		.pipe(concat({path:'all.min.js'}))
// 		.pipe(uglify())
// 		.pipe(gulp.dest("./public/javascripts/"));	
// });

gulp.task('sass',function(){   // to transfer the .scss to .css
	gulp.src("public/stylesheets/sass/main.scss")
		.pipe(sass())
		.pipe(gulp.dest("public/stylesheets/"));
});

gulp.task('default',function(){
	gulp.run('lint','develop');

	gulp.watch('public/javascripts/js/*.js',function(){
		gulp.run('lint');
	});

	gulp.watch('public/stylesheets/sass/*.scss',function(){
		gulp.run('sass');
	})
});





