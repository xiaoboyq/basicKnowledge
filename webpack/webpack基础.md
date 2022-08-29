## webpack 静态模块打包器 【静态：提前加载好， 代码运行之前就打包好 】 【动态： 按需加载，跑的时候需要再加载】


# module  chunk bundle的理解
<!-- https://www.cnblogs.com/skychx/p/webpack-module-chunk-bundle.html -->
module：对于一份同逻辑的代码，当我们手写下一个一个的文件，它们无论是 ESM 还是 commonJS 或是 AMD，他们都是 module；
chunk：
<!-- 【chunk 一般我们entry里面设置的入口就是单独的一个chunk， 但是动态导入的模块 import('./xxx').then(fn(){})单独成一个chunks】 -->
当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件，webpack 会对这个 chunk 文件进行一些操作。
webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：
我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle



# webpack4
webpack 是commonjs规范的【commonjs是在nodejs服务器端的规范, 在浏览器不可用】
amd 依赖前置 浏览器可用
cmd 依赖就近 浏览器可用

基本项目webpack配置
// 当我们运行webpack命令的时候，会默认从运行命令目录中去寻找 webpack.config.js进行配置
// 因为webpack是node实现的 而且是运行在node环境下的 所以这里可以写node

```javascript
//__dirname 是node自带的 用来获取当前目录
const path = require('path'); //兼容不同操作系统；用来处理路径解析问题 不同操作系统的路径不一样 比如斜杠和反斜杠
// npm i html-webpack-plugin -D  HtmlWebpackPlugin 将生成一个html【如果有模版则根据模版生成】并引入js
const HtmlWebpackPlugin = require('html-webpack-plugin');
在html中 通过HtmlWebpackPlugin定义的title 可以通过 <%= htmlWebpackPlugin.options.title %>

// ejs 高效的嵌入式 JavaScript 模板引擎
<% '脚本' 标签，用于流程控制，无输出。
<%_ 删除其前面的空格符
<%= 输出数据到模板（输出是转义 HTML 标签）
<%- 输出非转义的数据到模板
<%# 注释标签，不执行、不输出内容
<%% 输出字符串 '<%'
%> 一般结束标签
-%> 删除紧随其后的换行符
_%> 将结束标签后面的空格符删除


# 基本配置
//npm clean-webpack-plugin -D 每次执行指令打包清除之前的打包内容
const CleanWebpackPlugin =  require('clean-webpack-plugin');
// 不同版本 方式不同
// const { CleanWebpackPlugin } =  require('clean-webpack-plugin');

// npm i mini-css-extract-plugin 将css以单独文件输出
const MiniCssExtractPlugin =  require('min-css-extract-plugin');

// npm i webpack webpcak-cli -D
const webpack  = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  // entry 三种方式： string | object | array
  // 单入口 一对一
  // entry: './index.js', 

  // 多入口 多对一 多个入口 一个打包文件
  // entry: [
  //   './index.js',
  //   './index1.js'
  // ],

  // 多对多 多个入口 多打包文件
  entry: {
    "index": './index.js',
    "index1": "./index1.js"
  },
  output: {
    path: path.resolve(__dirname, './build.js'),
  },
  module: {
    rules: [
      // npm i style-loader css-loader postcss-loader less-loader
      {
        test: /\.less$/,
        // loader 从右向左执行 洋葱模型
        // style-loader 会将css 以<style></style>形式插入页面
        use: ['style-loader', 'css-loader','postcss-loader', 'less-loader' ]
        【请看笔记第4条】
        // style-loader  还可以控制插入的顺序 这里可以控制渲染的先后
        // MiniCssExtractPlugin插件会将css以单独的文件进行打包 以loader方式执行
        // loader: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader' ]
      },

      // npm i file-loader -D
      // {
      //   test: /\.jpeg$/,
      //   use: { 
      //     loader: 'file-loader'
      //   }
      // },
      // npm i url-loader -D
      {
        test: /\.jpeg$/,
        use: {
          loader: 'url-loader', // 
          limit: 2080, // 可以将小于2080的图片以base64格式直接打包到代码中，减少http请求数量。大的生成链接
          // 为什么不都打包成base64 不更少的http请求吗
          【请看笔记第3条】
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: '自定义的网站标题', // 在模版html中<%= HtmlWebpackPlugin.options.title %>引用
      filename: 'index.html', // 输出的html文件名
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    // HotModuleReplacementPlugin 是webpack自带的
    new webpack.HotModuleReplacementPlugin(),  
  ],
  devServer: {
    contentBase: './build', // 这时HtmlWebpackPlugin将在内存中生成html文件，而不是在出口目录中
    port: '8080',
    // 开启热更新
    hot: true, // devServer 开启hot后 会判断配置中plugin中有没有引入 webpack.HotModuleReplacementPlugin 如果没有， 会默认引入 确保hmr生效 【这是webpackdevServer中的功能】
    【请看笔记第2条】

    // 即使hmr不生效， 也不刷新整个页面， 从而保留当前操作【比如js改动了， hmr没有生效， 页面不会刷新， js改动为什么hmr不生效，】
    【请看笔记第1条】
    hotOnly: true, 
    proxy: { // 服务器代理 【解决开发环境跨域问题】
      target: 'http://localhost:8099',
    }
  }
}

```

