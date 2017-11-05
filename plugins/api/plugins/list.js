const Boom = require('boom')

const handler = (request, reply) => {
  request.server.methods.getPlugins((error, result) => {
    if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
    reply({
      type: 'plugins',
      count: result.length,
      dataProvider: result
    })
  })
}

module.exports = handler
