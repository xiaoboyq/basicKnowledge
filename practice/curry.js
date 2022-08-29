// 设计一个函数 func，可以对其他任意函数 funcX 进行处理，并满足：func(funxX)(x1)(x2)(x3) 的结果等同于funcX(x1, x2, x3) ，
//funcX可以为任意函数，且参数数量不固定。

function curring(fn, arr = []) {
  let len = fn.length;
  return function(...args) {
     arr = [ ...arr, ...args];
    if(arr.length < len) {
      console.log(arr)
      return curring(fn, arr)
    } else {
      console.log(arr)
      return fn(...arr)
    }
   }
}



function funx(a,b,c) {
  console.log(a+b+c)
}

curring(funx)(1)(2)(3)