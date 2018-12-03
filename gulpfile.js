const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass', () => {
    return gulp
        .src('./dev/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./dev'))
})

gulp.task('default', function () {
    gulp.watch(['./dev/**/*.scss', './src/**/*.scss'], {}, ['sass'])
})