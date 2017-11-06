const chai = require('chai')
const expect = chai.expect

const server = require('../../server')

describe('[unit] server', () => {
  it('should fail start the cache in memory', done => {
    server.startCache().catch((error) => {
      expect(error.message).to.equal('Server not started')
      done()
    })
  })
  it('should initialize', done => {
    server.initialize().then(() => {
      done()
    }).catch(done)
  })
  it('should fail to start the cache from non existing cache', done => {
    server.startCache('totoplop').catch((error) => {
      expect(error.message).to.equal('Server cache type not allowed')
      done()
    })
  })
  xit('should fail start the cache from memcached', done => {
    server.startCache('memcached').catch((error) => {
      expect(error.message).to.equal('Failed opening memcached connection')
      return done()
    })
  })
  it('should start the cache from memory', done => {
    server.startCache().then((result) => {
      expect(result.isReady).to.equal(true)
      done()
    }).catch(done)
  })
  it('should start', done => {
    server.start().then(() => {
      done()
    }).catch(done)
  })
  it('should stop the cache in memory', done => {
    server.stopCache().then((result) => {
      expect(result.isReady).to.equal(false)
      done()
    }).catch(done)
  })
  it('should stop', done => {
    server.stop()
    done()
  })
})
