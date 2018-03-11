const { expect } = require('chai')
const jwt = require('jsonwebtoken')

const config = require('../../../../config')
const handler = require('.').handler

const cache = {
  get: (key) => {
    return new Promise((resolve, reject) => {
      if (key.id === '1234-5678') {
        return resolve(null)
      }
      resolve({
        id: key.id,
        name: 'test'
      })
    })
  }
}

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
  it('should return statusCode 500, because jwt malformed', async () => {
    try {
      const request = {
        state: { rememberMePluginAdmin: 'rememberMePluginAdmin' }
      }
      await handler(request).catch(err => { throw err })
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('jwt malformed')
    }
  })
  it('should return statusCode 401, because user not found in cache', async () => {
    try {
      const token = jwt.sign({id: '1234-5678'}, config.server.auth.jwt2.secret)
      const request = {
        state: { rememberMePluginAdmin: token },
        server: { app: { cache } }
      }
      await handler(request).catch(err => { throw err })
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.isBoom).to.equal(true)
      expect(e.output.statusCode).to.equal(401)
    }
  })
  it('should return the token and user', async () => {
    try {
      const token = jwt.sign({id: '5678-666-0000'}, config.server.auth.jwt2.secret)
      const request = {
        state: { rememberMePluginAdmin: token },
        server: { app: { cache } }
      }
      const result = await handler(request).catch(err => { throw err })
      expect(result.account.id).to.equal('5678-666-0000')
      expect(result.account.name).to.equal('test')
    } catch (e) {
      console.log(e)
      expect(e).to.equal(null)
    }
  })
})
