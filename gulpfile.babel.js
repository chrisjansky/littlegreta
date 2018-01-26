'use strict';

const
  config = require('./gulp/gulpconfig.json'),
  gulp = require('gulp'),
  fs = require('fs'),
  del = require('del'),
  browserSync = require('browser-sync').create(),
  hygienist = require('hygienist-middleware'),
  beepbeep = require('beepbeep'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  watchify = require('watchify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  plugins = require('gulp-load-plugins')(),
  emittyPug = require('emitty').setup(config.dev.templatesRoot, 'pug'),
  emittyScss = require('emitty').setup(config.dev.stylesRoot, 'scss'),
  bourbon = require('node-bourbon');

/*
Server
*/
require('./gulp/tasks/server')(config, gulp, browserSync, hygienist);

/*
Templates
*/
require('./gulp/tasks/templates')(config, gulp, plugins, browserSync, emittyPug, beepbeep, fs);

/*
Styles
*/
require('./gulp/tasks/styles')(config, gulp, plugins, browserSync, emittyScss, beepbeep, bourbon);

/*
Scripts
*/
require('./gulp/tasks/scripts')(config, gulp, plugins, browserSync, browserify, babelify, watchify, source, buffer, beepbeep);

/*
SVG
*/
require('./gulp/tasks/svg')(config, gulp, plugins, del);

/*
Build
*/
require('./gulp/tasks/build')(config, gulp, plugins, del, browserSync);

gulp.task('default', gulp.series(gulp.parallel('styles', 'scripts', 'svg', 'templates:data'), 'templates', 'server'));

gulp.watch(
  [config.path, config.dev.templatesGlob],
  gulp.parallel('templates:reload')
);

gulp.watch(
  config.dev.dataGlob,
  gulp.parallel('templates:data')
);

gulp.watch(
  config.dev.stylesGlob,
  gulp.parallel('styles')
);

gulp.watch(
  config.dev.svgSourceGlob,
  gulp.parallel('svg')
);
