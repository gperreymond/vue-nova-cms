const debug = require('debug')('nova:server')

const path = require('path')
const Promise = require('bluebird')
const Hapi = require('hapi')

const Bell = require('bell')
const Inert = require('inert')
const Vision = require('vision')
const AuthJWT2 = require('hapi-auth-jwt2')

const Catbox = require('catbox')
const CatboxMemory = require('catbox-memory')
const CatboxMemcached = require('catbox-memcached')

const config = require('../config')

const internals = {
  server: false,
  cache: false,
  validateFunc: function (decoded, request, callback) {
    callback(null, true)
  },
  errorFunc: function (errorContext) {
    return errorContext
  }
}

internals.startCache = function (type) {
  return new Promise((resolve, reject) => {
    if (!type) type = config.server.cache.type
    if (internals.server === false) {
      internals.cache = false
      return reject(new Error('Server not started'))
    }
    switch (type) {
      case 'memory':
        internals.cache = new Catbox.Client(CatboxMemory)
        break
      case 'memcached':
        internals.cache = new Catbox.Client(CatboxMemcached, config.memcached)
        break
      default:
        return reject(new Error('Server cache type not allowed'))
    }
    internals.cache.start().then(() => {
      internals.server.app.cache = internals.cache
      resolve({
        isReady: internals.cache.isReady(),
        result: internals.cache
      })
    }).catch(error => {
      console.log(error)
      return reject(error)
    })
  })
}

internals.stopCache = async function () {
  await internals.cache.stop()
  internals.cache = false
  return {
    isReady: false
  }
}

internals.stop = function () {
  internals.server.stop()
}

internals.start = function () {
  return new Promise((resolve, reject) => {
    debug('start')
    internals.server.start((error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}

internals.initialize = function () {
  return new Promise((resolve, reject) => {
    debug('initialize')
    internals.server = new Hapi.Server()
    // plugins
    internals.server.connection({ port: config.server.port })
    internals.server.register([Inert, Vision, AuthJWT2, Bell], (error) => {
      if (error) return reject(error)
      // auth google
      internals.server.auth.strategy('google', 'bell', {
        provider: 'google',
        password: config.server.auth.google.password,
        isSecure: false,
        clientId: config.server.auth.google.clientId,
        clientSecret: config.server.auth.google.clientSecret,
        location: config.server.auth.google.location
      })
      // auth jwt2
      internals.server.auth.strategy('jwt', 'jwt', {
        key: config.server.auth.jwt2.secret,
        validateFunc: internals.validateFunc,
        verifyOptions: { algorithms: [ 'HS256' ] },
        errorFunc: internals.errorFunc
      })
      // route: static
      internals.server.route({ method: 'GET', path: '/modules/{p*}', handler: { directory: { path: path.resolve(__dirname, '../node_modules') } } })
      internals.server.route({ method: 'GET', path: '/themes/{p*}', handler: { directory: { path: path.resolve(__dirname, '../themes') } } })
      resolve()
    })
  })
}

module.exports = internals
