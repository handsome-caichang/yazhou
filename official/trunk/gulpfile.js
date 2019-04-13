//@ts-check
'use strict';
/*
 *	1.less编译 压缩 合并 此处合并没有必要，一般预处理css都可以导包
 *	2.js合并 压缩 混淆
 *	3.img赋值
 *	4.html压缩
 */
 
// 在gulpfile中先载入gulp包，因为这个包提供了一些api
// 获取gulp包
var gulp = require('gulp');
 
// 1.获取sass包
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
// 2.cssnano压缩插件
var cssnano = require('gulp-cssnano');
 
// // 3.js合并插件 concat
// var concat = require('gulp-concat');
 
// // 4.js压缩混淆 uglify
// var uglify = require('gulp-uglify');
 
// 5.公共文件h二饼
//
var fileinclude = require('gulp-file-include');
 
// 6.html 压缩
var htmlmin = require('gulp-htmlmin');
 
// 7.启动服务器
// var browserSync = require('browser-sync');
var browserSync = require('browser-sync').create();
var reload=browserSync.reload
 
// 1：sass编译 压缩 合并
gulp.task('style',function(done){
	// 这里是在执行style任务是自动执行
	// 执行某个文件，不执行某个文件
	// gulp.src(['src/styles/*.scss','!src/styles/_*.less'])
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));
    done();
})
 
// 2.js合并 压缩混淆
gulp.task('js',function(done){
	gulp.src('src/js/*.js')
		// 合并 concat
		// .pipe(concat('all.js'))
		// 压缩混淆 uglify
		// .pipe(uglify())
		// 输出
		.pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream:true}));
    done();
});
 
// // 3.图片复制
gulp.task('images',function(done){
	gulp.src(['./src/images/**/*'])
		.pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.reload({stream:true}));
    done();
});
 
// 4.HTML处理
gulp.task('html',function(done){
    gulp.src('./src/*.html')
        .pipe(fileinclude({
            prefix: '@@',//变量前缀 @@include
            basepath: './src/_include',//引用文件路径
            indent:true//保留文件的缩进
        }))
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true,
			removeAttributeQuotes:true
		}))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
    done();
});


// gulp.task('fileinclude', function() {
//     gulp.src(['./src/*.html'])//主文件
//         .pipe(gulp.dest('./dist'));//输出文件路径
// });

gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir: ['dist/']
		},
	},function(err,bs){
		console.log(bs.options.getIn(['urls','local']));
	});
	// 自动监听文件
	gulp.watch('src/sass/*.scss',gulp.series('style'));
	// gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/images/*',gulp.series('images'));
	gulp.watch('./src/*.html',gulp.series('html'));
	gulp.watch('./src/**/*.html',gulp.series('html'));
})

gulp.task('default',gulp.series('images','style','js','html','serve'))