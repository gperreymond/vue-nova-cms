const path = require('path')
const Promise = require('bluebird')
const glob = require('glob-promise')

const method = function (next) {
  const start = new Date()
  const usersDirpath = path.resolve(__dirname, '../../../../data/collector/postgres/individuals')
  const lastsDirpath = path.resolve(usersDirpath, '2017/06')
  let requests = {
    users: glob(path.resolve(usersDirpath, '**/*.yml')),
    lasts: glob(path.resolve(lastsDirpath, '**/*.yml'))
  }
  Promise.props(requests).then(result => {
    next(null, {
      type: 'query',
      domain: 'users',
      name: 'getUsersStatisticsQuery',
      exectime: new Date() - start,
      result: {
        admin: 3,
        users: result.users.length,
        lasts: result.lasts.length
      }
    })
  }).catch(next)
}

module.exports = method
