module.exports = function(config, gulp, plugins, browserSync, emitty, beepbeep, fs) {

  gulp.task('templates:data', function() {
    return gulp.src(config.dev.dataGlob)
      .pipe(plugins.mergeJson())
      .pipe(gulp.dest(config.dev.dataComb));
  });

  gulp.task('templates', function() {
    return gulp.src(
        config.dev.templatesFilter,
        {base: '/' + config.dev.root}
      )

      .pipe(emitty.stream())

      .pipe(plugins.data(function(file) {
        return JSON.parse(fs.readFileSync(config.dev.dataComb + 'combined.json'))
      }))
      .on('error', function (error) {
        beepbeep();
        console.log(error.message);
        this.emit('end');
      })

      .pipe(plugins.pug({
        pretty: true,
        basedir: config.dev.root
      }))
      .on('error', function (error) {
        beepbeep();
        console.log(error.message);
        this.emit('end');
      })

      .pipe(plugins.faker())

      .pipe(plugins.rename(function (path) {
        path.dirname = path.dirname.replace(config.dev.templatesPartial, '');
      }))

      .pipe(plugins.inject(
        gulp.src(
          JSON.parse(fs.readFileSync(config.path, 'utf8')).assets,
          {read: false}
        ),
        {
          relative: true
        }
      ))
      .on('error', function (error) {
        beepbeep();
        console.log(error.message);
        this.emit('end');
      })

      .pipe(plugins.rename(function (path) {
        path.extname = config.dev.pagesFormat;
      }))

      .pipe(gulp.dest('/' + config.dev.root));
  });

  gulp.task('templates:reload', gulp.series('templates', function(done) {
    browserSync.reload();

    done();
  }));

}
