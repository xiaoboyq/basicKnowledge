// 压缩字符串 'aaaaaabbbbbcccca' => 'a6b5c4a1'

function compress(str) {
  let strArr = str.split('');
  let res = []
  let count = 1;
  res = [strArr[0], 1]
  for (let index = 1; index < strArr.length; index++) {
  
    if(strArr[index] === strArr[index - 1]) {
      count++;
      res.pop()
      res.push(count)
    } else {
      count = 1
      res.push(strArr[index])
      res.push(count)
    }
  }


  return res.join('')
}

console.log(compress('aaaaaabbbbbcccca'))