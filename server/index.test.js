const { expect } = require('chai')

const Server = require('./index')

describe('[server] internals', () => {
  it('should be ready and empty', async () => {
    const internals = new Server()
    expect(internals.__server).to.equal(false)
    expect(internals.__cache).to.equal(false)
  })
  xit('should execute validateFunc', async (done) => {
    const internals = new Server()
    internals.validateFunc(null, null, done)
  })
  xit('should execute errorFunc', async () => {
    const internals = new Server()
    const result = internals.errorFunc({test: true})
    expect(result.test).to.equal(true)
  })
  it('should not create cache because type is null', async () => {
    try {
      const internals = new Server()
      await internals.cache().catch(err => { throw err })
    } catch (e) {
      expect(e).to.not.equal(null)
      expect(e.code).to.equal('ERR_ASSERTION')
      expect(e.name).to.equal('AssertionError [ERR_ASSERTION]')
    }
  })
  it('should create memory cache', async () => {
    try {
      const internals = new Server()
      await internals.cache('memory').catch(err => { throw err })
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
  xit('should create memcached cache', async () => {
    try {
      const internals = new Server()
      await internals.cache('memcached').catch(err => { throw err })
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
  it('should start and stop after 1 sec up', async () => {
    try {
      const internals = new Server()
      internals.config.server.port = 3331
      internals.config.server.cache.type = 'memory'
      const result1 = await internals.start().catch(err => { throw err })
      expect(result1.started).to.equal(true)
      const result2 = await internals.stop().catch(err => { throw err })
      expect(result2.stopped).to.equal(true)
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
