/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
 var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for(let i = 1; i <= m; i++) {
    for(let j = 1; j <= n; j++) {
      if(text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
};

//     a b c d e
//   0 0 0 0 0 0 
// a 0 1 1 1 1 1
// b 0 1 2 2 2 2
// f 0 1 2 2 2 2
// d 0 1 2 2 3 3


var longestCommonSubsequence = function(text1, text2) {
  let len1 = text1.length;
  let len2 = text2.length;

  let arr = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));

  for(let i = 0; i < len1; i++) {
    for(let j = 0; j < len2; j++) {
      if(text1[i] === text2[j]) {
        arr[i + 1][j + 1] = arr[i][j] + 1
      } else {
        arr[i + 1][j + 1] = Math.max(arr[i - 1][j], arr[i][j -1])
      }
    }
  }
  return arr[len1][len2]

}
