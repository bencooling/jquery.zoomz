"use strict";

var gulp        = require('gulp')
  , qunit       = require('gulp-qunit')
  , sass        = require('gulp-sass')
  , uglify      = require('gulp-uglify')
  , minifyCSS   = require('gulp-minify-css')
  , browserSync = require('browser-sync')
  , rename      = require('gulp-rename')
  , rjs         = require('gulp-requirejs')
  ;

/*
 * tests
 * -------------------------------------------- */
gulp.task('qunit', function() { // run qunit
  return gulp.src('tests/test-runner.html')
    .pipe(qunit());
});

/*
 * dist directory
 * -------------------------------------------- */
gulp.task('copy:dist', function(){ // copy src to dist
  gulp.src('src/jquery.zoomz.*', {base:'src'})
    .pipe(gulp.dest('dist'));
});
gulp.task('sass:dist', function() { // compile scss to css
  gulp.src('src/jquery.zoomz.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

/*
 * github.io page assets 
 * -------------------------------------------- */
gulp.task('sass:page', function() { // compile scss to css
  gulp.src('assets/scss/main.scss')
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('assets'));
});

gulp.task('requirejs:page', function() {
  rjs({
    baseUrl: './'
  , name: 'assets/vendor/almond/almond'
  , include: ['assets/js/main']
  , insertRequire: ['assets/js/main']
  , out: 'script.js'
  , wrap: true
  , mainConfigFile: 'assets/js/main.js'
  })
  .pipe(gulp.dest('assets'));
});

/*
 * local webserver
 * -------------------------------------------- */
gulp.task('serve:page', ['sass:page', 'requirejs:page'], function(){ // display page in browser
  browserSync(["index.html", "assets/script.js", "assets/style.css"], {
    server: { 
      baseDir: "./",
      index: "index.html"
    }});
  gulp.watch("assets/scss/*.scss", ['copy:dist', 'sass:page']);
  gulp.watch("src/**.*", ['copy:dist', 'requirejs:page']);
});
gulp.task('serve:qunit', ['sass'], function(){ // display qunit in browser
  browserSync({
    server: { 
      baseDir: ["./tests", "./"],
      index: "test-runner.html"
    }});
});

/*
 * tasks
 * -------------------------------------------- */
gulp.task('default', ['qunit'], function() {
  // run tests on src change
  gulp.watch(["src/**/*.*", "tests/tests.js"], ['qunit']);
});