var gulp = require('gulp');
var build = require('./build');

// localhost site
var connect = require('gulp-connect');
gulp.task('localhost', function (cb) {
    connect.server({
        root: '../dist',
        livereload: true
    });
    cb();
});
gulp.task('reload', function (cb) {
    connect.reload();
    cb();
});

gulp.task('watch', function () {
    return gulp.watch(
        [
            './../src/demo*/**/*.html',
            './../src/demo*/**/*.svg',
            build.config.path.src + '/media/**/*.*',
            build.config.path.src + '/**/*.js',
            build.config.path.src + '/**/*.scss'
        ],
        gulp.series(['build', 'reload']));
});

gulp.task('watch:html', function () {
    return gulp.watch('./../src/demo*/**/*.html', gulp.series(['html', 'reload']));
});

gulp.task('watch:scss', function () {
    return gulp.watch(build.config.path.src + '/**/*.scss', gulp.series(['build-bundle', 'reload']));
});

gulp.task('watch:js', function () {
    return gulp.watch(build.config.path.src + '/**/*.js', gulp.series(['build-bundle', 'reload']));
});

// quick development tasks
// 1. clean
var quickDevTasks = ['clean'];
// 2. copy html and build the js and sass
quickDevTasks.push('build');
// 3. start the server
quickDevTasks.push('localhost');
// 4. watch the html, js and sass
quickDevTasks.push('watch');
gulp.task('quickdev', gulp.series(quickDevTasks));
