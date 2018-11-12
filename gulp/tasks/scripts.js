module.exports = function(config, gulp, plugins, browserSync, browserify, babelify, watchify, source, buffer, beepbeep) {

  var bundler = watchify(browserify({
    entries: [config.dev.jsBundle],
    debug: true
  })).transform(babelify, {
    presets: ['env']
  });

  gulp.task('scripts', function() {
    return bundler
      .bundle()

      .pipe(source('bundle.js'))

      .pipe(buffer())

      .on('error', function (error) {
        beepbeep();
        console.log(error.message);
        this.emit('end');
      })

      .pipe(gulp.dest(config.dev.tempRoot))

      .pipe(browserSync.stream());
    })

  bundler.on('update', gulp.parallel('scripts'));
}
