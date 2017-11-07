let gulp = require('gulp'),
  svgSprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename'),
  del = require('del'),
  svg2png = require('gulp-svg2png-node7fix');

const config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng() {
          return function (sprite, render) {
            return render(sprite)
              .split('.svg')
              .join('.png');
          };
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
};

gulp.task('beginClean', () => del(['./app/temp/sprite', './app/assets/images/sprites']));

gulp.task('createSprite', ['beginClean'], () => (gulp
  // grab all the svgs inside the icons folder
  .src('./app/assets/images/icons/**/*.svg')
  // use the template var
  .pipe(svgSprite(config))
  // output generated sprite to time file
  .pipe(gulp.dest('./app/temp/sprite/'))));

gulp.task('createPngCopy', ['createSprite'], () => gulp
  .src('./app/temp/sprite/css/*.svg')
  .pipe(svg2png())
  .pipe(gulp.dest('./app/temp/sprite/css')));

gulp.task('copySpriteGraphic', ['createPngCopy'], () => gulp
  .src('./app/temp/sprite/css/**/*.{svg,png}')
  .pipe(gulp.dest('./app/assets/images/sprites')));

gulp.task('copySpriteCSS', ['createSprite'], () => (gulp
  // grab all the sprites generated
  .src('./app/temp/sprite/css/*.css')
  // rename to partial `_sprites`
  .pipe(rename('_sprite.css'))
  // copy file and move copy to modules directory
  .pipe(gulp.dest('./app/assets/styles/modules'))));

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], () => del('./app/temp/sprite'));

gulp.task('icons', [
  'beginClean',
  'createSprite',
  'createPngCopy',
  'copySpriteGraphic',
  'copySpriteCSS',
  'endClean'
]);
