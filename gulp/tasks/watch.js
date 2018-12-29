var gulp = require('gulp'),
browserSync = require('browser-sync').create();

var styles = require('./styles');
var scripts = require('./scripts');
var modernizr = require('./modernizr');

function reload(done) {
  browserSync.reload();
  done();
}

function cssInject() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(browserSync.stream());
}

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });
  gulp.watch('./app/index.html', reload);
  gulp.watch('./app/assets/styles/**/*.css', gulp.series(styles, cssInject));
  gulp.watch('./app/assets/scripts/**/*.js', gulp.series(modernizr, scripts, reload));
});
