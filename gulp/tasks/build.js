module.exports = function(config, gulp, plugins, del, browserSync) {

  // Delete the previous build.
  gulp.task('build:wipe', function() {
    return del(config.dist.root);
  });

  // Move other assets to production folder.
  gulp.task('build:move', function() {
    return gulp.src(config.move, {base: config.dev.root})
      .pipe(gulp.dest(config.dist.root));
  });

  gulp.task('build:optimize', function() {
    return gulp.src(
        config.dev.imagesGlob,
        {base: config.dev.root}
      )
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(config.dist.root))
  })

  // Clean CSS and JS.
  gulp.task('build:compile', function() {
    return gulp.src(config.dev.pagesFilter)
      .pipe(plugins.useref())
      .pipe(plugins.if('*.css', plugins.cleanCss({
        keepSpecialComments: 0
      })))
      .pipe(plugins.if('*.js', plugins.uglify()))
      .pipe(gulp.dest(config.dist.root));
  });

  gulp.task('build:test', function() {
    return browserSync.init({
      server: {
        baseDir: config.dist.root
      },
      notify: false
    });
  });

  gulp.task('build', gulp.series('build:wipe', gulp.parallel('build:move', 'build:optimize', 'build:compile'), 'build:test'));

}
