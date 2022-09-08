
// 面试题：webpack解析import()的原理/webpack懒加载原理/webpack异步加载原理:
// 首先，webpack遇到import方法时，会将其当成一个代码分割点，也就是说碰到import方法了，那么就去解析import方法。
// 然后，import引用的文件，webpack会将其编译成一个jsonp，也就是一个自执行函数，然后函数内部是引用的文件的内容，因为到时候是通过jsonp的方法去加载的。
// 具体就是，import引用文件，会先调用require.ensure方法(打包的结果来看叫require.e)，这个方法主要是构造一个promise，会将resolve，reject和promise放到一个数组中，将promise放到一个队列中。
// 然后，调用require.load(打包结果来看叫require.l)方法，这个方法主要是创建一个jsonp，也就是创建一个script标签，标签的url就是文件加载地址，然后塞到document.head中，一塞进去，就会加载该文件了。
// 加载完，就去执行这段jsonp，主要就是把moduleId和module内容存到modules数组中，然后再去走webpack内置的require。
// webpack内置的require，主要是先判断缓存，这个moduleId是否缓存过了，如果缓存过了，就直接返回。如果没有缓存，再继续往下走，也就是加载module内容，然后最终内容会挂在都module,exports上，返回module.exports就返回了引用文件的最终执行结果。
// 原文链接：https://blog.csdn.net/qq_17175013/article/details/119350311

// 入口文件
import(/* webpackChunkName: "title"*/'./title').then(result => {
  console.log(result);
})

// 依赖文件
module.exports = "title"


var modules = {}
var cache = {}

function require(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule) {
    return cachedModule.exports; // 最终返回的都是module.exports
  }
  var module= cache[moduleId] = {
    exports: {}
  }
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
// 定义查找代码块的方法
require.find = {};
// 通过JSONP一部加载指定的代码块
require.ensure = (chunkId) => {
  let promises = [];
  require.find.jsonp(chunkId, promises); // 在jsonp中会创建一个promise，并且添加到promises数组中
  return Promise.all(promises);
}
require.publicPath = ''; // 资源文件的访问路径，默认是空字符串，值从webpack.config.js的output的publicPath中去找
require.unionFileName = (chunkId) => { // 统一文件名
  return "" + chunkId + ".js"; // title.js
}
require.load = (url) => {
  let script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script); //一旦append之后，浏览器会立刻请求脚本
}
// 已经安装或者加载好的或者加载中的chunk
var installedChunks = {
  "main": 0, // key为“main”表示主入口文件，0表示ok，也就是已经加载就绪
  // "title": [resolve, reject, promise]
}
require.find.jsonp = (chunkId, promises) => {
  var installedChunkData;
  let promise = new Promise((resolve, reject) => {
    installedChunkData = installedChunks[chunkId] = [resolve, reject];
    /*
      这个相当于installedChunks值变成了
      {
        "main": 0,
        "title": [resolve, reject, promise]
      }
    */
  })
  installedChunkData[2] = promise;
  promises.push(promise);
  var url = require.publicPath + require.unionFileName(chunkId); //title.js
  require.load(url); // 常见script，然后塞入document.head，然后会自动加载该文件
}
var webpackJsonpCallback = ([chunkIds, moreModules]) => {
  var resolves = [];
  for (let i = 0; i < chunkIds.length; i++) {
    let chunkId = chunkIds[i];
    resolves.push(installedChunks[chunkId][0]);//把chunk对应的promise的resolve方法添加到resolves数组里去
    installedChunks[chunkId][0] = 0; // 表示已经添加完成
  }
  for (let moduleId in moreModules) {
    modules[moduleId] = moreModules[moduleId];
  }
  while(resolves.length){
    resolves.shift()(); // 让promise的resolve执行，让promise成功
  }
}
// 由于打包好了依赖文件title.js是被
var chunkLoadingGlobal = self["webpackChunk_1_webpack_bundle"] = self["webpackChunk_1_webpack_bundle"] || [];
// 重写数组的push方法
chunkLoadingGlobal.push = webpackJsonpCallback;
require.ensure("title") // 先加载代码块,这里的参数"title"就是魔法字符串中的webpackChunkName的值title
  .then(require.bind(require, "./src/title.js")) // require模块
  .then(result => { // 获取结果
    console.log(result);
  })
