
// Dependencies List
// const {src, dest, watch, series} = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const prefix = require('gulp-autoprefixer');
// const minfiy = require('gulp-clean-css');
// const terser = require('gulp-terser');
// const imagemin = require('gulp-imagemin');
// const imgaewebp = require('gulp-webp');
// const purgecss = require("gulp-purgecss");



import gulp from 'gulp'
const {src, dest, watch, series} = gulp
import gulpSass from 'gulp-sass'
import * as sassjs from 'sass'
const sass = gulpSass(sassjs)
import prefix from 'gulp-autoprefixer'
import minfiy from 'gulp-clean-css'
import terser from 'gulp-terser'
import imagemin from 'gulp-imagemin'
import imgaewebp from 'gulp-webp'
import purgecss from 'gulp-purgecss'



//* ____Functions____ 



// compiles scss
function complieScss() {
    return src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(purgecss({ content: ['./index.html'] }))
        .pipe(minfiy())
        .pipe(dest('./dist/css'))
}



// minifies javascript
function jsMin() {
    return src('./src/js/*.js')
        .pipe(terser())
        .pipe(dest('./dist/js'))
}



// optimize the img
async function optimizeImg(){
    try {
        return src('./src/images/*.{.jpg,jpeg,png')
        // .pipe(imagemin([
        //         imagemin.mozjpeg({ quality: 80, progressive: true }),
        //         imagemin.optipng({ optimizationLevel: 2 }),
        //     ]))
        .pipe(imagemin())
        .pipe(dest('./dist/images/optimizedImg'))
    } catch (error) {
        console.log("error ::: ",error)
    }
}



// convert optimized img to webp
function webpImg() {
    return src('./src/images/*.jpg,jepg,png')
        .pipe(imgaewebp())
        .pipe(dest('./dist/images/optimizedWebp'))
}



// watch all changes
function watchTask(){
    watch(['./src/scss/*.scss'], complieScss)
    watch(['./src/js/*.js'], jsMin)
    watch(['./src/images/*.{jpg,jpeg,png}'], optimizeImg)
    watch(['./src/images/*.{jpg,jpeg,png}'], webpImg)
}



// EXPORT
export default series(
    complieScss,
    jsMin,
    optimizeImg,
    webpImg,
    watchTask
)






// // see video explanation: https://youtu.be/ubHwScDfRQA

// const { src, dest, watch, series} = require('gulp');
// const sass = require('gulp-sass')(require('sass')); 
// const prefix = require('gulp-autoprefixer');
// const minify = require('gulp-clean-css');
// const terser = require('gulp-terser');
// const imagemin = require('gulp-imagemin');
// const imagewebp = require('gulp-webp');

// //compile, prefix, and min scss
// function compilescss() {
//   return src('src/scss/*.scss') // change to your source directory
//     .pipe(sass())
//     .pipe(prefix('last 2 versions'))
//     .pipe(minify())
//     .pipe(dest('dist/css')) // change to your final/public directory
// };

// //optimize and move images
// function optimizeimg() {
//   return src('src/images/*.{jpg,png}') // change to your source directory
//     .pipe(imagemin([
//       imagemin.mozjpeg({ quality: 80, progressive: true }),
//       imagemin.optipng({ optimizationLevel: 2 }),
//     ]))
//     .pipe(dest('dist/images')) // change to your final/public directory
// };

// //optimize and move images
// function webpImage() {
//   return src('dist/images/*.{jpg,png}') // change to your source directory
//     .pipe(imagewebp())
//     .pipe(dest('dist/images')) // change to your final/public directory
// };


// // minify js
// function jsmin(){
//   return src('src/js/*.js') // change to your source directory
//     .pipe(terser())
//     .pipe(dest('dist/js')); // change to your final/public directory
// }

// //watchtask
// function watchTask(){
//   watch('src/scss/**/*.scss', compilescss); // change to your source directory
//   watch('src/js/*.js', jsmin); // change to your source directory
//   watch('src/images/*', optimizeimg); // change to your source directory
//   watch('dist/images/*.{jpg,png}', webpImage); // change to your source directory
// }


// // Default Gulp task 
// exports.default = series(
//   compilescss,
//   jsmin,
//   optimizeimg,
//   webpImage,
//   watchTask
// );