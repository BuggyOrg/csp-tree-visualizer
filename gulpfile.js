var gulp = require('gulp')
var rollup = require('gulp-rollup')
var npm = require('rollup-plugin-npm')
var cjs = require('rollup-plugin-commonjs')

gulp.task('default', function () {
  gulp.src('src/main.js', {read: false})
    .pipe(rollup({format: 'iife', plugins: [
      npm({ jsnext: true, main: true }),
      cjs({ jsnext: true, main: true })]
    }))
    .pipe(gulp.dest('app'))
})
