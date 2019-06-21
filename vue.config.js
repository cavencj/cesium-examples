/*
 * @Author: Caven
 * @Date: 2018-12-15 00:33:19
 * @Last Modified by: Caven
 * @Last Modified time: 2019-06-21 13:12:35
 */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    module: {
      unknownContextCritical: false
    },
    performance: {
      hints: false
    },
    plugins: [new MonacoWebpackPlugin()]
  },
  chainWebpack: config => {
    config.resolve.extensions.add('.js').add('.vue')
  }
}
