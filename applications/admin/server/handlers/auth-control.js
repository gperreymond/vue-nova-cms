const Boom = require('boom')
const jwt = require('jsonwebtoken')

const config = require('../../../../config')

const handler = async function (request) {
  try {
    const token = request.state.rememberMePluginAdmin || 'none'
    if (token === 'none') throw Boom.unauthorized('User not found!')
    const decoded = jwt.verify(token, config.server.auth.jwt2.secret)
    const key = { id: decoded.id, segment: 'account' }
    const account = await request.server.app.cache.get(key)
    // no cache
    if (account === null) throw Boom.unauthorized('User not found!')
    return {token, account}
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = handler
