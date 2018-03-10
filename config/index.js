const path = require('path')
const nconf = require('nconf')

nconf.argv().env().file({ file: 'nconf.json' })

module.exports = {
  env: process.env.NODE_ENV,
  commit: process.env.NOVA_LAST_COMMIT || 'localhost',
  memcached: {
    host: nconf.get('NOVA_MEMCACHED_HOST') || 'localhost',
    port: nconf.get('NOVA_MEMCACHED_PORT') || 11211
  },
  server: {
    host: nconf.get('NOVA_SERVER_HOST') || '0.0.0.0',
    port: nconf.get('NOVA_SERVER_PORT') || 8000,
    cache: {
      type: nconf.get('NOVA_SERVER_CACHE') || 'memory'
    },
    auth: {
      jwt2: {
        secret: nconf.get('NOVA_SERVER_AUTH_JWT2_SECRET') || 'Xc45GvnvB4NSvTQ5BaAz5DHKM9DzEDknxufBTa3wNZnEVJaeRV'
      },
      google: {
        clientId: '10370308640-g91r2ga04jig3j9ajisk4damedt9beah.apps.googleusercontent.com',
        clientSecret: 'yAB0jaBfQXkogGcor9SXAVnZ',
        password: 'yjZt6aLnMt4cRSGXT6HAQ5FDbSkAMVsVNrC6w4mfSjMcKPxgJS',
        location: 'http://localhost:8000'
      }
    }
  },
  settings: {
    userpath: nconf.get('NOVA_SETTINGS_USERPATH') || path.resolve(__dirname, '../user')
  },
  accounts: {
    admin: {
      email: 'gperreymond@gmail.com'
    }
  }
}
