const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const Boom = require('boom')

const config = require('../../../../config')

const handler = async function (request, h) {
  try {
    if (!request.auth.isAuthenticated) throw Boom.unauthorized('authentication failed due to: ' + request.auth.error.message)
    if (request.auth.credentials.profile.email !== config.accounts.admin.email) throw Boom.unauthorized('authentication failed due to: email is not authorize')
    const account = {
      id: uuid.v4(),
      provider: request.auth.credentials.provider,
      email: request.auth.credentials.profile.email
    }
    const ttl = 24 * 60 * 60 * 1000
    const userURN = 'urn:plugin:admin:user:' + account.id
    const key = { id: userURN, segment: 'account' }
    await request.server.app.cache.set(key, account, ttl)
    const payload = {
      id: userURN,
      scope: 'admin',
      iss: 'NOVA'
    }
    const token = jwt.sign(payload, config.server.auth.jwt2.secret)
    h.state('rememberMePluginAdmin', token, { ttl, isSecure: false, isHttpOnly: false })
    return h.redirect('/admin')
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}

module.exports.method = ['GET', 'POST']
module.exports.path = '/admin/auth/login'
module.exports.config = require('./config.json')
module.exports.handler = handler
