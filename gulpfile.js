var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var options = {
  sass: {
    outputStyle: 'expanded'
    // outputStyle: 'compressed'
  },
  prefix: {
    browsers: ['last 2 versions']
  }
}

gulp.task('scss', function() {
  gulp.src('scss/*.scss') // 來源檔案
  .pipe(sass(options.sass)) // 將sass編譯成css
  .pipe(prefix(options.prefix)) // prefix()加入廠商前綴，()內不加屬性則使用autoprefix的預設值
  .pipe(gulp.dest('./style')) // 要輸出的檔案,讓它輸出到source文件夾的上層
});

gulp.task('browser-sync', function() {
  browserSync.init(["style/*.css", "js/*.js"], {
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch("scss/*.scss", ['scss']).on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'scss', 'browser-sync']);  // 執行gulp時一併執行watch、pug、sass、browser-sync的指令
