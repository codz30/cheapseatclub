
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

var paths = {
  sass: './assets/sass/main.scss'
};

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['./assets/css/main.css']);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['sass']);

