const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

function compilerSass() {
  return src(['./assets/css/styles.scss'])
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(rename('styles.min.css'))
    .pipe(dest('./dist/css'));
}

function jsMin() {
  return src([
    // './assets/js/sitemode.js',
    './assets/js/main.js',
    './assets/js/cursor.js',
    //'./assets/js/frontpage/frontpage.js',
    //'./assets/js/careers.js',
  ])
    .pipe(terser())
    .pipe(concat('main.js'))
    .pipe(rename('main.min.js'))
    .pipe(dest('./dist/js'));
}

function watchTask() {
  watch('./assets/css/*.scss', compilerSass);
  watch('./assets/css/*/*.scss', compilerSass);
  watch('./assets/css/*/*/*.scss', compilerSass);
  watch('./assets/js/*.js', jsMin);
  watch('./assets/js/*/*.js', jsMin);
  watch('./assets/js/main.js', jsMin);
}
exports.default = series(compilerSass, jsMin, watchTask);
