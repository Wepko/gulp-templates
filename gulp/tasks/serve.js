const { src, watch, series } = require('gulp')

const styles = require('./styles') 
const pugtohtml = require('./pugtohtml')

const imageMinify = require('./imageMinify')
//const svgSprite = require('./svgSprite')
const scripts = require('./scripts')

const server = require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports  = function serve(cb) {
  server.init({
    server: 'dist',
    notify: false,
    open: true,
    cors: true
  })

  watch('src/sass/**/*.scss', series(styles, fn => src('dist/css').pipe(server.stream()).on('end', fn)))
  watch('src/pug/**/*.pug', series(pugtohtml, readyReload))
  watch('src/img/*.{gif,png,jpg,svg,webp}', series(imageMinify, readyReload))
  //watch('src/img/sprite/*.svg', series(svgSprite, readyReload))
  watch('src/js/**/*.js', series(scripts, readyReload))

  return cb()
}