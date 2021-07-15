const {src, dest} = require('gulp');
const concat = require('gulp-concat');
const order = require('gulp-order');
const babel = require('gulp-babel');

const js = (filesJs, filesJsOrder) => {
    return () => {
        return src(filesJs)
            .pipe(order(filesJs, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest('./dist/js'))
            .pipe(dest('./test/jasmine/spec/helpers'))
    };
};

exports.js = js;