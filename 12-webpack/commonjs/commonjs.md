
commonjs是同步机制， 在浏览器运行不了【需要异步加载形式】
1. commonjs 每个js文件天然的， 每一个文件都限制在一个自己的作用域里面， 所以没有命名冲突问题。
2. 导入导出模块

module.exports ={} 导出
require('xxx') 导入
导出导入也避免了js 引入的先后顺序问题， 以及循环加载问题的解决。

node 在commonjs基础上增加了一些自己的特性：
比如：
 require('./axios'); // 当axios是文件夹的时候 会默认读取./axios/index.js的内容
 如果没有index.js  require('./axios'); 会报错
此时node提供了可以改入口的机制
package.json中定义
{
  "name": "x",
  "version": "1.2",
  "main": "index1.js" // 用来定义入口文件的 
}


// 一般第三方模块 这样用
const  xxx = require('xxx'); // require('xxx');是绝对路径时候 不是形如./xxx的时候 他的解析规则如下
//   paths: [ // 模块解析规则 从路径一个个找
//     '/Users/boyq/study/Web/webpack/commonjs/node_modules',
//     '/Users/boyq/study/Web/webpack/node_modules',
//     '/Users/boyq/study/Web/node_modules',
//     '/Users/boyq/study/node_modules',
//     '/Users/boyq/node_modules',
//     '/Users/node_modules',
//     '/node_modules' 
//   ]

console.log(xxx)

// Module {
//   id: '.',
//   path: '/Users/boyq/study/Web/webpack/commonjs',
//   exports: {}, // 导出的本身内容
//   parent: null, // 父模块
//   filename: '/Users/boyq/study/Web/webpack/commonjs/common.js',
//   loaded: false, // 是否被其他文件加载
//   children: [], // 子模块 也就是加载了哪些其他模块
//   paths: [ // 模块解析规则 从路径一个个找
//     '/Users/boyq/study/Web/webpack/commonjs/node_modules',
//     '/Users/boyq/study/Web/webpack/node_modules',
//     '/Users/boyq/study/Web/node_modules',
//     '/Users/boyq/study/node_modules',
//     '/Users/boyq/node_modules',
//     '/Users/node_modules',
//     '/node_modules' 
//   ]
// }