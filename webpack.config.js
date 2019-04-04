var Encore = require('@symfony/webpack-encore');
Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('web/js')
    // the public path used by the web server to access the previous directory
    .setPublicPath('web/js')
    .addEntry('app', './app/Resources/app.js')
    .addEntry('login','./app/Resources/login.js')
    .addEntry('calender','./app/Resources/calender.js')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableReactPreset();
;
module.exports = Encore.getWebpackConfig();