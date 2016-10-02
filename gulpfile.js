var gulp = require("gulp");
var util = require("gulp-util");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var gprint = require('gulp-print');
var rename = require("gulp-rename");
var wrapper = require("gulp-wrapper");
var file = require("gulp-file");
var filter = require("gulp-filter");
var runSequence = require('run-sequence');

var path = require('path');
var del = require('del');
var syncExec = require('sync-exec');
var childProcess = require('child_process');

/*var colors =*/
require('colors');

var bs, bsRaw, browserSync = require("browser-sync");

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var javascripts_app = [
    './app/src/libraries/*.js',
    './app/src/modules/*.js',
    './app/src/utilities.js',
    './app/src/main.js',
    './app/src/services/*.js',
    './app/src/controllers/*.js',
    './app/src/directives/*.js',
    './app/src/**/*.js',
];

var stylesheets_app = [
    './app/style/main.less',
];

var javascripts_lib = [
    './app/lib/jquery/dist/jquery.min.js',
    //'./app/lib/semantic/dist/semantic.min.js',
    './app/lib/semantic/dist/components/site.min.js',
];

var stylesheets_lib = [
    //'./app/lib/semantic/dist/semantic.rtl.min.css',
    './app/lib/semantic/dist/components/site.rtl.min.css',
    './app/lib/semantic/dist/components/grid.rtl.min.css',
];

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('clean', callback => {
    del(['./app/public/dist/**/*'])
        .then(items => {
            if (items && items.length && items.length > 0) {
                util.log(' -> ' + 'Deleted files and folders :'.green);
                items.forEach(item => util.log(item.yellow));
            }
            util.log(' => ' + 'Already clean !'.green);
            callback();
        });
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build-app-js', () => {
    return gulp.src(javascripts_app)
        .pipe(gprint(file => ' -> [' + 'app'.cyan + '] Javascript file: ' + file))
        .pipe(wrapper({
            header: "\n/*\n\tAHS502 : Start of '${filename}'\n*/\n\n",
            footer: "\n\n/*\n\tAHS502 : End of '${filename}'\n*/\n"
        }))
        .pipe(file('introduction.js', "// AHS502 : Application javascript file :"))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => util.log(' => [' + 'app'.bold.cyan + '] ' + 'Javascript file has been created.'.green))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write()) or .pipe(sourcemaps.write(config.paths.dist))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => {
            util.log(' => [' + 'app'.bold.cyan + '] ' + 'Minified javascript file has been created.'.green);
            bs && bs.reload();
        });
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build-app-css', () => {
    var cssFilter = filter('**/*.css', {
        restore: true
    });
    var lessFilter = filter('**/*.less', {
        restore: true
    });
    return gulp.src(stylesheets_app)
        .pipe(cssFilter)
        .pipe(gprint(file => ' -> [' + 'app'.cyan + '] Stylesheet file: ' + file))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(cssFilter.restore)
        .pipe(lessFilter)
        .pipe(gprint(file => ' -> [' + 'app'.cyan + '] Less file: ' + file))
        .pipe(less(
            /*{
                //TODO: Array of paths to be used for @import directives
                paths: [path.join(__dirname, 'less', 'includes')],
                //TODO: Array of less plugins, see: https://www.npmjs.com/package/gulp-less#using-plugins
                plugins: []
            }*/
        ))
        .on('error', error => {
            util.log(error);
            util.log("\nSTACK: ".red.bold + error.stack);
        })
        .pipe(rename({
            extname: '.less'
        }))
        .pipe(lessFilter.restore)
        .pipe(wrapper({
            header: "\n/*\n\tAHS502 : Start of '${filename}'\n*/\n\n",
            footer: "\n\n/*\n\tAHS502 : End of '${filename}'\n*/\n"
        }))
        .pipe(file('introduction.css', "/* AHS502 : Application stylesheet file : */"))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => util.log(' => [' + 'app'.bold.cyan + '] ' + 'Stylesheet file has been created.'.green))
        // .pipe(sourcemaps.init())
        .pipe(cssnano())
        // .pipe(sourcemaps.write()) or .pipe(sourcemaps.write(config.paths.dist))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => {
            util.log(' => [' + 'app'.bold.cyan + '] ' + 'Minified stylesheet file has been created.'.green);
            bs && bs.reload('./app/public/dist/app.min.css');
        });
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build-lib-js', () => {
    return gulp.src(javascripts_lib)
        .pipe(gprint(file => ' -> [' + 'lib'.cyan + '] Javascript file: ' + file))
        .pipe(wrapper({
            header: "\n/*\n\tAHS502 : Start of '${filename}'\n*/\n\n",
            footer: "\n\n/*\n\tAHS502 : End of '${filename}'\n*/\n"
        }))
        .pipe(file('introduction.js', "// AHS502 : Application libraries javascript file :"))
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => util.log(' => [' + 'lib'.bold.cyan + '] ' + 'Javascript file has been created.'.green))
        // // .pipe(sourcemaps.init())
        // .pipe(uglify())
        // // .pipe(sourcemaps.write()) or .pipe(sourcemaps.write(config.paths.dist))
        .pipe(rename('lib.min.js'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => util.log(' => [' + 'lib'.bold.cyan + '] ' + 'Minified javascript file has been created.'.green));
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build-lib-css', () => {
    return gulp.src(stylesheets_lib)
        .pipe(gprint(file => ' -> [' + 'lib'.cyan + '] Stylesheet file: ' + file))
        .pipe(wrapper({
            header: "\n/*\n\tAHS502 : Start of '${filename}'\n*/\n\n",
            footer: "\n\n/*\n\tAHS502 : End of '${filename}'\n*/\n"
        }))
        .pipe(file('introduction.css', "/* AHS502 : Application libraries stylesheet file : */"))
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => util.log(' => [' + 'lib'.bold.cyan + '] ' + 'Stylesheet file has been created.'.green))
        // // .pipe(sourcemaps.init())
        // .pipe(cssnano())
        // // .pipe(sourcemaps.write()) or .pipe(sourcemaps.write(config.paths.dist))
        .pipe(rename('lib.min.css'))
        .pipe(gulp.dest('./app/public/dist/'))
        .on('end', () => util.log(' => [' + 'lib'.bold.cyan + '] ' + 'Minified stylesheet file has been created.'.green));
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build-app', ['build-app-js', 'build-app-css']);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build-lib', ['build-lib-js', 'build-lib-css']);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build', ['clean'], () =>
    runSequence('build-lib', 'build-app'));

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var pId;

