var gulp        = require('gulp'),
    sourcemaps  = require('gulp-sourcemaps'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    babel       = require('babelify'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    fileinclude = require('gulp-file-include'),
    watch       = require('gulp-watch'),
    browsersync = require('browser-sync'),
    postcss     = require('gulp-postcss'),
    prefixer    = require('gulp-autoprefixer'),
    cssmin      = require('gulp-minify-css'),
    sass        = require('gulp-sass'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant');


gulp.task('jsx', function() {
    var bundler = watchify(browserify(
        {
            entries: ['./src/jsx/app.jsx'],
            debug: true,
            extensions: ['.jsx']
        }
    ).transform(babel));

    bundler.bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('html', function () {
    browsersync.notify('Compiling html');

    gulp.src('./src/*.html')
    .on('error', function (err) {
        console.error(err);
        this.emit('end');
    })
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file',
        indent: true
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', [
    'sass-internal',
    'sass-external'
]);

gulp.task('sass-internal', (function() {
    browsersync.notify('Compiling sass');

    return gulp.src('./src/sass/internal.scss')
        .pipe(sass({
            includePaths: './src/sass/',
            sourceMap: true,
            errLogToConsole: true
        }))
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(prefixer({
            browsers: [
                'last 10 versions',
                'IE 8',
                'IE 9',
                '> 3%'
            ]
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'));
}));
gulp.task('sass-external', (function() {
    browsersync.notify('Compiling sass');

    return gulp.src('./src/sass/external.scss')
        .pipe(sass({
            includePaths: './src/sass/',
            sourceMap: true,
            errLogToConsole: true
        }))
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'))
}));

gulp.task('images', (function() {
    browsersync.notify('Compiling images');

    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./build/img'))
}));

gulp.task('js-all', function() {
    browsersync.notify('Compiling js all');

    return gulp.src('./src/js/*.js')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', function(){
    watch(['./src/**/*.html'], function(event, cb) {
        gulp.start('html');
    });
    watch('./src/**/*.jsx', function(event, cb) {
        gulp.start('jsx');
    });
    watch('./src/sass/**/*.scss', function(event, cb) {
        gulp.start('sass');
    });
    watch('./src/img/**/*.*', function(event, cb) {
        gulp.start('images');
    });
    watch('./src/js/**/*.js', function(event, cb) {
        gulp.start('js-all');
    });
});

gulp.task('webserver', function() {
    browsersync.init({
        server: {
            baseDir: "./build"
        }
    });

});

gulp.task('default', ['html', 'sass', 'jsx', 'webserver', 'images', 'js-all', 'watch']);