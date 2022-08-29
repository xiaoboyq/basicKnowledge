// const PENDING = "pending";//初始值，不是fulfilled，也不是rejected
// const FULFILLED = "fulfilled";//代表操作成功
// const REJECTED = "rejected";//代表操作失败

// function myPromise(fn) {
//     console.log(100);
//     let that = this;
//     that.state = PENDING;
//     that.value = null;
//     that.resolvedCallBacks = [];
//     that.rejectedCallBacks = [];

//     // 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
//     // 将当前状态更改为对应状态，并且将传入的值赋值给 value
//     // 遍历回调数组并执行

//     function resolve(value) {
//         console.log(2);

//         if (that.state == PENDING) {
//             that.value = value;
//             that.resolvedCallBacks.map(cb => that.value);
//         }
//     };
//     function reject(value) {
//         console.log(3);

//         if (that.state == PENDING) {
//             that.value = value;
//             that.rejectedCallBacks.map(cb => that.value);
//         }
//     };

//     // 实现很简单，执行传入的参数并且将之前两个函数当做参数传进去
//     // 要注意的是，可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数
//     try {
//         console.log(4);

//         fn(resolve, reject)
//     } catch (e) {
//         console.log(5);

//         reject(e)
//     }
// }

// myPromise.prototype.then = function (onFulfilled, onRejected) {
//     const that = this;
//     console.log(6);
//     // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
//     // 当参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传
//     onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
//     onRejected = typeof onRejected === "function" ? onRejected : r => { throw r };
//     // 接下来就是一系列判断状态的逻辑，当状态不是等待态时，就去执行相对应的函数。
//     // 如果状态是等待态的话，就往回调函数中 push 函数
//     if (that.state === PENDING) {
//         that.resolvedCallBacks.push(onFulfilled);
//         that.rejectedCallBacks.push(onRejected);
//     }
//     if (that.state === FULFILLED) {
//         onFulfilled(that.value)
//     }
//     if (that.state === REJECTED) {
//         onRejected(that.value)
//     }
// }


// new myPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 3000)
// }).then(res => {
//     console.log(res)
//     console.log(7)
// }, err => {
//     console.log(8)
// })


## Promise中调用this
1>. 回调函数为匿名函数时，回调函数的this会指向window，需要对回调函数bind(this)。
2>. 回调函数为箭头函数时，回调函数的this会指向他的直接上层

```javascript

let p1 = new Promise((resolve,reject)=>{
  console.log(1);
  resolve('执行promise')
  console.log(2)
})// then:设置成功或者失败后处理的方法
  p1.then(result=>{
 //p1延迟绑定回调函数
  console.log('成功 '+result)},
  reason=>{
  console.log('失败 '+reason)
})
console.log(3)// 1 2 3 成功 执行promise

// Promise 采用了回调函数延迟绑定技术，在执行 resolve 函数的时候，回调函数还没有绑定，那么只能推迟回调函数的执行。
// 代码片段2中，先执行打印1，p1中resolve的回调函数还没绑定，会出发微任务，将p1.then暂存起来，继续执行打印2，打印3，同步任务执行完毕后，去执行微任务，执行.then中方法。

```

## promise 的错误会一层层的向下一个then中的reject中传输，直到找到最近的reject执行错误； 然后后面的then继续执行

```javascript
new Promise(resolve=>{
  resolve(a) // 报错 // 这个executor函数执行发生异常错误，决定下个then失败方法会被执行
})
.then(result=>{
  console.log(`成功1：${result}`)
  return result*10
},reason=>{
  console.log(`失败1：${reason}`)// 执行这句时候，没有发生异常或者返回一个失败的Promise实例，所以下个then成功方法会被执行// 这里没有return，最后会返回 undefined
})
.then(result=>{
  console.log(`成功2：${result}`)
},reason=>{
  console.log(`失败2：${reason}`)
})// 失败：ReferenceError: a is not defined// 成功：undefined1234567891011121314151617

.catch(error=>console.log(`error:`+error))

```