gulp.task('start-node', callback => {

    if (pId) {
        util.log((' => Node.js is running on pid = ' + pId).red);
        util.log('    First of all, stop that process.'.red);
        return callback();
    }

    var child = childProcess.spawn('/usr/bin/node', ['./bin/start'], {
        env: {
            PORT: 50302
        }
    });

    pId = child.pid;

    child.stdout.on('data', data => process.stdout.write(data));
    child.stderr.on('data', data => process.stderr.write(data));

    util.log(' => ' + ('Node.js'.bold + ' started with pid = ' + String(pId).bold + ' :').green);

    callback();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('stop-node', callback => {
    if (pId) {
        syncExec('kill ' + pId);
        pId = undefined;
    }
    callback();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('restart-node', callback => {
    if (pId)
        runSequence('stop-node', 'start-node');
    else
        runSequence('start-node');
    callback();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('watch', callback => {

    gulp.watch('./app/src/**/*.js', ['build-app-js']);
    gulp.watch('./app/style/**/*.css', ['build-app-css']);
    gulp.watch('./app/style/**/*.less', ['build-app-css']);

    gulp.watch('./routes/**/*.*', ['restart-node']);
    gulp.watch('./*.*', ['restart-node']);

    callback();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('browser-sync', callback => {

    // All browser-sync options, see: https://www.browsersync.io/docs/options/
    var options = {
        proxy: {
            target: "localhost:" + 50302,
            ws: true
        },
        port: 50304,
        ui: {
            port: 50305,
            weinre: {
                port: 50306
            }
        },
        online: true,
        reloadDebounce: 3000,
        reloadDelay: 0,
        minify: false,
        ghostMode: {
            clicks: true,
            scroll: true,
            forms: true
        },
        notify: true,
        injectChanges: true, // For CSSes
    }

    bsRaw = browserSync.create("javab-azmayesh");
    bsRaw.init(options, () => {
        bs = bsRaw;

        gulp.watch('./app/view/**/*.*').on("change", bs.reload);

        gulp.watch([
                './app/public/img/**/*.*',
            ])
            .on("change", bs.reload);
            
        gulp.watch('./routes/**/*.*').on("change", bs.reload);
        gulp.watch('./*.*').on("change", bs.reload);

        callback();
    });

});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('start', ['start-node', 'watch', 'browser-sync'], callback => {
    //util.log(" => Type 'gulp help' for more information.".bold);
    callback(); // Nothing !
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('start-app', ['build-app', 'start-node', 'watch', 'browser-sync'], callback => {
    //util.log(" => Type 'gulp help' for more information.".bold);
    callback(); // Nothing !
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('default', ['build', 'start']);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
