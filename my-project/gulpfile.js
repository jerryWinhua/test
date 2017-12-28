'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var compass = require('compass');

// 架設網站
gulp.task('serve', function() {
  browserSync({
    server: {
      //載入的資料夾
      baseDir: 'src'
    }
  });
  //載入的檔案
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'src'}, reload);
});




// // 在这里添加自定义 browserify 选项
// var customOpts = {
//   entries: ['js/index.js'],
//   debug: true
// };
// var opts = assign({}, watchify.args, customOpts);
// var b = watchify(browserify(opts));

// // 在这里加入变换操作
// // 比如： b.transform(coffeeify);

// gulp.task('js', bundle); // 这样你就可以运行 `gulp js` 来编译文件了
// b.on('update', bundle); // 当任何依赖发生改变的时候，运行打包工具
// b.on('log', gutil.log); // 输出编译日志到终端

// function bundle() {
//   return b.bundle()
//     // 如果有错误发生，记录这些错误
//     .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//     .pipe(source('bundle.js'))
//     // 可选项，如果你不需要缓存文件内容，就删除
//     .pipe(buffer())
//     // 可选项，如果你不需要 sourcemaps，就删除
//     .pipe(sourcemaps.init({ loadMaps: true })) // 从 browserify 文件载入 map
//     // 在这里将变换操作加入管道
//     .pipe(sourcemaps.write('./')) // 写入 .map 文件
//     .pipe(gulp.dest('./dist'));
// }


// gulp.task('javascript', function () {
//   // 在一个基础的 task 中创建一个 browserify 实例
//   var b = browserify({
//     entries: './entry.js',
//     debug: true
//   });

//   return b.bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({ loadMaps: true }))
//     // 在这里将转换任务加入管道
//     .pipe(uglify())
//     .on('error', gutil.log)
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/js/'));
// });


//合併CSS 
gulp.task('concat-css', function () {
  return gulp.src('./src/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css'));
});
//合併JS
gulp.task('concat-js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

//壓縮醜化JS
gulp.task('compress-js', function (cb) {
  pump([
        gulp.src('./dist/js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});
//壓縮CSS
gulp.task('minify-css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(gulp.dest('dist/css'));
});
 
 //autoprefixer
gulp.task('autoprefixer', () =>
    gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'))
);

//sass  
gulp.task('sass', function () {
  return gulp.src('./src/sass/indexSass.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/*.sass', ['sass']);
});