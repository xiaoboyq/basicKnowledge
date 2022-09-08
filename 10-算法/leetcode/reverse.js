/* 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
* 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
* 假设环境不允许存储 64 位整数（有符号或无符号）。
*/
var reverse = function(x) {
  if(-2147483648 > x || x>2147483647) { //Math.pow(-2, 31)  Math.pow(2, 31) - 1 
    return 0
  }
  let flag = x < 0 ? '-' : '+'
  let stringsArr = (x+'').split('')
  var arr = [];
  let i = 0, l = stringsArr.length
  for(; i < l; i++) {
    arr[l - i - 1] = stringsArr[i]
  }
  let res = parseInt(flag+arr.join(''),10)
  if(-2147483648 > res || res>2147483647) {
    return 0
  }
  return res

};

// 1534236469
// 2147483648
reverse(9646324351)