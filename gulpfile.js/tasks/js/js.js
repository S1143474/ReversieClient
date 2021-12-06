const { src, dest } = require('gulp');
const order = require('gulp-order');
const concat  = require('gulp-concat');
const babel = require('gulp-babel');

const js = (backendPath, files) => {
    return () => {
        return src(files)
            .pipe(order(files, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest('./dist/js'))
            .pipe(dest(backendPath + 'js'));
    };
};

exports.js = js;