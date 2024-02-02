
const config = require('./config');
const { watch, series } = require('gulp');

const js = require('./tasks/js/js').js(config.localServerProjectPath, config.files.js);
js.displayName = 'js';

const vendor = require('./tasks/vendor/vendor').vendor(config.localServerProjectPath, config.files.vendor);
const template = require('./tasks/templates/templates').template(config.localServerProjectPath, config.files.partial, config.files.template);
// const sass = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
// sass.displayName = 'sass';

// const watchFiles = () => {
//     watch(['./wwwroot/sass/**/*.scss', './wwwroot/sass/*.scss'], series(sass));
// };

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}`)
    done();
}


exports.default = hello;

exports.js = js;
exports.template = template;
exports.vendor = vendor;
// exports.sass = sass;
// exports.watch = watchFiles;