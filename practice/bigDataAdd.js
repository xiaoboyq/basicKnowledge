function bigDataAdd(a, b) {
  let maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, 0)
  b = b.padStart(maxLength, 0)
  
  let sum = '';
  let flag = 0;
  for(let i = maxLength - 1; i >= 0; i--) {
    let add = parseInt(a[i], 10) + parseInt(b[i], 10) + flag
    flag = Math.floor(add /10)
    sum = add%10 + sum
  }  
  if(flag) { sum = flag + sum }


  return sum
}
