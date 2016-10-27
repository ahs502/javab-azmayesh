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
var fs = require("fs");


/*var colors =*/
require('colors');

var bs, bsRaw, browserSync = require("browser-sync");

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var port = 50302;

var javascripts_app = [
    './app/src/libraries/*.js',
    './app/src/modules/*.js',
    './app/src/utilities.js',
    './app/src/app.js',
    './app/src/app-config.js',
    './app/src/app-run.js',
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
    './app/lib/angular/angular.js',
    './app/lib/angular-ui-router/release/angular-ui-router.min.js',
    './app/lib/persian-date/dist/0.1.8/persian-date-0.1.8.min.js',
    //'./app/lib/semantic/dist/semantic.min.js',
    './app/lib/semantic/dist/components/site.min.js',
    './app/lib/semantic/dist/components/form.min.js',
    './app/lib/semantic/dist/components/checkbox.min.js',
    './app/lib/semantic/dist/components/transition.min.js',
    './app/lib/semantic/dist/components/popup.min.js',
    './app/lib/semantic/dist/components/sidebar.min.js',
    './app/lib/semantic/dist/components/sticky.min.js',
];

var stylesheets_lib = [
    //'./app/lib/semantic/dist/semantic.rtl.min.css',
    './app/lib/semantic/dist/components/site.rtl.min.css',
    './app/lib/semantic/dist/components/grid.rtl.min.css',
    './app/lib/semantic/dist/components/form.rtl.min.css',
    './app/lib/semantic/dist/components/input.rtl.min.css',
    './app/lib/semantic/dist/components/card.rtl.min.css',
    './app/lib/semantic/dist/components/segment.rtl.min.css',
    './app/lib/semantic/dist/components/container.rtl.min.css',
    './app/lib/semantic/dist/components/checkbox.rtl.min.css',
    './app/lib/semantic/dist/components/image.min.css',
    './app/lib/semantic/dist/components/menu.min.css',
    './app/lib/semantic/dist/components/button.min.css',
    './app/lib/semantic/dist/components/transition.min.css',
    './app/lib/semantic/dist/components/popup.min.css',
    './app/lib/semantic/dist/components/sidebar.min.css',
    './app/lib/semantic/dist/components/sticky.min.css',
    // './app/lib/semantic/dist/components/divider.min.css',
    //'./app/lib/semantic/dist/components/icon.min.css',
];

var views_templates = [
    // Each Item, Just One File (Do not use * widechar or else) :
    './app/view/index.html',
];

var browserSyncOptions = {
    // See: https://www.browsersync.io/docs/options/

    proxy: {
        target: "localhost:" + port,
        ws: true
    },
    port: port + 2,
    ui: {
        port: port + 3,
        weinre: {
            port: port + 4
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
};

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('clean', callback => {
    del([
            './app/public/dist/**/*',
            './app/public/*.html',
        ])
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

gulp.task('build-view', callback => {

    function renderHtmlTemplate(htmlTemplateFile) {
        util.log(' -> [' + 'view'.cyan + '] HTML template partial file:' + String(htmlTemplateFile).magenta);
        try {
            var template = fs.readFileSync(htmlTemplateFile),
                indexStart, indexEnd, partialFile, partial;
            while ((indexStart = template.indexOf('<!-- import:')) >= 0) {
                indexEnd = template.slice(indexStart).indexOf(' -->') + indexStart + 4;
                partialFile = template.slice(indexStart + 12, indexEnd - 4);
                partial = renderHtmlTemplate(partialFile);
                template = template.slice(0, indexStart) + partial + template.slice(indexEnd);
            }
            return template;
        }
        catch (err) {
            return '';
        }
    }

    views_templates.forEach(templateFile => {
        util.log(' => [' + 'view'.cyan + '] HTML template file:' + templateFile.magenta);
        var template = renderHtmlTemplate(templateFile);
        var outputFile = path.join('./app/public', path.basename(templateFile));
        fs.writeFileSync(outputFile, template, {
            encoding: 'utf8'
        });
    });

    util.log(' => [' + 'view'.bold.cyan + '] ' + 'All HTML views have been created.'.green);
    bs && bs.reload();

    callback();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('build', ['clean'], () =>
    runSequence('build-lib', 'build-app', 'build-view'));

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
            PORT: port
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
    gulp.watch('./app/view/**/*.html', ['build-view']);

    gulp.watch('./routes/**/*.*', ['restart-node']);
    gulp.watch('./*.*', ['restart-node']);

    callback();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

gulp.task('browser-sync', callback => {

    bsRaw = browserSync.create("javab-azmayesh");
    bsRaw.init(browserSyncOptions, () => {
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
