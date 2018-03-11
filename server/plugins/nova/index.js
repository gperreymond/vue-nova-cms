const debug = require('debug')('nova:server:nova-plugin')

const Hoek = require('hoek')
const path = require('path')
const glob = require('glob-promise')

class NovaPlugin {
  constructor (server) {
    this.__server = server
  }
  async initialize (server) {
    const applicationsPath = path.resolve(__dirname, '../../../applications')
    const files = await glob.sync(`${applicationsPath}/**/server/**/index.js`)
    files.map(async (file) => {
      const route = require(file)
      debug('[%s] add route with method %s and path %s', route.method, route.path)
      await server.route(route)
    })
    return {initialized: true}
  }
}

const plugin = {
  name: 'Nova',
  version: '1.0.0',
  register: async function (server, options = {}) {
    try {
      Hoek.assert(server, '[nova-plugin] Server is mandatory')
      const nova = new NovaPlugin(server)
      server.app.nova = await nova.initialize(server).catch(err => { throw err })
      return {registered: true}
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = plugin
