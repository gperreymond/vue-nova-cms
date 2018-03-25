const path = require('path')
const Vue = require('vue')

const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(path.resolve(__dirname, '../../public/index.html'), 'utf-8')
})

module.exports.method = 'GET'
module.exports.path = '/{p*}'

const app = new Vue({
  template: `<div><h2>SSR with vueJS</h2></div>`
})

module.exports.handler = async (request) => {
  try {
    const html = await renderer.renderToString(app).catch(err => { throw err })
    return html
  } catch (e) {
    return {renderer: false}
  }
}
