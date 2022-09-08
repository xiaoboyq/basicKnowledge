<!-- 阿里云日志服务 免费的 存多少都没问题 -->

JS 异常处理

# try-catch 异常处理
只能处理js运行时非异步的错误， 对于语法错误和异步错误是没有办法获取的




# window.onerror
无论是异步还是同步都可以获取到，但是获取不到网络请求的错误
<!-- 
在实际的使用过程中，onerror 主要是来捕获预料之外的错误，而 try-catch 则是用来在可预见情况下监控特定的错误，两者结合使用更加高效。-->

然而 window.onerror 对于语法错误还是无能为力，所以我们在写代码的时候要尽可能避免语法错误的，不过一般这样的错误会使得整个页面崩溃，还是比较容易能够察觉到的。

## 注意 
  1. 对于 onerror 这种全局捕获，最好写在所有 JS 脚本的前面，因为你无法保证你写的代码是否出错，如果写在后面，一旦发生错误的话是不会被 onerror 捕获到的。
  2. 另外 onerror 是无法捕获到网络异常的错误。
  当我们遇到 <img src="./404.png"> 报 404 网络请求异常的时候，onerror 是无法帮助我们捕获到异常的。

```javascript
/**
 * @param {String}  msg    错误信息
 * @param {String}  url    出错文件
 * @param {Number}  row    行号
 * @param {Number}  col    列号
 * @param {Object}  error  错误详细信息
 */
 window.onerror = function (msg, url, row, col, error) {
  console.log('我知道错误了');
  console.log({
    msg,  url,  row, col, error
  })
  return true;
};
error;
```




# 网络请求错误 错误
资源和ajax请求可以获取 获取不了promose的错误
 <!-- window.addEventListener('error', funciton(){}, ture)   
 网路请求异常不会事件冒泡， 所以要在捕获时候将其捕获，可以捕获错误信息， 但是获取不了错误类型 404 500等， 需要配合服务器日志进行排查； 另外此方法获取不了promise的错误 -->
  例如：html中  有张图片 加载失败
  <img src="./404.png">

```javascript
  window.addEventListener('error', function(msg,rul,row, col,error ) {
    console.log('获取了资源加载失败，')
  }, true)
```

# 静态资源加载异常
在出现静态资源加载异常的元素的 onerror 方法中处理。
资源加载异常触发的error事件不会冒泡，因此使window.addEventListener('error', cb, true) 在事件捕获阶段进行捕获。
第一种方式侵入性太强，不够优雅，目前主流方案均采用第二种方式进行监控：




# Promise 错误

 1. .catch() 方式
 2. rejected 【then的第二个参数】
 3. 全局捕获示例：unhandledrejection 
 window.addEventListener('unhandledrejection')


# 前端页面崩溃监测

https://note.youdao.com/s/8KsuVgmB


