const { parallel, series } = require('gulp')

const serve = require('./gulp/tasks/serve')
const pugtohtml = require('./gulp/tasks/pugtohtml')
const styles = require('./gulp/tasks/styles')
const scripts = require('./gulp/tasks/scripts')
const fonts = require('./gulp/tasks/fonts')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')
//const svgSprite = require('./gulp/tasks/svgSprite')

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    cb()
  }
}


const dev = series(pugtohtml, styles, scripts, fonts, imageMinify)
const build = series(clean, dev)

module.exports.start = series(setMode(), build, serve)

module.exports.build = series(setMode(true), build)
