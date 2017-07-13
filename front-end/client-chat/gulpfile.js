const browserSync = require("browser-sync"),
  cleanCSS = require('gulp-clean-css'),
  gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  prefixer = require('gulp-autoprefixer'),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  util = require('gulp-util'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename');

let path = {
  build: {
    css: '../../back-end/public/client-chat',
    js: '../../back-end/public/client-chat',
    img: '../../back-end/public/client-chat/img'
  },
  devbuild: {
    html: 'dist'
  },
  src: {
    html: 'src/test-page/*.html',
    css: 'src/**/*.scss',
    js: 'src/chat-script.js',
    img: 'src/img/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    css: 'src/**/*.scss',
    js: 'src/**/*.js',
    img: 'src/img/**/*.*'
  },
  clean: '../../back-end/public/client-chat/**/*.*'
};

let config = {
  production: !!util.env.production
};

let serverConfig = {
  server: {
    baseDir: './dist'
  },
  tunnel: false,
  host: 'localhost',
  port: 5000,
  browser: 'chrome' || 'default'
};

gulp.task('clean', function () {
  gulp.src(path.clean, {read:false})
    .pipe(clean())
});

gulp.task('html:build', function () {
  if (!config.production) {
    gulp.src(path.src.html)
      .pipe(gulp.dest(path.devbuild.html))
      .pipe(reload({stream: true}))
  }
});

gulp.task('css:build', function () {
  gulp.src(path.src.css)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cleanCSS())
    .pipe(concat('client-chat.css'))
    .pipe(gulp.dest(path.build.css))
    .pipe(config.production ? util.noop() : reload({stream: true}))
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(browserify({
      insertGlobals : true,
      debug : !config.production
    }))
    .pipe(rename('client-chat.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(config.production ? util.noop() : reload({stream: true}))
});

gulp.task('img:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(config.production ? util.noop() : reload({stream: true}))
});

gulp.task('build', [
  'html:build',
  'css:build',
  'js:build',
  'img:build'
]);

gulp.task('server', function () {
  browserSync(serverConfig);
});

gulp.task('watch', function () {
  watch([path.watch.html], function () {
    gulp.start('html:build');
  });
  watch([path.watch.css], function () {
    gulp.start('css:build');
  });
  watch([path.watch.js], function () {
    gulp.start('js:build');
  });
  watch([path.watch.img], function () {
    gulp.start('img:build');
  });
});

gulp.task('default', ['build', 'server', 'watch']);
gulp.task('build:prod', ['build']);