const { src, dest } = require('gulp');
const concat = require('gulp-concat');

const vendor = (backendPath, vendorFiles) => {
    return () => {
        return src(vendorFiles)
            .pipe(concat('vendor.js'))
            .pipe(dest('./dist/js'))
            .pipe(dest(backendPath + 'js'));
    };
}

exports.vendor = vendor;