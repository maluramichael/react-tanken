var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch');

var sourceFiles = 'src/**/*.js',
    htmlFiles = 'src/**/*.html';

gulp.task('build.js', function() {
    return gulp.src(sourceFiles)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build.js']);
