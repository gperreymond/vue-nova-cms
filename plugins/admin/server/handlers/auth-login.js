const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const Boom = require('boom')

const config = require('../../../../config')

const handler = async function (request, reply) {
  if (!request.auth.isAuthenticated) return reply(Boom.unauthorized('Authentication failed due to: ' + request.auth.error.message))
  if (request.auth.credentials.profile.email !== config.accounts.admin.email) return reply(Boom.unauthorized('Authentication failed due to: email is not authorize'))
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
  reply({token}).state('rememberMePluginAdmin', token, { ttl, isSecure: false, isHttpOnly: false }).redirect('/admin')
}

module.exports = handler
