var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
del = require('del'),
browserSync = require('browser-sync').create();

var styles = require('./styles');
var scripts = require('./scripts');

function deleteDistFolder(done) {
  del("./docs");
  done();
}

function copyGeneralFiles() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**',
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'));
}

function optimizeImages() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
}

function copyAndMinifyFiles() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev();}, function() {return cssnano();}],
      js: [function() {return rev();}, function() {return uglify();}]
    }))
    .pipe(gulp.dest('./docs'));
}

function previewDist() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'docs'
    }
  });
}

gulp.task('build', gulp.series(scripts, styles, deleteDistFolder, optimizeImages, copyAndMinifyFiles, copyGeneralFiles, previewDist));
