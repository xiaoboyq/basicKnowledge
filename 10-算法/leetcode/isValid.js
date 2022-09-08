/**
 * @param {string} s
 * @return {boolean}
 */

 var isValid = function(s) {
 if(!s.length||s.length%2 !==0) {
  return false
 }

 let left = ['(','{','['];
 let right = [')','}',']'];
 let s_arr =  s.split('');

 let i = 0
 let res = []
 while(s_arr.length - i) {
  if(left.includes(s_arr[i])) {
    res.push(s_arr[i])
  } else {
    if(res.length&&res[res.length - 1] === left[right.indexOf(s_arr[i])]) {
      res.pop()
    } else {
      return false
    }
  }
  i++
 }
 if(res.length) {
   return false
 }

 return true

  
};

let s = "(())"
console.log(isValid(s))