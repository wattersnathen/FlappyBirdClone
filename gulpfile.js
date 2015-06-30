var gulp = require('gulp');
var gulputil = require('gulp-util');
var browserify = require('browserify');
var sourceStream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('js', function () {
    return browserify('./js/main.js')
        .bundle()
        .pipe(sourceStream('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./js'))
});
    
gulp.task('watch', function () {
    gulp.watch(['./js/**/*.js', '!./js/app.js'], ['js']);
});
    
gulp.task('default', ['js', 'watch']);