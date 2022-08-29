/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
  let max = 0; // 用来保存最长的长度
  let maxStr = ''; // 输出的最长字符串

  for(let i = 0; i <s.length; i++) {
    let str = s[i]; // 当前回文字符串
    let l = i - 1; // 左侧的字符串的index
    while(s[i] === s[i + 1]) { // 如果后面有相同的 则加入到回文字符串中
      str += s[i];
      i++;
    }
    let r = i + 1; // 右侧的字符串
    while(s[r] === s[l] && s[l] !== undefined) {
      str = s[l] + str + s[r];
      l--;
      r++
    }
    if(str.length > max) {
      max = str.length;
      maxStr = str
    }
  }

  console.log(maxStr)
  return maxStr


};


longestPalindrome("babad")