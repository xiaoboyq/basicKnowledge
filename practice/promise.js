const PENDING = 'pending'; // 初始值
const FULFILLED = 'fulfilled'; // 操作成功
const REJECTED = 'rejected'; // 操作失败
// global.status = 'gloabl'  注意： 函数内部的函数的this指向 全局global， 并不是和外部的函数指向同一个this

function MyPromsie(fn) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;
  this.resolveCallback = [];
  this.rejectCallback = [];

  let that = this;

  function resolve(value) {
    if (that.status !== PENDING) return;

    that.status = FULFILLED;
    that.value = value;
    // setTimeout(() => {
      that.resolveCallback.forEach(cb => cb(value))
    // }, 0)
  }

  function reject(reason) {
    if (that.status !== PENDING) return;

    that.status = REJECTED;
    that.reason = reason;
    // setTimeout(() => {
      that.rejectCallback.forEach(cb => cb(reason))
    // }, 0)
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}


// then中返回一个新的promise, 根据status状态操作， 这里用setTimeout 来模拟微任务； 
MyPromsie.prototype.then = function (onResolve, onReject) {
  if (typeof onResolve !== 'function') {
    onResolve = value =>  value
  }
  if (typeof onReject !== 'function') {
    onReject = value => { throw new Error(value) }
  }

  return new MyPromsie((resolve, reject) => {
    switch (this.status) {
      case PENDING:
        this.resolveCallback.push(() => {
          try {
            setTimeout(() => {  
              const x = onResolve(this.value)
              resolve(x)
              })
          } catch (reason) {
           
            reject(reason)
          }
        });
        this.rejectCallback.push(() => {
          try {
            setTimeout(() => {  
            const x = onReject(this.reason)
            reject(x)
            })
          } catch (reason) {
            reject(reason)
          }
        });
        break;
      case FULFILLED:
        setTimeout(() => {  // 模拟微任务， 【setTimeout 会在下一个任务中执行，即当前任务已经执行完全】
          try {
            const x = onResolve(this.value)
            resolve(x)
          } catch (reason) {
            reject(reason)
          }
        }, 0);
        break;
      case REJECTED:
        setTimeout(() => {
          try {
            const x = onReject(this.reason)
            reject(x)
          } catch (reason) {
            reject(reason)
          }
        }, 0);
    }
  })
}



// let p1 = new MyPromsie((resolve, reject) => {
//   console.log(1);
//   try {
//     aa
//     resolve('执行promise')
//   } catch (error) {
//     reject(error)
//   }
//   console.log(2)
// })// then:设置成功或者失败后处理的方法
// p1.then(result => {
//   //p1延迟绑定回调函数
//   console.log('成功 ' + result)
// },
//   reason => {
//     console.log('失败 ' + reason)
//   })
// console.log(3)// 1 2 3 成功 执行promise

MyPromsie.resolve = function (value) {
  return new MyPromsie((resolve) =>{
    resolve(value)
  })
}


MyPromsie.all = function(promises) {

  return new MyPromsie((resolve, reject)=>{
    if(!Array.isArray(promises)) {
      return  reject(new Error('promises 必须是一个数组'))
    }
    if(promises.length === 0) {
      return resolve([])
    }
    let counter = 0;
    let len = promises.length;
    let res = []
    for (let i = 0; i < len; i++) {
      MyPromsie.resolve(promises[i]).then(data=>{
        res[i] = data
        counter++;
        if(counter === len) {
          resolve(res)
        }
      }).catch((error)=> reject(error))
      
    }
  })
}

// 1
// 2
// 3
// pending_resolve 执行promise
// 成功 执行promise

// let p2 = new Promise((resolve, reject) => {
//   console.log(1);
//   setTimeout(()=>{
//     // resolve('执行promise')
//     try {
//       aa
//       resolve('执行promise')
//     } catch (error) {
//       reject(error)
//     }
   
//   }, 0)
//   console.log(2)
// })// then:设置成功或者失败后处理的方法
// p2.then(result => {
//   //p1延迟绑定回调函数
//   console.log('成功 ' + result)
// },
//   reason => {
//     console.log('失败 ' + reason)
//   })
// console.log(3)// 1 2 3 成功 执行promise

