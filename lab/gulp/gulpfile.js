'use strict';

// sass compile
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

//*** SASS compiler task
gulp.task('sass', function (cb) {
  // bootstrap compilation
	gulp.src('./sass/bootstrap.scss').pipe(sourcemaps.init({loadMaps: true, debug: true})).pipe(sass()).pipe(cleancss()).pipe(sourcemaps.write('./')).pipe(gulp.dest('./resources/global/plugins/bootstrap/css/'));
    cb();
});

//*** SASS watch(realtime) compiler task
gulp.task('watch:scss', function () {
	return gulp.watch('./sass/**/*.scss', gulp.parallel('sass'));
});
