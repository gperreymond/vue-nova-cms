const path = require('path')

module.exports = {
  entry: {
    admin: path.resolve(__dirname, 'applications/admin/client/main.jsx')
  },
  output: {
    path: path.resolve(__dirname, '.tmp'),
    filename: '[name].min.js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'css-loader'
    }]
  },
  devtool: '#eval-source-map'
}

// exclude NPM deps from test bundle
module.exports.externals = [require('webpack-node-externals')()]
// use inline source map so that it works with mocha-webpack
module.exports.devtool = 'inline-cheap-module-source-map'
