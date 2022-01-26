const { src, dest } = require('gulp');
const order = require('gulp-order');
const concat  = require('gulp-concat');
const babel = require('gulp-babel');

const js = (backendPath, files) => {
    return () => {
        return src(files)
            .pipe(order(files, {base: './'}))
            .pipe(concat('app.js'))
            // .pipe(babel({
            //     plugins: ["@babel/plugin-transform-runtime"],
            //     presets: ['@babel/preset-env']
            // }))
            .pipe(babel({
                presets: [
                    [
                        '@babel/preset-env',
                        // use targets to fix async and await calls for hub implementation.
                        {
                            targets: {
                                esmodules: true,
                            }
                        }
                    ]
                ]
            }))
            .pipe(dest('./dist/js'))
            .pipe(dest(backendPath + 'js'));
    };
};

exports.js = js;