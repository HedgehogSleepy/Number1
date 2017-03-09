/**
 *1.less 编译，压缩，合并
 *2.js合并，压缩混淆】
 *3.image复制
 *4.HTML压缩复制
 *5.浏览器同步
 * 
 */
'use strict';

var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync=require('browser-sync').create();

var replace=require('gulp-replace');
var imagemin = require('imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');

 //1.less 编译，压缩，合并
gulp.task('less',function(){
	gulp.src(['src/less/*.less','!src/less/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});
//2.js合并，压缩混淆】
gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});
// *3.image复制
// 
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.stream());
});

// *4.HTML压缩复制

gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

// *5.浏览器同步
// 
gulp.task('serve',['less','js','image','html'],function(){
	browserSync.init({
		server:{
			baseDir:'./dist'
		}
	});

	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});

//文本替换

gulp.task('temp',function(){
	gulp.src(['file/file.txt'])
		.pipe(replace('bar','foo'))
		.pipe(gulp.dest('dist/file'));
	
});

//图片压缩
//

imagemin(['src/images/*.{jpg,png}'], 'dist/images', {
    plugins: [
        imageminMozjpeg({targa: true}),
        imageminPngquant({quality: '65-80'})
    ]
}).then(files => {
    console.log(files);
    
});







