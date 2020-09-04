var gulp = require('gulp');
var browser = require("browser-sync").create();
var minCss = require("gulp-minify-css");
var sass = require("gulp-sass");
var reload = browser.reload;
var fs = require('fs');


var paths = {
	sass : ['src/sass/*.scss']
}

function compileSass(fn) {
	gulp.src(paths.sass)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(minCss({
			keepSpecialComments: 0 
		}))
		.pipe(gulp.dest('src/css'));
}

function watchFile() {
	gulp.watch(paths.sass).on('change',function(){
		compileSass();
		reload();
	});
}

gulp.task('default',function(){
	browser.init({
		server: {
			baseDir : 'src',
			directory : true
		}
	});
	compileSass();
	watchFile();
});