const {src, dest} = require('gulp');

const html = (htmlFiles) => {
    return () => {
        return src(htmlFiles)
            .pipe(dest('./dist/html'));
    };
};

exports.html = html;