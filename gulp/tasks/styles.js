module.exports = function(config, gulp, plugins, browserSync, emitty, beepbeep, bourbon) {

  gulp.task('styles', function () {
    return gulp.src(config.dev.stylesBase)

      .pipe(emitty.stream())

      .pipe(plugins.sassGlob())

      .pipe(plugins.sass({
        includePaths: require('node-neat').with('./node_modules/breakpoint-sass/stylesheets/', './bower_components/', bourbon.includePaths)
      })

      .on('error', function (error) {
        beepbeep();
        plugins.sass.logError.bind(this)(error);
      }))

      .pipe(plugins.autoprefixer())

      .pipe(gulp.dest(config.dev.tempRoot))
      
      .pipe(browserSync.stream());
  });

}
