(function () {
  var moduleList = [
    function(require, module, exports) {
      require.ensure('1') 
      .then(res=>{
        console.log(res)
      })
      }
  ]

  var moduleDepIdList = [
    // {
    //   "./moduleA": 1
    // },
    // {}
  ]

  var cache = {};

  function require(id, parentId) {
    const currentModuleId = parentId !== undefined ? moduleDepIdList[parentId][id] : id;
    var module = { exports: {}}
    var moduleFunc = moduleList[currentModuleId]
    moduleFunc((id) => require(id, currentModuleId), module, module.exports)
    return module.exports
  }

  window.__JSONP =  function (chunkId, moduleFunc) {
    var currentChunkStatus = cache[chunkId]
    var resolve =  currentChunkStatus[0]; // 获取resolve
    var module = {exports: {}};
    moduleFunc(require, module, module.exports)
    resolve(module.exports)
  }

  require.ensure  = function(chunkId, parentId) {
    const currentModuleId = parentId !== undefined ? moduleDepIdList[parentId][chunkId] : chunkId;
    const currentChunkStatus = cache[currentModuleId];

    if(currentChunkStatus === undefined) {
      var $script =  document.createElement('script'); // jsonp
      $script.src="./chunk" + chunkId + ".js";
      document.body.appendChild($script);

      var promise = new Promise(function(resolve){ // promise 会同步执行 里面没有异步内容 只是为了保存resolve 利用promise.then来传递参数
        var chunkCache = [resolve]; // 保存当前额度resolve  
        chunkCache.status = true; // 标记这个chunk已经存在， 如果第二次调用会直接取这个 不需要重新请求
        cache[currentModuleId]= chunkCache;
      })

      cache[currentModuleId].push(promise) // 保存当前的promise
      return promise;
    }

    if(cache[currentModuleId].status) { // 如果这个chunk已经存在
      return cache[currentModuleId][1] // 返回这个promise
     }
  }

  // moduleList[0](null, module, require)
  // require(0)
  moduleList[0](require, null, null)
})()


// index.bundle.js 异步通过jsonp来加载chunk; 【这里代码是已经生成了chunk，怎么在浏览器去获取chunk】
// 那么这里的chunk是怎么生成的呢？ 那打包是怎么获取到依赖以及依赖的代码【怎么递归获取插入到moduleList中的】