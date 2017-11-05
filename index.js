const debug = require('debug')('nova:global')

const server = require('./server')

debug('initialize')
server.initialize()
  .then(() => {
    return server.startCache()
  })
  .then(() => {
    debug('cache has started')
    return server.start()
  })
  .then(() => {
    debug('server has started')
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
