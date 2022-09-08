// function MyPromise(executorFn){
//   this.obj = {
//       state: 'pending'//'pending' // pending | fulfilled | rejected
//   }
//   this.thenCallback = null
//   this.thenResult = null
//   this.catchCallback = null
//   this.cathcError = null

//   const this_ = this

//   this.objProxy = new Proxy(this.obj, {
//       set: function (target, prop, value) {
//           if (prop !== 'state'){
//               return;
//           }
//           if (value ==='fulfilled'){
//               this_.thenCallback(this_.thenResult)
//           }else if (value ==='rejected'){
//               this_.catchCallback(this_.cathcError)
//           }
//       }
//   })

//   this.resolve = function (result) {
//       this_.thenResult = result
//       this_.objProxy.state = 'fulfilled'
//   }
//   this.reject = function (error) {
//       this_.cathcError = error
//       this_.objProxy.state = 'rejected'
//   }

//   this.then = function (thenCallback) {
//       this_.thenCallback = thenCallback
//       return this_
//   }
//   this.catch = function (catchCallback) {
//       this_.catchCallback = catchCallback
//   }
//   executorFn(this.resolve, this.reject)
// }


// new MyPromise((resolve, reject)=>{

//   setTimeout(() => {
//       resolve('done')
//       // reject('error')
//   }, 500);

// }).then(result => {
//   console.log('result: ', result);
// }).then(result => {
//   console.log('result: ', result);
// }).catch(error =>{
//   console.log('error', error);
// })


// const PENDING = "pending";//初始值，不是fulfilled，也不是rejected
// const FULFILLED = "filfilled";//代表操作成功
// const REJECTED = "rejected";//代表操作失败

// function myPromise(fn) {
//     console.log('start');
//     let that = this;
//     that.state = PENDING;
//     that.value = null;
//     that.resolvedCallBacks = [];
//     that.rejectedCallBacks = [];

//     // 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
//     // 将当前状态更改为对应状态，并且将传入的值赋值给 value
//     // 遍历回调数组并执行

//     function resolve(value) {
//         console.log('resolve');

//         if (that.state === PENDING) {
//             that.value = value;
//             that.resolvedCallBacks.map(cb => that.value);
//         }
//     };
//     function reject(value) {
//         console.log('reject');

//         if (that.state == PENDING) {
//             that.value = value;
//             that.rejectedCallBacks.map(cb => that.value);
//         }
//     };

//     // 实现很简单，执行传入的参数并且将之前两个函数当做参数传进去
//     // 要注意的是，可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数
//     try {
//         console.log('try');

//         fn(resolve, reject)
//     } catch (e) {
//         console.log('catch');

//         reject(e)
//     }
// }

// myPromise.prototype.then = function (onFulfilled, onRejected) {
//     const that = this;
//     console.log('then');
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
//     console.log('state:', that.state)
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
//     console.log('then res')
// }, err => {
//     console.log('err')
// })


// (function(window){
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

/**
 * @func Promise 构造函数
 * @param excutor 执行器函数(同步执行)
 */
function Promise(excutor) {
  const that = this;

  // 给 Promise 对象指定一个 status 属性，初始值为 pending
  this.status = PENDING;
  // 给 Promise 对象指定一个 用于存储结果数据的 data 属性
  this.data = undefined;
  // 每个元素的结构 { onResolved(){}, onRejected(){} }
  this.callbacks = [];

  // 定义一个 成功的 回调
  function resolve(value) {
    // 如果当前状态不是 pending ， 则直接结束
    if (that.status !== PENDING) return;

    // 1. 将状态改为 resolved
    that.status = RESOLVED;
    // 2. 存储 value 数据
    that.data = value;
    // 3. 如果有待执行的 callbacks 函数，则立即异步执行回调函数
    if (that.callbacks.length > 0) {
      setTimeout(() => {
        // 放入队列中执行所有成功的回调
        that.callbacks.forEach(callbacksObj => {
          callbacksObj.onResolved(value);
        });
      })
    }
  }

  // 定义一个 失败的 回调
  function reject(reason) {
    // 如果当前状态不是 pending ， 则直接结束
    if (that.status !== PENDING) return;

    // 1. 将状态改为 rejected
    that.status = REJECTED;
    // 2. 存储 value 数据
    that.data = reason;
    // 3. 如果有待执行的 callbacks 函数，则立即异步执行回调函数
    if (that.callbacks.length > 0) {
      setTimeout(() => {
        // 放入队列中执行所有失败的回调
        that.callbacks.forEach(callbacksObj => {
          callbacksObj.onRejected(reason);
        });
      })
    }
  }

  // 立即同步执行 excutor
  try {
    excutor(resolve, reject)
  } catch (error) {
    // 如果执行器抛出异常，则 Promise 对象变为 rejected 状态
    reject(error);
  }
}

/**
 * @func Promise 原型对象中的 then()
 * @param onResoled 成功的回调函数
 * @param onRejected 失败的回调函数
 * @returns  返回一个新的 Promise 对象，结果由 onResolved / onRejected 执行结果决定
 */
