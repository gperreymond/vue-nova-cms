const chai = require('chai')
const expect = chai.expect

const handler = require('../../../plugins/api/plugins/list/handler')

const requestSucess = {
  path: '/',
  server: {
    methods: {
      getPlugins: require('../../../server/methods/getPlugins')
    }
  }
}

const requestFail = {
  path: '/',
  server: {
    methods: {
      getPlugins: function (callback) {
        callback(new Error('ERROR_TEST_UNIT'))
      }
    }
  }
}

describe('[unit] plugin api/plugins/list', () => {
  it('should fail because getPlugins() return an error', done => {
    handler(requestFail, (error) => {
      expect(error.isBoom).to.eq(true)
      done()
    })
  })
  it('should success', done => {
    handler(requestSucess, (result) => {
      expect(result.type).to.eq('plugins')
      expect(result.count).to.be.a('number')
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
})
