
面试题：
1. 数组 改变长度的方法长度。
# push shift unshift pop concat  arr[100] = 1  arr.length = 2
2. react renderProps 和hoc 以及其他高级用法

3. react hooks  用到的钩子以及作用  详细讲解useCallback； react 传参

4. es6相对于es5 增加了哪些特性， 其中为什么会出现箭头函数， let const用法  class
5. 柯里化 闭包【数据结构方面的原理： 堆栈】
6. webpack【打包优化】
7. es5的继承有哪几种实现方式， 各有什么优缺点
8. try catch 获取异常 异步的该怎么捕获
<!-- window.onerror -->
9. git 常见操作， 回滚版本  git reset --hard 和 git reset 区别

10. 垃圾回收机制 详说
11. xss 和 csrf的原理和区别 怎么去解决
12. css盒模型和BFC
13. 垂直居中
14. 优化首屏 【重点 ssr】 

笔试题： 
1.
/**
 * @desc 从一个对象通过操作序列来拿里面的值，做基本防空措施
 * @param {object} data - 需要获取的数据源
 * @param {array} array - 操作路径
 * @param {any} initial - 默认值，当没有内容的时候
 */
// 期望结果：
// const tmp = {a: {b: {c: [{d:1}, {e:2}, {f: {k: 3, p: 7}}]}}, v: ''}
// getIn(tmp, ['a', 'b', 'c'], 'alipay') -> [{d:1}, {e:2}, {f: {k: 3, p: 7}}
// getIn(tmp, ['a', 'b', 'c', '0', 'd'], 'alipay'); -> 1
// getIn(tmp, ['a', 'z'], 'alipay'); -> 'alipay'

function getIn(data, array, initial) 


2. 实现一个函数add   add(1,2)(3)(4,5)(6).toValueOf()  -> 21

```javascript
function add(...args) {
  function fn(...arg) {
    const arr = [...args, ...arg];
    return add(...arr)
  }
  fn.toValueOf  = function() {
      return args.reduce((a,b)=> a + b, 0)
  }
  return fn
}
```


3. 给一个网址 获取其中的参数 不得借助第三方库
 http:baidu.com?a=123&b=456&c#hash -> {a: 123, b: 456, c: ''}
```javascript
getParams(url) {
url.match(/\^?\/)
}
```

4. try {} catch{} 捕获异常 【改错】
try {
  asyncXHM({xxx: xx}) // 异步函数

} catch{
  console.log(错误)
}


1. flex布局
2. webpack 打包
3. webpack和vite的区别 和实现原理  ast的每一个节点是什么
4. vue 双向绑定原理 -- Object.defineProperty 和Proxy的区别
5. 继承 class 怎么实现的
6. CDN
7. React中 useCallBack useMemo 区别  react16中的一些优化
8. 页面优化方案
9. react fiber
10. 循坏事件
11. ssr node层是怎么实现的 node层渲染会不会有压力 
12. webassembly
13. babel干什么的
14. 闭包


