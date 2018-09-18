/**
 * Created by navidu on 9/13/18.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var del = require('del');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function(){
    // Concatenate vendor scripts
    var vendorStream = gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/popper.js/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./public/js'));

    // Concatenate AND minify app sources
    var appStream = gulp.src(['./src/js/*.js'])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({
            stream: true
        }));

    return merge(vendorStream, appStream);
});

//gulp.task('html', function(){
//    return gulp.src('./src/html/*.html')
//        .pipe(gulp.dest('./dist'))
//        .pipe(browserSync.reload({
//            stream: true
//        }));
//});

gulp.task('getbootstrap', function(){
    return gulp.src('./node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('fonts', function(){
    return gulp.src('./src/fonts/**/*.{ttf,otf}')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg|ico|xml|webmanifest)')
        .pipe(cache(imagemin({
            // Setting interlaced to true
            interlaced: true
        })))
        .pipe(gulp.dest('./public/img'));
});
//
//gulp.task('browserSync', function () {
//    browserSync.init({
//        server: {
//            baseDir: 'dist/'
//        }
//    });
//});
//
gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('src/html/**/*.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('clean:dist', function () {
    return del.sync('public');
});

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback);
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'js', 'getbootstrap', 'fonts', 'watch', 'images'],
        callback
    );
});

//gulp.task('default', function (callback) {
//    runSequence(['browserSync', 'watch'],
//        callback
//    );
//});

gulp.task('default',['sass','watch','getbootstrap', 'fonts', 'images', 'js']);



