const { expect } = require('chai')

const handler = require('.')

describe('[admin] auth-control handler', () => {
  it('should return statusCode 401, because user not found', async () => {
    try {
      const request = {
        state: {}
      }
      await handler(request).catch(err => { throw err })
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.isBoom).to.equal(true)
      expect(e.output.statusCode).to.equal(401)
    }
  })
})
