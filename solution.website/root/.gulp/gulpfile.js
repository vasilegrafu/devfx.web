var gulp = require('gulp');

//
var gulp_sass = require('gulp-sass');
var gulp_sourcemaps = require('gulp-sourcemaps');
var gulp_rename = require('gulp-rename');
var browser_sync = require('browser-sync').create();

//
gulp.task('transpile:./../devfx/styles/bundle.scss', function () {
    return gulp.src('./../devfx/styles/bundle.scss', { allowEmpty: true })
        .pipe(gulp_sass().on('error', gulp_sass.logError))
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_sourcemaps.write(''))
        .pipe(gulp.dest('./../devfx/styles/'));
});

//
gulp.task('init:browser_sync', function(done) {
    browser_sync.init();
    done();
});
gulp.task('reload:browser_sync', function(done) {
    browser_sync.reload();
    done();
});

//
gulp.task('watch', function (done) {
    gulp.watch(['./../devfx/styles/*.scss'], gulp.series('transpile:./../devfx/styles/bundle.scss', 'reload:browser_sync'));
    gulp.watch(['./../styles/*.scss'], gulp.series('reload:browser_sync'));
    gulp.watch(['./../*.html'], gulp.series('reload:browser_sync'));
    done();
});

//
gulp.task('default', gulp.series('transpile:./../devfx/styles/bundle.scss',
                                 gulp.series('init:browser_sync', 'reload:browser_sync'),
                                 'watch'));

//--------------------------------------------------------------------------------
// Copy the following snippet into your website, just before the closing </body> tag
/* <script id="__bs_script__">
    //<![CDATA[
        document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.24.4'><\/script>".replace("HOST", location.hostname));
    //]]>
</script> */
//--------------------------------------------------------------------------------
