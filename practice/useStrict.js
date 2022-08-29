'use strict';
var b = 2;
if(true) {  // 块状作用域
  let a = 2;
  var b = 3;
  var c = 4;
  const d = 5;
}
console.log(a);
console.log(b);
console.log(c);
console.log(d);

var d = 6

/**
 * ReferenceError: a is not defined  // 非严格模式也一样  暂时性死区
*/