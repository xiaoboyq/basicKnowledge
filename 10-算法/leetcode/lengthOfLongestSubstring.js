var lengthOfLongestSubstring = function(s) {
  // 一个长字符串中没有重复字母的   
  // 每个字母遍历
  // let  obj = {};
  let arr = s.split('')
  if(!arr.length) {
    return 0
  }
  let  max = 1;
  let strings = arr[0];  // a 
  for(let i = 1, l = arr.length; i < l; i++ ) {
    if(strings.includes(arr[i])) {
      if(strings.length > max) {
        max = strings.length
      }
      let index = strings.indexOf(arr[i]);
      strings = strings.substring(index+1, strings.length)+arr[i];
    } else {
      strings = strings + arr[i];
      // console.log(strings)
      // max = strings.length
      if(strings.length > max) {
        max = strings.length
      }
    }
    // console.log(strings)
  }
  console.log(max)
  return max
};

lengthOfLongestSubstring("abcabcbb")
lengthOfLongestSubstring("bbbbb")
lengthOfLongestSubstring("au")
lengthOfLongestSubstring("nfpdmpi")