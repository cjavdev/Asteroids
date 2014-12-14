var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src([
      'src/util.js',
      'src/moving_object.js',
      'src/asteroid.js',
      'src/ship.js',
      'src/bullet.js',
      'src/game.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(traceur())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js'));
});
