const glob = require('glob-promise')

const files = glob.sync(`${__dirname}/applications/**/webpack.config.js`)

module.exports = files.map(file => {
  const config = require(file)
  return config
})
