var gulp = require('gulp'),
    connect = require('gulp-connect'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');



gulp.task("js", function () {
  return browserify({entries: 'src/js/index.js', debug: true})
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/js'))
});
    
// gulp.task('trans', function(){
//     browserify('src/js/*.js')
    
//     .transform(babelify)
//     .pipe(gulp.dest('dist'));
// });