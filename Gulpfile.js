var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('default', function () {
  return gulp.src('./client/lib/jsx/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./client/lib'));
});

gulp.task('watch', function(){
	gulp.watch('./client/lib/jsx/**/*.jsx',['default']);
});