const gulp = require('gulp')
const sass = require('gulp-sass')
const connect = require('gulp-connect')
const open = require('open')

// 编译scss
gulp.task('sass', () => {
    return gulp
        .src('./dev/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('./dev'))
        .pipe(connect.reload())
})

// 监听scss编译
gulp.task('watch', () => {
    gulp.watch(['./dev/**/*.scss', './src/**/*'], {}, gulp.series('sass'))
})

// 启动服务
gulp.task('server', () => {
    connect.server({
        port: 8080,
        livereload: true,
        root: 'dev',
    })
})

// 打开浏览器
gulp.task('open', (done) => open("http://localhost:8080/") + done())

gulp.task('default', gulp.series('sass', 'open', gulp.parallel('server', 'watch')))