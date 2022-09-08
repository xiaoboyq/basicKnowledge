const path =  require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'index': './index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: '/\.css$/',
        use: [
         MiniCssExtractPlugin.loader, css-loader
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: '12312',
    }),
    new CleanWebpackPlugin()
  ],
  devserve: {
    hot: true,
    hotOnly: true,
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost: 8082',
      } 
    }
  }
}


//

if(module.hot) {
  module.hot.accept('./fn.js', function () {
      console.log('更新了')
      // 处理更新逻辑， 当fn.js变化时候， 触发哪些更新逻辑

      // module的更新监听的是模块不是具体的代码 监测不到具体的代码
  })  
}