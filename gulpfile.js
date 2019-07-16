const gulp              = require('gulp')
const gulpLoadPlugins   = require('gulp-load-plugins')

const babel             = require('gulp-babel')
const browserSync       = require('browser-sync').create()
const browserify        = require('gulp-browserify')
const del               = require('del')
const runSequence       = require('run-sequence')

const $ = gulpLoadPlugins()
const reload = browserSync.reload

let dev = process.env.NODE_ENV !== 'production'

// Pug
function htmlTask() {
    return gulp.src('./assets/html/**/*.pug')
        .pipe($.plumber())
        .pipe($.pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        // .pipe(reload({stream:true}))
}

// CSS
const cssTask = () => {
    return gulp.src('./assets/css/**/*.css')
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest('./dist/css'))
}

// SASS
const sassTask = () => {
    return gulp.src('./assets/sass/*.sass')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe($.if(!dev, $.cssmin()))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({stream:true}))
}


// JS
const jsTask = () => {
    return gulp.src('./assets/js/**/*.js')
        .pipe($.plumber())
        .pipe(babel())
        .pipe(browserify())
        .pipe($.if(!dev, $.uglify()))
        .pipe($.concat('build.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream: true}))
}

// Images
const imagesTask = () => {
    return gulp.src('./assets/img/**/*')
        .pipe($.plumber())
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('./dist/img'));
}

// Fonts
const fontsTask = () => {
    return gulp.src('./assets/fonts/**/*')
        .pipe($.plumber())
        .pipe($.flatten())
        .pipe(gulp.dest('./dist/fonts'))
}

// Clean dist
const cleanTask = done => {
    del.sync('./dist')
    done()
}


// Build task
const buildTask = gulp.series(
    cleanTask,
    gulp.parallel(htmlTask, sassTask, cssTask, jsTask, imagesTask, fontsTask)
)

// BrowserSync
const syncTask = gulp.series(buildTask, done => {
    browserSync.init(['*.css', '*.js'], {
        notify: false,
        open: false,
        port: 9000,
        server: {
            baseDir: ['./dist']
        }
    })
    done()
})

exports.build = buildTask

exports.default = gulp.parallel(syncTask, () => {
    gulp.watch('./assets/img/**/*.+(png|jpg|jpeg|gif|svg)', gulp.parallel(imagesTask))
    gulp.watch('./assets/html/**/*.pug', gulp.parallel(htmlTask))
    gulp.watch('./assets/sass/**/*.sass', gulp.parallel(sassTask))
    gulp.watch('./assets/js/*.js', gulp.parallel(jsTask))
})
