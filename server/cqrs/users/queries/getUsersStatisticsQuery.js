const method = function (next) {
  const start = new Date()
  next(null, {
    type: 'query',
    domain: 'users',
    name: 'getUsersStatisticsQuery',
    exectime: new Date() - start,
    result: {
      admin: 3,
      users: 2345,
      lasts: 34
    }
  })
}

module.exports = method
