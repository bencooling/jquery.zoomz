"use strict";

var gulp  = require('gulp')
  , qunit = require('gulp-qunit')
  , sass  = require('gulp-sass')
  , browserSync  = require('browser-sync')
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
      baseDir: "tests",
      index: "test-runner.html"
    }});
});

gulp.task('default', ['qunit'], function() {
  gulp.watch();

  // run tests on src change
  gulp.watch(["src/**/*.*", "tests/tests.js"], ['qunit']);
});