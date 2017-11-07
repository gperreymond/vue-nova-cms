const path = require('path')
const glob = require('glob-promise')
const YAML = require('yamljs')

const method = function (next) {
  const start = new Date()
  const directoryPages = path.resolve(__dirname, '../../plugins')
  let plugins = []
  glob(directoryPages + '/**/plugin.yml').then(files => {
    files.map(file => {
      let plugin = YAML.load(file)
      plugins.push(plugin)
    })
    next(null, {
      type: 'query',
      domain: 'system',
      name: 'getPluginsQuery',
      exectime: new Date() - start,
      result: {
        count: plugins.length,
        dataProvider: plugins
      }
    })
  }).catch(next)
}

module.exports = method
