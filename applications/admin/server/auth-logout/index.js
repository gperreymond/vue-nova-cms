const handler = async function (request, h) {
  h.unstate('rememberMePluginAdmin', { isSecure: false, isHttpOnly: false })
  return h.redirect('/admin')
}

module.exports.method = 'POST'
module.exports.path = '/admin/auth/logout'
module.exports.handler = handler
