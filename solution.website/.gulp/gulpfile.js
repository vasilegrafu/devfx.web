var gulp = require('gulp');

//
var gulp_sass = require('gulp-sass');
var gulp_sourcemaps = require('gulp-sourcemaps');
var gulp_rename = require('gulp-rename');
var browser_sync = require('browser-sync').create();

//
gulp.task('transpile:./../fx/devfx/sass/bundle.scss', function () {
    return gulp.src('./../fx/devfx/sass/bundle.scss', { allowEmpty: true })
        .pipe(gulp_sass().on('error', gulp_sass.logError))
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_sourcemaps.write(''))
        .pipe(gulp.dest('./../fx/devfx/sass/'));
});

//
gulp.task('transpile:./../sass/bundle.scss', function () {
    return gulp.src('./../sass/bundle.scss', { allowEmpty: true })
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_sass().on('error', gulp_sass.logError))
        .pipe(gulp_sourcemaps.write(''))
        .pipe(gulp.dest('./../sass/'));
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
    gulp.watch(['./../fx/devfx/sass/*.scss'], gulp.series('transpile:./../fx/devfx/sass/bundle.scss', 'reload:browser_sync'));
    gulp.watch(['./../fx/devfx/sass/*.html'], gulp.series('reload:browser_sync'));

    gulp.watch(['./../fx/devfx/sass/*.scss', './../sass/*.scss'], gulp.series('transpile:./../sass/bundle.scss', 'reload:browser_sync'));
    gulp.watch(                             ['./../sass/*.html'], gulp.series('reload:browser_sync'));

    done();
});

//
gulp.task('default', gulp.series('transpile:./../fx/devfx/sass/bundle.scss',
                                 'transpile:./../sass/bundle.scss',
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