# 笔记：
1. HotModuleReplacementPlugin 很多时候表面看hmr只会对css等样式生效， 对js是不生效的。 这原因是hmr并不是开箱即用的， 对css有效 是loader中的style-loader, css-loader等已经对热更新进行了处理。 
而对于js来说， js的输出是五花八门，没有规律可言的 可以输出一个函数，类 对象，变量等等各种。 webpack要处理的是有规律的东西，从而没有办法对js进行热更新处理。
## 引发问题： 那为什么vue和react中热更新对js可以有效呢？
这是因为vue和react对js有了一定的约束和规范， 比如react中js输出是函数或者类，有规律。所有可以实现热更新。

## 在普通的项目中， 那js怎么实现热更新 ===> 判断是否支持hot 支持则去除原先的 然后重新执行
```javascript
if(module.hot) {
  // 监听a文件的变化
  module.hot.accept('./a', ()=>{
    // 如果a文件变化了 执行此处
  })
}
```
总结： HMR对css的支持比较好， 对于js的要使用 module.hot.accept来监控改变

2. 开发中发现， 当webpack-dev-server中已经设置了hot: true时， plugin中并没有配置 new Webpack.HotModuleReplacementPlugin时， HRM同样可以生效。 ？？？

## 为什么可以生效
这得看dev-server的源码， 其中有这样一条， 当启动derServer.hot时， 如果config中没有HotModuleReplacementPlugin，dev-server会引入HotModuleReplacementPlugin。这是devServer做的事，当然，如果开发时候用其他的插件来做本地服务器，还是要配置的。

3. base64格式的图片 会比原本的图片大1/3 也就是原图片的4/3大小，还有不会被浏览器缓存【在css中背景图片会和css一起缓存】
# 适用场合
当访问外部资源很麻烦或受限时
当图片是在服务器端用程序动态生成，每个访问用户显示的都不同时。
当图片的体积太小，占用一个HTTP会话不是很值得时。

<!-- https://blog.csdn.net/huangpb123/article/details/77680083 -->
# 不适用场合
Base64编码的数据体积通常是原数据的体积4/3，也就是Data URL形式的图片会比二进制格式的图片体积大1/3。
Data URL形式的图片不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次。这是一个使用效率方面的问题——尤其当这个图片被整个网站大量使用的时候。

用Data URI方式的Demo在渲染时会比不使用 多消耗53%左右的CPU资源，内存多出4倍左右，耗时平均高出24.6倍 。由此可见，使用Data URl方式还是需要更多的考量，在可接受的范围内适量使用。

<!-- 
在package.json中引入或者运行第三方包 可以简写

比如 
"script": {
  "start": "webpack xxx.js" // 运行webpack命令就是 路径的简写
  }
<==>
"script": {
  "start": "./node_modules/.bin/webpack xxx.js";  // 一般第三方工具类中都有一个bin目录
}
 -->

 4. style-loader 

 {
   loader: "style-loader",
   options: {
     insertAt: 'top', // 插入到body的顶部
     inserInto: 'body',
     singleton: true , //将所有的style标签合并成一条
   }
 }

 <!-- 如果有一个场景, 基于 antd 封装了一个自己公司风格的组件样式库. 怎么确保在 antd 样式后加载? -->
 因为 css-loader 实际上只是会解析生成对应的类名, 最后我们还得根据 style-loader 插入 html 中, 那这里可以控制它插入的顺序. 根据文档的配置信息, 控制 css 的插入顺序. 即可控制先后加载顺序.

 # 将css 插入到html中
 1. loader: style-loader 

 2. plugin: html-inline-css-webpack-plugin 
 针对打包好的css的chunk方法 通过插件将css代码插入到html中去。




webpack 打包时候会从入口文件开始寻找依赖， 会查看有没有import 或者require 来获取依赖


Background 的url 图片怎么处理 loader	css-loader 会处理成js; MinCssExtractPlugin 会将其打包成分开的图片 以url引入