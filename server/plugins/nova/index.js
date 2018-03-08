const debug = require('debug')('nova:server:nova-plugin')

const Hoek = require('hoek')
const path = require('path')
const glob = require('glob-promise')
const YAML = require('yamljs')
const _ = require('lodash')

class NovaPlugin {
  constructor (server) {
    this.__server = server
  }
  async initialize (server) {
    const applicationsPath = path.resolve(__dirname, '../../../applications')
    let applications = []
    const files = await glob.sync(`${applicationsPath}/**/resources.yml`)
    files.map(file => {
      const applicationPath = path.dirname(file)
      const application = YAML.load(file)
      applications.push(application)
      _.map(application.rules, rule => {
        switch (rule.type) {
          case 'route':
            delete rule.type
            if (rule.config) rule.config = require(path.resolve(applicationPath, rule.config))
            if (rule.handler) rule.handler = require(path.resolve(applicationPath, rule.handler))
            debug('[%s] new rule with method %s and path %s', application.name, rule.method, rule.path)
            this.__server.route(rule)
            break
          default:
        }
      })
    })
    return applications
  }
}

const plugin = {
  name: 'Nova',
  version: '1.0.0',
  register: async function (server, options = {}) {
    try {
      Hoek.assert(server, '[nova-plugin] Server is mandatory')
      const nova = new NovaPlugin(server)
      server.app.nova = await nova.initialize().catch(err => { throw err })
      return {registered: true}
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = plugin
