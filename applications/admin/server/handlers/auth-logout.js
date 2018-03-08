const handler = async function (request, h) {
  reply({logout: true}).unstate('rememberMePluginAdmin', { isSecure: false, isHttpOnly: false })
}

module.exports = handler
