var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('minify', function () {
  gulp.src('./consolator.js')
    .pipe(rename('consolator.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['minify']);
