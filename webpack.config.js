const glob = require('glob-promise')

const files = glob.sync(`${__dirname}/applications/**/webpack.config.js`)

module.exports = files.map(file => { return require(file) })
