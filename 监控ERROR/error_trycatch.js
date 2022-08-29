// 运行时错误
try {
  www
} catch (error) {
  console.log('我知道错误了')
  console
  .log(error)
}

// 我知道错误了
// ReferenceError: www is not defined
//     at Object.<anonymous> (/Users/boyq/study/Web/监控ERROR/error.js:2:3)
//     at Module._compile (internal/modules/cjs/loader.js:956:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
//     at Module.load (internal/modules/cjs/loader.js:812:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:724:14)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
//     at internal/main/run_main_module.js:17:11


// 语法错误 中文的分号 trycatch是无法获取的 但是在编辑器或者浏览器中会提示 只是获取不到
try {
  var err = 'wer'；
} catch (error) {
  console.log('我知道错误了') // 这里获取不到
  console.log(error)
}
// 编辑器会报错 
// SyntaxError: Invalid or unexpected token
//     at Module._compile (internal/modules/cjs/loader.js:892:18)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
//     at Module.load (internal/modules/cjs/loader.js:812:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:724:14)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
//     at internal/main/run_main_module.js:17:11


// 异步错误

try {
  setTimeout(() => {
    error        // 异步错误
  }) 
} catch(e) {
  console.log('我感知不到错误'); //获取不到
  console.log(e);
}

// 编辑器或者浏览器会报错
// Uncaught ReferenceError: error is not defined
//     at <anonymous>:3:5