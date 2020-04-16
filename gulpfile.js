// The require statement tells Node to look into the node_modules folder for a package
// Once the package is found, we assign its contents to the variable
// gulp.src tells the Gulp task what files to use for the task
// gulp.dest tells Gulp where to output the files once the task is completed.

var gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  del = require('del'),
  panini = require('panini'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  minify = require('gulp-minify'),
  cssnano = require('gulp-cssnano'),
  autoprefixer = require('gulp-autoprefixer'),
  inject = require('gulp-inject');
  md5 = require('js-md5');

const Handlebars = require("handlebars");

Handlebars.registerHelper("lang", function(context, options) {
  if(context.constructor === Object){
    return new Handlebars.SafeString('<span class="en">' + context.en + "</span>"+'<span class="hi d-none">' + context.hi + "</span>");
  }
  return new Handlebars.SafeString('<span>' + context + "</span>");
});

Handlebars.registerHelper("log", function(context, options) {
  console.log(context, options);
});


Handlebars.registerHelper('assign', function (varName, varValue, options) {
  if (!options.data.root) {
    options.data.root = {};
  }
  options.data.root[varName] = varValue;
});

Handlebars.registerHelper('incremented', function (index) {
  return ++index;
});

Handlebars.registerHelper('md5', function (text) {
  return "c"+ md5(text);
})

// BrowserSync
const browserSync = (done) => {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}


// BrowserSync Reload
const browserSyncReload = (done) => {
  browsersync.reload();
  done();
}

// Compile SASS into CSS
const sassT = () => {
  return gulp.src(['src/assets/scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssnano()) // Use cssnano to minify CSS
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("dist/assets/css"))
    .pipe(browsersync.stream());
};

const cname = () => {
  return gulp.src('CNAME')
    .pipe(gulp.dest('dist'));
}

// Using panini, template, page and partial files are combined to form html markup
const compileHtml = () => {
  var sources = gulp.src(['./dist/assets/js/*-min.js', './dist/assets/css/*.css'], { read: false });
  return gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(inject(sources, { ignorePath: '/dist' }))
    .pipe(gulp.dest('dist'));
};

// Reset Panini's cache of layouts and partials
const resetPages = (done) => {
  panini.refresh();
  console.log('Clearing panini cache');
  done();
};

// ------------ Optimization Tasks -------------
// Copies image files to dist
const images = () => {
  return gulp.src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))) // Caching images that ran through imagemin
    .pipe(gulp.dest('dist/assets/img/'));
};

const static = () => {
  return gulp.src('src/assets/static/*.*')
    .pipe(gulp.dest('dist/assets/static/'))
}

// Places font files in the dist folder
const font = () => {
  return gulp.src('src/assets/fonts/*.+(eot|woff|ttf|otf|woff2)')
    .pipe(gulp.dest("dist/assets/fonts"))
    .pipe(browsersync.stream());
};

// Concatenating js files
const scripts = () => {
  return gulp.src('src/assets/js/*.js')
    .pipe(sourcemaps.init())
    //If concatenating more than one JS file
    //.pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(minify())
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(browsersync.stream());
};

// Cleaning/deleting files no longer being used in dist folder
const clean = () => {
  console.log('Removing old files from dist');
  return del('dist');
};

// const injectFiles = () => {
//   var target = gulp.src('./dist/*.html');
//   // It's not necessary to read the files (will speed up things), we're only after their paths:
//   var sources = gulp.src(['./dist/assets/js/*.js', './dist/assets/css/*.css'], {read: false});

//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./dist/src'));
// });

const watchFiles = (done) => {
  gulp.watch('src/assets/js/*', gulp.series(scripts, browserSyncReload));
  gulp.watch('src/assets/img/**/*', images);
  gulp.watch('src/data/*', gulp.series(resetPages, compileHtml, browserSyncReload));
  gulp.watch('src/assets/static/*.*', static);
  gulp.watch('node_modules/bootstrap/scss/*', gulp.series(sassT, browserSyncReload));
  gulp.watch('src/assets/scss/*', gulp.series(sassT, browserSyncReload));
  gulp.watch('src/assets/scss/**/*', gulp.series(sassT, browserSyncReload));
  gulp.watch('src/**/*.html', gulp.series(resetPages, compileHtml, browserSyncReload));
  done();
}

const watch = gulp.parallel(watchFiles, browserSync);

// ------------ Build Sequence -------------
// Simply run 'gulp' in terminal to run local server and watch for changes
const byd = gulp.series(clean, gulp.parallel(font, sassT, scripts, images, static, resetPages), compileHtml, watch);

// Creates production ready assets in dist folder
const build = gulp.series(clean, gulp.parallel(sassT, scripts, images, static, font), cname, compileHtml);

exports.default = byd;
exports.build = build;