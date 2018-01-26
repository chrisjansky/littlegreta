module.exports = function(config, gulp, plugins, del) {

  // Delete the previous SVG build.
  gulp.task('svg:wipe', function() {
    return del(config.dev.svgBuildGlob);
  });

  // Minify individual SVG assets.
  gulp.task('svg', gulp.series('svg:wipe', function() {
    return gulp.src(config.dev.svgSourceGlob)
      .pipe(plugins.imagemin([
        plugins.imagemin.svgo({plugins: [
          {removeUselessStrokeAndFill: false},
          {cleanupIDs: false}
        ]})
      ]))
      .pipe(gulp.dest(config.dev.svgBuild));
  }));

}
