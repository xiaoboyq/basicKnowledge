// 柯里化又称部分求值，字面意思就是不会立刻求值，而是到了需要的时候再去求值。

// var currying = function(fn) {
//   var args = [];
//   return function() {
//     if(arguments.length === 0) {
//       return fn.apply(this, args)
//     } else {
//       [].push.apply(args, arguments);
//       //　arguments有一个callee属性，该属性是一个指针，指向拥有这个arguments对象的函数
//       return arguments.callee   // 返回函数本身 当calculate(100)(200)(300) 连续传参数使用
//     }
//   }
// }

// const cost = (function() {
//   let money = 0;

//   return function() {
//     for(let i = 0,l=arguments.length;  i < l; i++) {
//       money += arguments[i]
//     }
//     return money;
//   }
// })();

// var calculate = currying(cost)
// calculate(100)(200)(300)
// console.log(calculate())


function checkType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}


/**
 * 补充小知识： 函数的长度  
 *    length 是js函数对象的一个属性值，该值是指 “该函数有多少个必须要传入的参数”，即形参的个数
 *    形参的数量不包括剩余参数个数，仅包括 “第一个具有默认值之前的参数个数”
 *    当参数中没有默认值时，函数的长度就是形参的个数
 *  参考： https://www.cnblogs.com/go4it/p/9678028.html
 *  另注: arguments.length 是函数被调用时实际传参的个数
  **/
// 通用柯里化函数
function curring(fn, arr = []) {
  // console.log(fn.length) 
  // console.log(arr);
  let len = fn.length; // 代表fn需要传入参数的个数 fn.length 为函数fn的参数个数 此处为2
  return function (...args) {
    arr = [...arr, ...args];
    if (arr.length < len) {
      // 传入的参数达不到执行条件,递归继续接受参数
      return curring(fn, arr);
    } else {
      return fn(...arr);
    }
  }
}

// 生成验证函数
let util = {};
let types = ['String', 'Number', 'Boolean', 'Null', 'Undefined'];
types.forEach(type => {
  util[`is${type}`] = curring(checkType)(type);
})
console.log(util.isString('hello'))


// https://heyingye.github.io/2018/04/20/%E6%9F%AF%E9%87%8C%E5%8C%96%E5%87%BD%E6%95%B0%E5%BA%94%E7%94%A8/