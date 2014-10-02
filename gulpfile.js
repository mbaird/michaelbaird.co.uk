var gulp = require('gulp');

var child   = require('child_process'),
    connect = require('gulp-connect'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    del     = require('del');

var paths = {
  sass: '_sass/*.scss'
};

gulp.task('connect', function() {
  connect.server({
    root: '_site',
    port: 3000
  });
});

gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('build', function(cb) {
  del(['_site'], cb);
  child.spawn('jekyll', ['build', '--watch'], { stdio: 'inherit' });
});

gulp.task('default', ['sass', 'build', 'connect', 'watch']);
