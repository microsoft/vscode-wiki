const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync');

const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(conf.path.src('**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(browserSync.stream());
}
