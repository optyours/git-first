'use strict';
// 载入Gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano=require('gulp-cssnano');
var htmlmin=require('gulp-htmlmin');
var uglify=require('gulp-uglify');
var browserSync = require('browser-sync');
//移动html,并且压缩
gulp.task('removehtml', function() {
    gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('destnation/'));
});
//将less转为css
gulp.task('less', function () {
    gulp.src('./src/styles/*.less')
    .pipe(less())
    .pipe(cssnano())/*压缩css文件*/
    .pipe(gulp.dest('./destnation/css/styles'));
});
//将js压缩
gulp.task('script',function(){
   gulp.src('./src/scripts/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('./destnation/js'))

});
//创建一个本地服务器运行
gulp.task('serve',function(){
    browserSync({
    notify: false,
    port: 2015,
    server: {
      baseDir: ['destnation']
    }});
	gulp.watch('src/index.html',['removehtml']);/*监视html文件*/
	gulp.watch('src/styles/*.less',['less']);/*监视less文件*/
	gulp.watch('src/scripts/*.js',['script']);
});


