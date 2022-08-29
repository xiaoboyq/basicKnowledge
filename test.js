

// function functions(flag) {    //  函数的正确定义 在高版本浏览器中会自动纠正此问题 看不出毛病  但是在低版本浏览器中会发现  在函数声明提前，return "b"那个把return "a"给覆盖了 结果都是返回b
//     if (flag) {
//       function getValue() { return 'a'; }
//     } else {
//       function getValue() { return 'b'; }
//     }
//     // console.log(getValue())
//     return getValue();
// }

Set
// 原文链接：https://blog.csdn.net/M_Edison/article/details/113407847
// 集合结构一般的实现方式为哈希表。
// 本篇文章的目的时为了明确集合的内部实现机制，因此自己用Object封装一个简单的Set类
// 集合通常时无序的，不能重复的元素构成
// 一种特殊的数组
// 不能通过下标值来进行访问
// 相同的对象只能在集合中存在一份

// 集合自身操作：
// 1.add(value):添加元素
// 2.remove(value):移除某个元素
// 3.has(value):判断value是否在集合中
// 4.clear():清空
// 5.size():长度
// 6.values():返回包含所有元素的数组
// 集合间的操作：
// 7.并集
// 8.交集
// 9.差集： 设A，B是两个集合，由所有属于A且不属于B的元素组成的集合
// 10.子集
// 原文链接：https://blog.csdn.net/M_Edison/article/details/113407847

// function getEmpty() {
//     var a = 10;
//      getBB = function() {
//          a++;
//         //  console.log(a)
//      }
//      return getBB;
// }

// var bb = getEmpty();
// bb()
// var bb = getEmpty();
// bb()
// functions(true)


// let a = new Set([1,2,3]);
// let b = new Set([4,3,2])
// // 并集
// let result1 = new Set([...a],[...b]);  // Set {1,2,3,4}

// // 交集
// let result2 = new Set([...a].filter(x=>b.has(x))); // set {2,3}

// // 差集
// let result3 = new Set([...a].filter(x=>!b.has(x))); // set {1}


// //Set 去重
// // 法1
// [...new Set([1,2,2,3,2,4])] //[1,2,3,4]
// // 法2
// Array.from(new Set([1,2,2,3,2,4]))//[1,2,3,4]


// // 组件化方法
// // 组件化设计思路、需要解决的场景
// // 组件代码规范
// // 组件测试
// // 组件维护， 包括迭代 issue 文档 发布机制
// // 组件化 开发-打包-npm上传 npm install xx 下载

// //  new Date('xxx').getTime() 转化为时间戳


// // 题目0 -----------------------------------------
// /**
//  * @desc 从一个对象通过操作序列来拿里面的值，做基本防空措施
//  * @param {object} data - 需要获取的数据源
//  * @param {array} array - 操作路径
//  * @param {any} initial - 默认值，当没有内容的时候
//  */
// // 期望结果：
// // const tmp = {a: {b: {c: [{d:1}, {e:2}, {f: {k: 3, p: 7}}]}}, v: ''}
// // getIn(tmp, ['a', 'b', 'c'], 'alipay') -> [{d:1}, {e:2}, {f: {k: 3, p: 7}}
// // getIn(tmp, ['a', 'b', 'c', '0', 'd'], 'alipay'); -> 1
// // getIn(tmp, ['a', 'z'], 'alipay'); -> 'alipay'




// var arr = [1, 2, 3, 2, 5];
// // reduce方法有两个参数：在每一项上调用的函数和（可选的）作为归并基础的初始值 【此处的第二个参数10是 pre的初始值】
// // reduce方法的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象
// // 这个函数返回的任何值都会作为第一个参数自动传给下一项
// // 第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数是数组的第二项

// var sum = arr.reduce(function(pre, cur, index, array) { 
//   console.log(pre)
//   return pre + cur;
// }, 10)
// console.log(arr); // (5) [1, 2, 3, 2, 5]
// console.log(sum); // 23



// function getAllNums(str) {
//   let reg = /\d+/g;

//   console.log(str.match(reg))

// }

// getAllNums('xxxx123xxx12xx1')


// let obj = {vaule: 123};
// let oldObj
// function changeValue(obj){ // 按值传递
//   console.log(obj); 
//   oldObj = obj;
//   console.log(oldObj === obj)
//   obj.name = 'ConardLi';
//   obj = {name:'code秘密花园'};
//   console.log(oldObj === obj)
// }


// changeValue(obj);
// console.log(oldObj === obj)
// console.log(obj.name); // ConardLi

// console.log(__dirname) ///Users/boyq/study/Web


// const tmp = {a: {b: {c: [{d:1}, {e:2}, {f: {k: 3, p: 7}}]}}, v: ''}
// getIn(tmp, ['a', 'b', 'c'], 'alipay') -> [{d:1}, {e:2}, {f: {k: 3, p: 7}}
// getIn(tmp, ['a', 'b', 'c', '0', 'd'], 'alipay'); -> 1
// getIn(tmp, ['a', 'z'], 'alipay'); -> 'alipay'


const tmp = {a: {b: {c: [{d:1}, {e:2}, {f: {k: 3, p: 7}}]}}, v: ''};

function getIn(data, array, initial) {
  let n = array.length;
  let res = data;
  while(n) {
    if(res[array[array.length - n]]) {
      res = res[array[array.length - n]];
      n--;
    } else {
      res = initial
      return res
    }
  }
  return res
}

// getIn(tmp, ['a', 'b', 'c'], 'alipay'); // [{d:1}, {e:2}, {f: {k: 3, p: 7}}

getIn(tmp, ['a', 'b', 'c'], 'alipay') //-> [{d:1}, {e:2}, {f: {k: 3, p: 7}}
getIn(tmp, ['a', 'b', 'c', '0', 'd'], 'alipay');// -> 1
getIn(tmp, ['a', 'z'], 'alipay');// -> 'alipay'