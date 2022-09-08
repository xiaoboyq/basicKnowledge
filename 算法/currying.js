// 柯里化 currying

function curry(fn, currArgs) {

  return function () {
    let args = [].slice.call(arguments);
    // ⾸次调⽤时，若未提供最后⼀个参数currArgs，则不⽤进⾏args的拼接
    if (currArgs !== undefined) {
      args = args.concat(currArgs);
    }
    // 递归调⽤
    if (args.length < fn.length) {
      return curry(fn, args);
    }
    // 递归出⼝
    return fn.apply(null, args);
  }
}


function sum(a, b, c) {
  console.log(a + b + c);
}
const sumFn = curry(sum);
//  sumFn(1, 2, 3); // 6
sumFn(1, 2)(3); // 6
//  sumFn(1)(2, 3); // 6
//  sumFn(1)(2)(3); // 6



var new_array = arr.map(function callback(currentValue, index, array) {
  //  Return element for new_array
}, thisArg);


