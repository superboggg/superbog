var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var concat = require(config.nm + 'gulp-concat');
var uglify = require(config.nm + 'gulp-uglify');
if (config.enable_browser_sync) {
    var browserSync = require('browser-sync');
}

var output_path = config.build_path + 'js/';
var output_file = 'application.min.js';

var src_files = [
                // config.src_path + "bower_components/angular/angular.min.js",
                config.src_path + "js/**/*",
                config.src_path + "js/*"
            ];

var watch_files = [
                config.src_path + "js/**/*",
                config.src_path + "js/*"
            ];

/**
 * Minify and copy all scripts to build path.
 *
 * @return
 */
gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor script)
	return gulp.src(src_files)
        .pipe(concat(output_file).on('error', gutil.log))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest(output_path));
});

gulp.task('scripts-reload', function() {
    if (config.enable_browser_sync) {
        setTimeout(function() {
            gulp.src(output_path + output_file).pipe(browserSync.reload({stream:true}));
        }, 600);
    }
});

gulp.task('scripts-watch', function() {
    gulp.watch(watch_files, ['scripts', 'scripts-reload']);
});
