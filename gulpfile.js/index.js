const {series, parallel, watch} = require('gulp');
const config = require('./config');

const browserSync = require('browser-sync').create();


const js = require('./tasks/js').js(config.localServerProjectPath, config.files.js, config.filesOrderJs);
js.displayName = 'js';

const sass = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass';

const html = require('./tasks/html').html(config.files.html, config.localServerProjectPath);
html.displayName = 'html';

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: 'html/index.html'
        }
    });

    watch(['./css/*.scss', './css/*.css', '.feature/**/*.scss'], series(sass));
    watch(['./index.html'], html);
    watch(['./js/*.js', './js/**/*.js'], js);

    watch("./*.html").on("change", browserSync.reload);
    watch(["./js/*.js", "./js/**/*.js"]).on("change", browserSync.reload);
    watch(["./css/*.scss", "./css/*.css"]).on("change", browserSync.reload);
};

exports.build = parallel(html, sass, js/*, templates*/);
exports.watch = watchFiles;