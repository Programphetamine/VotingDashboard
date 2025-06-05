const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// CSS
gulp.task('styles', function () {
  return gulp.src([
    'src/app/**/*.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('components.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('scripts', function () {
  return gulp.src([
      // Angular
      'node_modules/angular/angular.min.js',
      'node_modules/angular-route/angular-route.min.js',
      
      // Modules
      'src/app/app.module.js',
      'src/app/core/core.module.js',
      'src/app/shared/shared.module.js', 
      'src/app/dashboard/dashboard.module.js',

      // Services
      'src/app/core/logger.service.js',
      'src/app/services/**/*.js',
      
      // Components and controllers
      'src/app/core/pages/**/*.js',
      'src/app/shared/pages/**/*.js',
      'src/app/dashboard/pages/**/*.js',
      'src/app/dashboard/components/**/*.js',
      
      // Routing
      'src/app/core/routing/**/*.js',
      
      // App configuration
      'src/app/app.config.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: '.',
      routes: {
        "/": "index.html"
      }
    },
    middleware: function (req, res, next) {
      var url = req.url;
      if (url.indexOf('.') !== -1 || url.startsWith('/api') || url.startsWith('/assets')) {
        return next();
      }
      req.url = '/index.html';
      return next();
    }
  });

  gulp.watch('src/app/**/*.css', gulp.series('styles'));
  gulp.watch('src/app/**/*.js', gulp.series('scripts'));
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('styles', 'scripts', 'serve'));
