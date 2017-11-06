const handler = async function (request, reply) {
  reply({logout: true}).unstate('rememberMePluginAdmin', { isSecure: false, isHttpOnly: false })
}

module.exports = handler
