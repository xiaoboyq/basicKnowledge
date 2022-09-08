// require('./moduleA');
// const moduleStr = require('./moduleB');
// console.log(moduleStr)

// node 怎么来处理js模块化规范【commonjs】
const str = `require('./moduleA');const moduleStr = require('./moduleB');console.log(moduleStr)`;

const functionWrapper = [
  'function(require, module, exports){',
  '}'
]

const result = functionWrapper[0] + str  + functionWrapper[1]

// new Function  eval  将字符串转化为可执行的函数 vm类似【node中vm实现】
const vm = require('vm');
vm.runInContext(result)