Promise.prototype.then = function (onResolved, onRejected) {
  const that = this;

  // 向后传递成功的 value
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  // 指定默认的失败的回调 ( 实现错误/异常传投的关键点 )，向后传递失败的 reason
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  /**
   * 返回一个新的 Promise 对象
   * 根据执行的结果，改变 return 的 promise 的状态
   */
  return new Promise((resolve, reject) => {
    // 调用指定的函数处理
    function handle(callback) {
      /**
       * 分三种情况：
       * 1. 如果回调函数返回的是 Promise,return 的 Promise 结果就是这个 Promise 的结果
       * 2. 如果回调函数返回的不是 Promise，return 的 Promise 就会成功，value 就是返回的值
       * 3. 如果抛出异常，return 的Promise就会失败，reason 就是 error
       */
      try {
        // 到回调函数的结果
        const result = callback(that.data);
        // 判断 result 的类型 
        if (result instanceof Promise) {
          // 1. 如果回调函数返回的是 Promise，return 的 Promise 结果就是这个 Promise 的结果
          // 注意：想要拿到 Promise 的结果只能 .then()
          // 当 result 成功是，让 return 的 Promise 也成功 (resolve)
          // 当 result 失败是，让 return 的 Promise 也失败 (reject)

          // 普通写法
          // result.then(
          //     value => resolve(value), 
          //     reject => reject(reject)
          // )

          // 简洁写法
          result.then(resolve, reject);
        } else {
          // 2. 如果回调函数返回的不是 Promise，return 的 Promise 就会成功，value 就是返回的值
          resolve(result);
        }
      } catch (error) {
        // 3. 如果抛出异常，return 的Promise就会失败，reason 就是 error
        reject(error);
      }
    }

    // 处理不同状态的 status
    if (that.status === PENDING) {
      // 如果 status 为 pending，则保存回调函数
      that.callbacks.push({
        onResolved() {
          handle(onResolved)
        },
        onRejected() {
          handle(onRejected)
        }
      })
    } else if (that.status === RESOLVED) {
      // 如果status 为 resolved，则异步执行 onResolve 并改变 return 的 promise 状态
      setTimeout(() => {
        handle(onResolved)
      })
    } else {
      // 如果status 为 rejected，则异步执行 onRejected 并改变 return 的 promise 状态
      setTimeout(() => {
        handle(onRejected)
      })
    }
  });
}

/**
 * @func Promise 原型对象中的 catch()
 * @param onRejected 失败的回调函数
 * @returns 返回一个新的 Promise 对象
 */
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}


/**
 * @func Promise 函数对象的 resolve()
 * @param value 成功的回调函数 
 * @returns 返回一个指定结果 value 的成功的 Promise
 */
Promise.resolve = function (value) {
  // 返回一个成功 / 失败的 Promise
  return new Promise((resolve, reject) => {
    // 判断 value 的类型
    if (value instanceof Promise) {
      // 如果是Promise
      value.then(resolve, reject)
    } else {
      // 如果不是 Promise
      resolve(value)
    }
  })
}

/**
 * @func Promise 函数对象的 reject()
 * @param reason 失败的回调函数
 * @returns 返回一个指定结果 reject 的失败的 Promise
 */
Promise.reject = function (reason) {
  // 返回一个失败的 Promise
  return new Promise((undefined, reject) => {
    reject(reason)
  })
}

/**
 * @func Promise 函数对象的 resolveDelay()
 * @param value 成功的回调函数 
 * @param time 指定的延迟时间
 * @returns 返回一个指定结果 value 的成功的 Promise
 */
Promise.resolveDelay = function (value, time) {
  // 返回一个成功 / 失败的 Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 判断 value 的类型
      if (value instanceof Promise) {
        // 如果是Promise
        value.then(resolve, reject)
      } else {
        // 如果不是 Promise
        resolve(value)
      }
    }, time)
  })
}

/**
 * @func Promise 函数对象的 rejectDelay()
 * @param reason 失败的回调函数
 * @param time 指定的延迟时间
 * @returns 返回一个指定结果 reject 的失败的 Promise
 */
Promise.rejectDelay = function (reason, time) {
  // 返回一个失败的 Promise
  return new Promise((undefined, reject) => {
    setTimeout(() => {
      reject(reason)
    }, time)
  })
}

/**
 * @func Promise 函数对象的 all()
 * @param  promises 请求数组
 * @returns 返回一个 Promise
 * @returns 只有 Promise 都成功时才成功，只要有一个失败就失败，并返回失败的 Promise
 */
Promise.all = function (promises) {
  // 用来保存所有成功value的数组
  const values = new Array(promises.length);
  // 用来保存成功Promise的数量
  let resolvedCount = 0;
  // 返回一个新的Promise
  return new Promise((resolve, reject) => {
    // 遍历 promises 获取每个 Promise 的结果
    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        value => {
          resolvedCount++

          // 将成功的 value 保存至 values
          values[index] = value;

          // 如果全部成功，return 的 Promise 的状态为成功
          if (resolvedCount == promises.length) {
            resolve(values)
          }
        },
        reason => {
          // 只要有一个失败了，return 的 Promise 就是失败
          reject(reason);
        }
      )
    })
  })
}

/**
 * @func Promise 函数对象的 race()
 * @param  promises 请求数组
 * @returns 返回一个 Promise，其结果由第一个完成的 Promise 决定
 */
Promise.race = function (promises) {
  // 返回一个新的 Promise
  return new Promise((resolve, reject) => {
    // 遍历 promises 取出每个 Promsie 的结果
    promises.forEach(p => {
      Promise.resolve(p).then(
        value => {
          // 一旦有一个成功了， return 的 Promise 就成功
          resolve(value);
        },
        reason => {
          // 一旦有一个失败了， return 的 Promise 就失败
          reject(reason);
        }
      )
    })
  })
}

//   // 暴露给 window
//   window.Promise = Promise;
// })(window)