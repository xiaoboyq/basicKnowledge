/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 * 50
 */

// 暴力解决不行 超时间
 var myPow = function(x, n) {
  if(n === 0) {
    return 1
  }
  let res = 1;

  if(n > 0) {
    while(n--) {
      res *= x
    }
  } else {
    let index = -n;
    while(index --) {
      res *= x
    }
    res =  1 /res
  } 

  return res
 };

console.log( myPow( 2.00000, -2147483648))



var myPow = function(x, n) {
  if(n === 0) return 1;
  if(n < 0) return x * myPow(x, -n);
  if(n % 2) return x * myPow(x, n -1)
  return x * x * myPow(x, n / 2)

}

// nb  👍
// var myPow = function(x, n) {
//   if(n ===0 )  return 1;
//   else if(n < 0)  return (1 / myPow(x, -n))
//   else if(n % 2) return x * myPow(x, n - 1);

//   return x*x*myPow(x, n / 2)
// }