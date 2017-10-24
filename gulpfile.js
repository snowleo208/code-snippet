var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
var prettify = require('gulp-jsbeautifier');


gulp.task('sass', function () {
  return gulp
    .src('app/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //minify sass
    .pipe(sourcemaps.write())
    .pipe(autoprefixer('last 2 versions', '> 5%', 'Firefox ESR')) //use autoprefixer to set prefix
    .pipe(gulp.dest('app/css'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('js-min', function() {
  gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('images', function(){
  return gulp.src('app/image/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/image'))
});

gulp.task('css', function() {
  return gulp.src('app/css/**/*')
  .pipe(gulp.dest('dist/css'))
})

gulp.task('html-build', function(){
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('prettify', function() {
  gulp.src(['./*.css', './*.html', './*.js'])
    .pipe(prettify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('watch', ['browserSync'], function (){
  gulp.watch('app/sass/**/*.sass', ['sass']);  //watch sass changes
  gulp.watch('app/sass/**/*.sass').on('change', browserSync.reload);
  gulp.watch('app/*.html').on('change', browserSync.reload);
    //watch html changes
    gulp.watch('app/js/*.js').on('change', browserSync.reload);
  gulp.watch('app/image/**/*', ['images']); //watch image changes
  //gulp.watch('app/**/*.js', ['js-min']);  //watch js changes
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'html-build', 'images','css','js-min'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

