const debug = require('debug')('nova:server')

const path = require('path')
const Hapi = require('hapi')
const Hoek = require('hoek')
const Bell = require('bell')
const Inert = require('inert')
const Vision = require('vision')
const AuthJWT2 = require('hapi-auth-jwt2')
const Catbox = require('catbox')
const CatboxMemory = require('catbox-memory')
const CatboxMemcached = require('catbox-memcached')

const Nova = require('./plugins/nova')

class Server {
  constructor () {
    this.__server = false
    this.__cache = false
    this.config = require('../config')
  }
  async validate (decoded, request) {
    return { isValid: true }
  }
  async cache (type) {
    try {
      debug('cache starting process')
      Hoek.assert(type, 'type is mandatory')
      Hoek.assert(this.config.server, 'this.config.server is mandatory')
      Hoek.assert(this.config.server.cache, 'this.config.server.cache is mandatory')
      Hoek.assert(this.config.server.cache.type, 'this.config.server.cache.type is mandatory')
      switch (type) {
        case 'memcached':
          this.__cache = new Catbox.Client(CatboxMemcached, this.config.memcached)
          break
        default:
          this.__cache = new Catbox.Client(CatboxMemory)
      }
      await this.__cache.start()
      debug('cache started')
      return {cached: true}
    } catch (e) {
      return Promise.reject(e)
    }
  }
  async initialize () {
    try {
      debug('server initializing process')
      Hoek.assert(this.config.server, 'this.config.server is mandatory')
      Hoek.assert(this.config.server.host, 'this.config.server.host is mandatory')
      Hoek.assert(this.config.server.port, 'this.config.server.port is mandatory')
      debug(`... server: ${this.config.server.host}:${this.config.server.port}`)
      this.__server = Hapi.server({
        host: this.config.server.host,
        port: this.config.server.port
      })
      // plugins
      debug('... plugins initializing process')
      debug('...... plugin: Inert, Vision, AuthJWT2, Bell')
      await this.__server.register([Inert, Vision, AuthJWT2, Bell])
      // strategies
      this.__server.auth.strategy('google', 'bell', {
        provider: 'google',
        password: this.config.server.auth.google.password,
        isSecure: false,
        clientId: this.config.server.auth.google.clientId,
        clientSecret: this.config.server.auth.google.clientSecret,
        location: this.config.server.auth.google.location
      })
      this.__server.auth.strategy('jwt', 'jwt', {
        key: this.config.server.auth.jwt2.secret,
        validate: this.validate,
        verifyOptions: { algorithms: [ 'HS256' ] }
      })
      debug('...... plugin: Nova')
      await this.__server.register([Nova])
      debug('... plugins initialized')
      // routes
      await this.__server.route({
        method: 'GET',
        path: '/bundles/{p*}',
        handler: { directory: { path: path.resolve(__dirname, '../build') } }
      })
      debug('server initialized')
      return {initialized: true}
    } catch (e) {
      return Promise.reject(e)
    }
  }
  async start () {
    try {
      debug('server starting process')
      // server initialize
      await this.initialize().catch(err => { throw err })
      await this.__server.initialize()
      // cache initialize
      await this.cache(this.config.server.cache.type).catch(err => { throw err })
      this.__server.app.cache = this.__cache
      debug('server started')
      await this.__server.start()
      return {started: true}
    } catch (e) {
      return Promise.reject(e)
    }
  }
  async stop () {
    try {
      await this.__server.app.cache.stop()
      await this.__server.stop()
      return {stopped: true}
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = Server
