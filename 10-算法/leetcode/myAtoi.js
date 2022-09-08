/**
 * @param {string} s
 * @return {number}
 */
 var myAtoi = function(s) {
  s = s.replace(/^\s*/,"");
  let arr = s.split('');
  let res = [];
 
  if(arr[0]!=='-' && arr[0] !== '+'&&!/^[0-9]$/.test(arr[0])) {
    return 0;
  }
  res.push(arr[0])

  let i = 1; l = arr.length;
  for(; i < l; i++) {
    if(!/^[0-9]$/.test(arr[i])) {
      break
    }
    res.push(arr[i])
  }

  if((res[0]==='-' || res[0] === '+')&&res.length === 1) {
    return 0;
  }
  res= parseInt(res.join(''),10)

  if(-2147483648 > res || res>2147483647) {
    return  -2147483648 > res ? -2147483648 : 2147483647
  }

  return res
};

// console.log(myAtoi("words and 987"))
// console.log(myAtoi('4193 with words111'))
console.log(myAtoi('+-12'))