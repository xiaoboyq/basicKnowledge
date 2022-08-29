function getCookie(name){
  var strcookie = document.cookie;//获取cookie字符串
  var arrcookie = strcookie.split("; ");//分割
  //遍历匹配
  for ( var i = 0; i < arrcookie.length; i++) {
  var arr = arrcookie[i].split("=");
  if (arr[0] == name){
  return arr[1];
  }
  }
  return "";
  }


// 正则表达式的选择匹配符只有一个"|"，使用"|"可以匹配指定的多个选项中的任意一项。
// 例如/World|Dream/可以匹配"One World One Dream"中的World或者Dream

// 正则表达式-分组
// 分组就是使用小括号将多个单独的字符或字符类组合成子表达式，
// 以便可以像处理一个独立的单元那样，用"|"、"*"、"+"或者"?"等来处理他们。
// 比如/J(ava)?Script/可以匹配JavaScript，也可以匹配JScript 


// 获取cookies函数  正则     
  function getCookieByRegExp(name) {
    // `(^| )${name}=([^;]*)(;|$)`
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return arr[2]
    return null;
  }


  
// 1.什么是cookie:是一个保存在客户机中的简单的文本文件.
// 2.有什么用:这个文件与特定的 Web 文档关联在一起, 保存了该客户机访问这个Web 文档时的信息, 当客户机再次访问这个 Web 文档时这些信息可供该文档使用。
// 3.cookie的组成:cookie由名/值对形式的文本组成：name=value。
// 4.JavaScript 可以使用 document.cookie 属性来创建 、读取、及删除 cookie。
// 完整格式为：
// document.cookie = 'user=值; expires=失效时间; path=路径访问; domain=域名访问; secure=安全的https限制通信'
// 中括号是可选，name=value是必选。
// https://blog.csdn.net/BS936/article/details/107771929



/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
 var longestCommonSubsequence = function(text1, text2) {
  const len1 = text1.length;
  const len2 = text2.length;

  let dp =  new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));

  for(let i = 0; i < len1; i++) {
    for(let j = 0; j < len2; j++) {
      if(text1[i] === text2[j]) {
       dp[i + 1][j + 1] = dp[i][j] + 1 ;  // dp[j + 1] =  pre + 1 ;   
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j])//  dp[j + 1] = Math.max( dp[j + 1], dp[j])
      }

    }
  }

  return dp[len1][len2]
};

  var longestCommonSubsequence = function(text1, text2) {
    let len1 = text1.length, len2 = text2.length, res = new Array(len2 + 1).fill(0);
    for (let i = 0; i < len1; i++) {
        let pre = 0
        for(let j = 0; j < len2; j++) {
            let temp = res[j + 1]
            if (text1[i] == text2[j]) {
                res[j + 1] = pre + 1
            } else {
                res[j + 1] = Math.max(res[j + 1], res[j])
            }
            pre =  temp
        }

    }
    return res[len2]
};

// p[i][0] -> p[i][len2] 