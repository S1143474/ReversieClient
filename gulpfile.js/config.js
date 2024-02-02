module.exports = {
    localServerProjectPath : '../../../source/repos/ReversiMvcApp/WebUI/wwwroot/',
    files: {
        js: [
            'js/*.js',
            'js/modules/Game.js',
            'js/**/*.js'
        ],
        sass: [
            'css/*.css',
            'wwwroot/sass/*.scss',
            'sass/**/*.scss'
        ],
        vendor: [
            'vendor/handlebars-v4.7.7.js',
            'vendor/chart.min.js',
        ],
        template: [
            // 'templates/**/*.hbs',
            'templates/**/[^_]*.hbs'
        ],
        partial: [
            'templates/**/_*.hbs'
        ],
    },
    voornaam: 'Bas'
};