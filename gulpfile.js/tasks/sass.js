const {src, dest} = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');

const sass = (sassFiles) => {
    return () => {
        return src(sassFiles)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(dest('./dist/sass'))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'))
    };
};

exports.sass = sass;