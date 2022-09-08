/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {

  let left = 0; 
  let right = x;
  if(x === 0 || x ===1) return x

  while (left <= right) {
    // let middle = Math.floor((left + right) / 2);
    // 这样写是防止溢出【x>>1 表示x除以2并取整，缩小一下遍历的范围】
    let middle = left + ((right - left) >> 1);
    let midPow = middle * middle;
    if(midPow > x) {
      right = middle - 1
    } else if(midPow < x) {
      left = midPow + 1
    } else {
      return middle
    }

  }

  return left

};
