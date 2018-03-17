const path = require('path')

module.exports.method = 'GET'
module.exports.path = '/admin/{p*}'
module.exports.handler = {
  file: { path: path.resolve(__dirname, '../../../public/index.html') }
}
