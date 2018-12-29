var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

function injectModernizr() {
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
}

module.exports = injectModernizr;
