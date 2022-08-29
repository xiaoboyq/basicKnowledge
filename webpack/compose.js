// function compose(...funcs) {
//   //=>funcs:传递的函数集合
//   return function proxy(...args) {
//       //=>args:第一次调用函数传递的参数集合
//       let len = funcs.length;
//       if (len === 0) {
//           //=>一个函数都不需要执行,直接返回ARGS
//           return args;
//       }
//       if (len === 1) {
//           //=>只需要执行一个函数，把函数执行，把其结果返回即可
//           return funcs[0](...args);
//       }
//       return funcs.reduce((x, y) => {
//         console.log('x',x)
//         console.log('y', y)
//           return typeof x === "function" ? y(x(...args)) : y(x)
//       });
//   };
// }

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) =>{
    console.log('a',a)
    console.log('b',b)
    return (...args) => a(b(...args))
  } )
}

function test1(a){
  return a + 10
}
function test2(a){
  return a * 10
}
function test3(a){
  return a - 10
}
console.log(compose(test1, test2, test3)(2))