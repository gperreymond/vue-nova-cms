const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'client/main.js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, 'client'),
      '@libs': path.join(__dirname, '../libs')
    }
  },
  output: {
    path: path.resolve(__dirname, '../../build/admin/'),
    filename: '[name].min.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: true
    }),
    new ExtractTextPlugin('[name].min.css')
  ]
}
