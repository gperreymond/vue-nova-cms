const Boom = require('boom')

const handler = (request, reply) => {
  request.server.methods.getUsersStatisticsQuery((error, result) => {
    if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
    reply(result)
  })
}

module.exports = handler