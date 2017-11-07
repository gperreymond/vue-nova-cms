const path = require('path')
const shell = require('shelljs')

const method = function (next) {
  const start = new Date()
  const totalDirpath = path.resolve(__dirname, '../../../../data/users/individuals')
  const lastsDirpath = path.resolve(totalDirpath, '2017/10')
  let total = parseInt(shell.exec('ls -R ' + totalDirpath + ' | wc -l', {silent: true}))
  let lasts = parseInt(shell.exec('ls -R ' + lastsDirpath + ' | wc -l', {silent: true}))
  next(null, {
    type: 'query',
    domain: 'users',
    name: 'getUsersStatisticsQuery',
    exectime: new Date() - start,
    result: {
      total,
      lasts
    }
  })
}

module.exports = method
