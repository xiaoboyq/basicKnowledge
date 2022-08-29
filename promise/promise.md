1. promise状态
三种状态：  pending  fulfilled rejected;
pending: 初始化状态， resolve 和reject 2个函数之前为pending， 可以被更改
resolve方法可以将pending改为最终态 fulfilled； fulfilled状态必须有一个value
reject方法可以将pending改为最终态 rejected; 最终态即为不可改变的状态。reject必须拥有一个reason

# promsie 测试过程
<!-- https://www.cnblogs.com/lhx9527/p/14158460.html -->

<!-- npm i promises-aplus-tests -D -->


```javascript
const test = new Promise((resolve, reject)=>{
  setTimeout(() => {
    reject(111)
  },
  1000)
}).catch(res=>{
  console.log('catch', res)
  console.log(test) // Promise { <pending> }
  // return 123  如果返回123  下面代码【111】处打印
})

setTimeout(()=>{
  console.log(test) // Promise { undefined } // 此处的undefined 是 catch默认返回的 undefined
  //【111】 Promise { 123 }
}, 2000)
```

<!-- 
   Promise.prototype.catch = (onRejected) {
        return this.then(null, onRejected);
    } -->

<!-- // 1. promise 的reject(111) 因为没有then, 所以直接调用catch；  如果有then 会触发then中的reject
// 2. catch会返回一个新的promise， 然后赋值给test
// 3. catch的回调中打印的test就是当前catch的新promise, 执行到这里的时候 新promise的状态还没有被改变【即没有执行reject和resolve】，
//还是pending状态， 只有执行完成 ,无论执行成功还是执行失败，才会改变状态， 如果没有返回值， 则返回undefined
-->