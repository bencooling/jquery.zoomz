"use strict";

var gulp        = require('gulp')
  , qunit       = require('gulp-qunit')
  , sass        = require('gulp-sass')
  , uglify      = require('gulp-uglify')
  , minifyCSS   = require('gulp-minify-css')
  , browserSync = require('browser-sync')
  , rename      = require('gulp-rename')
  ;

// run qunit
gulp.task('qunit', function() {
  return gulp.src('tests/test-runner.html')
    .pipe(qunit());
});

// compile scss to css
gulp.task('sass', function() {
  gulp.src('src/jquery.zoomz.scss')
    .pipe(sass())
    .pipe(gulp.dest('src'));
});

// minify js
gulp.task('minify-js', function() {
  return gulp.src('src/jquery.zoomz.js')
    .pipe(uglify())
    .pipe(rename('jquery.zoomz.min.js'))
    .pipe(gulp.dest('src'));
});

// minify css
gulp.task('minify-css', function() {
  return gulp.src('src/jquery.zoomz.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename('jquery.zoomz.min.css'))
    .pipe(gulp.dest('src'));
});

// display qunit in browser
gulp.task('serve:demo', ['sass'], function(){
  browserSync(["demo.html", "src/jquery.zoomz.js"], {
    server: { 
      baseDir: "./",
      index: "demo.html"
    }});
});

gulp.task('serve:qunit', ['sass'], function(){
  browserSync({
    server: { 
      baseDir: ["./tests", "./"],
      index: "test-runner.html"
    }});
});

gulp.task('default', ['qunit'], function() {
  // run tests on src change
  gulp.watch(["src/**/*.*", "tests/tests.js"], ['qunit']);
});

gulp.task('minify', ['minify-css', 'minify-js'], function() {
});