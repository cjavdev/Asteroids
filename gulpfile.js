var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  traceur = require('gulp-traceur'),
  concat = require('gulp-concat'),
  watch = require('gulp-watch');

var paths = {};
paths.scripts = [
  'src/util.js',
  'src/moving_object.js',
  'src/asteroid.js',
  'src/ship.js',
  'src/bullet.js',
  'src/game.js'
];

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(traceur())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
});
