const debug = require('debug')('nova:server:system')

const path = require('path')
const glob = require('glob-promise')
const YAML = require('yamljs')
const _ = require('lodash')

const NovaPlugin = {
  register: function (server, options, next) {
    const directoryPlugins = path.resolve(__dirname, '../../plugins')
    debug('directoryPlugins=%s', directoryPlugins)
    let plugins = []
    glob(directoryPlugins + '/**/plugin.yml').then(files => {
      files.map(file => {
        const pluginPath = path.dirname(file)
        let plugin = YAML.load(file)
        plugins.push(plugin)
        _.map(plugin.rules, rule => {
          switch (rule.type) {
            case 'route':
              delete rule.type
              if (rule.config) rule.config = require(path.resolve(pluginPath, rule.config))
              if (rule.handler) rule.handler = require(path.resolve(pluginPath, rule.handler))
              debug('add new rule: %o', rule)
              return server.route(rule)
            default:
          }
        })
      })
      next(null, plugins)
    }).catch(next)
  }
}

NovaPlugin.register.attributes = {
  name: 'Nova',
  version: '1.0.0'
}

module.exports = NovaPlugin
