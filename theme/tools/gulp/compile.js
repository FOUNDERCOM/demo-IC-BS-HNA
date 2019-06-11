var gulp = require('gulp');
var yargs = require('yargs');
var build = require('./build');
var func = require('./helpers');
var rename = require('gulp-rename');
var glob = require('glob');
var fs = require('fs');
var pretty = require('pretty');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var del = require('del');

// merge with default parameters
var args = Object.assign({
    prod: false,
    exclude: '',
    theme: '',
    demo: '',
    path: '',
}, yargs.argv);

if (args.prod !== false) {
    // force disable debug for production
    build.config.debug = false;
    build.config.compile = Object.assign(build.config.compile, {
        'jsUglify': true,
        'cssMinify': true,
        'jsSourcemaps': false,
        'cssSourcemaps': false,
    });
}

if (args.demo !== '') {
    build.config.demo = args.demo;
}

// task to bundle js/css
gulp.task('build-bundle', function (cb) {
    // build by demo, leave demo empty to generate all demos
    if (typeof build.config.demo !== 'undefined' && build.config.demo !== '') {
        for (var demo in build.build.demos) {
            if (!build.build.demos.hasOwnProperty(demo)) {
                continue;
            }

            var splitDemos = build.config.demo.split(',').map(function (item) {
                return item.trim();
            });
            if (splitDemos.indexOf(demo) === -1) {
                delete build.build.demos[demo];
            }
        }
    }

    //exclude by demo
    if (args.exclude !== '' && typeof args.exclude === 'string') {
        var exclude = args.exclude.split(',');
        exclude.forEach(function (demo) {
            delete build.build.demos[demo];
        });
    }

    func.objectWalkRecursive(build.build, function (val, key) {
        if (val.hasOwnProperty('src')) {
            if (val.hasOwnProperty('bundle')) {
                func.bundle(val);
            }
            if (val.hasOwnProperty('output')) {
                func.output(val);
            }
        }
    });
    cb();
});

var tasks = ['clean'];

tasks.push('build-bundle');

// entry point
gulp.task('default', gulp.series(tasks));

// html formatter
gulp.task('html-formatter', function (cb) {
    var dir = args.path;
    if (dir === '') {
        console.log('The option --path is required');
        cb();
        return;
    }
    glob(process.cwd() + '/' + dir + '/**/*.html',
        // ignore assets folder
        {ignore: [process.cwd() + '/' + dir + '/assets/**'],},
        function (er, files) {
            files.forEach(function (path) {
                fs.readFile(path, {encoding: 'UTF-8'}, function (err, data) {
                    if (err) {
                        throw err;
                    }
                    var formatted = pretty(data, {
                        ocd: true,
                        indent_size: 1,
                        indent_char: '\t',
                        unformatted: ['code', 'pre', 'em', 'strong'],
                    });
                    fs.writeFile(path, formatted, function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log(path + ' formatted!');
                    });
                });
            });
        });
    cb();
});

// copy demo from src to dist folder
gulp.task('html', function (cb) {
    gulp.src(process.cwd() + '/../src/demo*/**')
        .pipe(gulp.dest('../dist'));
    cb();
});

// build default and copy demo from src to dist folder
var buildTasks = ['html'];
buildTasks.push('build-bundle');
gulp.task('build', gulp.series(buildTasks));
