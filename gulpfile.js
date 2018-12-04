const gulp = require('gulp')
const sass = require('gulp-sass')
const connect = require('gulp-connect')
const open = require('gulp-open')

gulp.task('sass', () => {
    return gulp
        .src('./dev/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./dev'))
        .pipe(connect.reload())
})

gulp.task('watch', () => {
    gulp.watch(['./dev/**/*', './src/**/*'], {}, ['sass'])
})

gulp.task('server', () => {
    connect.server({
        port: 8080,
        livereload: true,
        root: 'dev',
    })
})

gulp.task('open', () => {
    return gulp
        .src('')
        .pipe(open({
            uri: 'http://localhost:8080',
        }))
})

gulp.task('default', ['open', 'server', 'watch'])