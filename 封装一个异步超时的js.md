```javascript
function test(asyncFn, timeout) {
  return new Promise((resolve, reject){
    let timer = null
    asyncFn()
    .then(res => {
      if(timer) {
        clearTimeout(timer);
        timer = null;
      }
      resolve(res)
    })
    .catch(err=>{
      throw new Error();
    })

    timer = setTimeout(()=>{
        resolve()
      }, timeout)
  });
}

````

// abcdadcba

// a b c d a d c b a 
// 1 1 1 1 1 3 4 5 6


// 请求失败再次请求 限定次数
function reRequestByLimit(requestFn, times) {
  return new Promise(async (resolve, reject) => {
    let counter = 0;
    function excute() {
      try {
        let res = await requestFn()
        resolve(res)
      } catch (error) {
        if (counter <= timer) {
          excute();
          counter++;
        } else {
          reject()
        }
      }
    }
    excute()

  })
}


// webpackJson()； 第一个参数是chunkIds  第二个数组是moduels 第三个是需要执行的模块id 即chunk主文件的id 
webpackJson([0], {
  'moduleId1': (function(module, module.exports, __webpack_require__) {
      // index.js
      const module2 = __webpack_require__('moduleId2');
      console.log('xxx')
  }),
  'moduleId2':  (function(module, module.exports, __webpack_require__) {
      // index.js
      const module2 = require('moduleId3');
      console.log('xxx')
  }),
  // xxxx ...
}, ['moduleId1'])

(function(modules) {
  window['webpackJson'] = function webpackJsonCallback(chunkIds, moreModules, executeModules) {

    // 将所有moreModules 中的module 全部存入到modules 【即传入的空数组中】

    // 如果executeModules 存在 遍历 executeModules 调用__webpack_require__ 获取到所有的资源 返回

  }



    function __webpack_require__(moduleIId) {

    }

})([])
