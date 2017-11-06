const Boom = require('boom')
const jwt = require('jsonwebtoken')

const config = require('../../../../config')

const handler = async function (request, reply) {
  const token = request.state.rememberMePluginAdmin || 'none'
  if (token === 'none') return reply(Boom.unauthorized('User not found!'))
  const decoded = jwt.verify(token, config.server.auth.jwt2.secret)
  const key = { id: decoded.id, segment: 'account' }
  const account = await request.server.app.cache.get(key)
  // no cache
  if (account === null) return reply(Boom.unauthorized('User not found!'))
  reply({token, account})
}

module.exports = handler
