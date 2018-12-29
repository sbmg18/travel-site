var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprites.css'
        }
      }
    }
  }
};

function createSprite() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprites/'));
}

function createPngCopy() {
    return gulp.src('./app/temp/sprites/css/*.svg')
      .pipe(svg2png())
      .pipe(gulp.dest('./app/temp/sprites/css'));
}

function copySpriteCSS() {
  return gulp.src('./app/temp/sprites/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
}

function copySpriteGraphic() {
  return gulp.src('./app/temp/sprites/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
}

function beginClean() {
  return del(['./app/temp/sprites', './app/assets/images/sprites']);
}

function endClean() {
  return del('./app/temp/sprites');
}

gulp.task('icons', gulp.series(beginClean, createSprite, createPngCopy, copySpriteCSS, copySpriteGraphic, endClean));
