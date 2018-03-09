const { expect } = require('chai')

const plugin = require('./index')

describe('[server] nova plugin', () => {
  it('should not register', async () => {
    try {
      await plugin.register()
    } catch (e) {
      expect(e).to.not.equal(null)
      expect(e.code).to.equal('ERR_ASSERTION')
      expect(e.name).to.equal('AssertionError [ERR_ASSERTION]')
    }
  })
  it('should register', async () => {
    try {
      const server = { app: {} }
      server.route = () => {}
      await plugin.register(server)
      expect(server.app).to.have.property('nova')
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
