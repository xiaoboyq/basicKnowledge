let PENDING = 'pending';
let REJECTED = 'rejected';
let RESOLVED = 'resolved';

function Promise(fn){
  this.status = PENDING;
  this.value = null;
  this.reason = null;
  this.resolveCallBack = [];
  this.rejectCallBack = [];

  const that = this;


  // promise中 只有promise中的resolve或者reject被执行后 then才会被放到微任务中去
  function resolve(value) {
    if(that.status !== PENDING) return;
    that.status = RESOLVED;
    that.value = value;
    that.resolveCallBack.forEach(cb=>cb())
  }

  function reject(reason) {
    if(this.status !== PENDING) return;
    that.status = REJECTED;
    that.value = reason;
    that.rejectCallBack.forEach(cb=>cb())
  }
  try {
    fn(resolve, reject)
  } catch(error) {
    reject(error)
  }
}


Promise.prototype.then =  function(onResolve, onReject) {
  if(typeof onResolve !== 'function') {
    onResolve = value => value
  }
  if(typeof onReject !== 'function') {
    onReject = reason => { throw new  Error(reason) }
  }

  return new Promise((resolve, reject)=>{
    switch(this.status) {
      case RESOLVED: 
      setTimeout(()=>{
        try{
          let x = onResolve(this.value)
          resolve(x)
        }catch(error) {
          reject(error)
        }
      },0)
      break;
      case REJECTED:
        setTimeout(()=>{
          try{
            let x = onReject(this.reason)
            resolve(x)
          }catch(error) {
            reject(error)
          }
        },0)  
      break;
      case PENDING:
        this.resolveCallBack.push(
          setTimeout(()=>{
          try{
            let x = onResolve(this.value)
            resolve(x)
          }catch(error) {
            reject(error)
          }
        },0));
        this.rejectCallBack.push(
          setTimeout(()=>{
            try{
              let x = onReject(this.reason)
              reject(x)
            }catch(error) {
              reject(error)
            }
          },0) 
        )
        
      break;
      
      }
  })
}


// promise的resolve和reject 的这2个会立即被执行 即 promise.resolve().then(()=>{})  中.then会被立即放到微任务队列中
Promise.resolve = function(value) {
  // 其实要判断value 的值是否为promise
    if (value instanceof Promise) {
      return value;
    }

    return new Promise(function(resolve, reject) {
        resolve(value);
    });
  // return new Promise((resolve)=> resolve(value))
}
Promise.reject = function(value) {
  return new Promise((resolve, reject)=> reject(value))
}


Promise.all = function(promises) {
  return new Promise((resolve, reject)=>{
    if(!Array.isArray(promises)) {
      throw Error('promises 必须是数组')
    }

    let ln = promises.length;
    let res = [];
    let counter = 0;

    for (let i = 0; i < ln; i++) {
      Promise.resolve(promises[i]).then(data=>{
        res[i] = data; 
        // res.push(data) 
        // 不能使用push 因为 每一个promise都可能是异步的 不知道哪个先返回， 而promsiAll 是按照顺序返回结果的
        counter++;
        // 为什么使用counter 计数器 而不使用 res.length === ln ?  还是因为异步的关系，
        //当最后一个promise执行好了 而其他的还没执行好的时候，执行最后一个promise  res[ln-1] = data； 此时res的length 就等于了ln; 如下例子
        // let res = [];
        // res[4] = 123
        // console.log(res.length)  // ==》 5  数组前四个数据为空， 最后一个 即第五个元素为123

        if(counter === ln) {
          resolve(res)
        }
      }).catch(error=>reject(error))
    }
  })
}


// Promise.prototype.finally() 方法用于给 Promise 添加一个不管最终状态如何都会执行的操作。
Promise.prototype.finally = function(fn) {
    return this.then(function(value) {
        return Promise.resolve(fn()).then(function() {
            return value;
        });
    }, function(error) {
        return Promise.resolve(fn()).then(function() {
            throw error;
        });
    });
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

// Promise.race() 同样返回一个合成的 Promise 实例，其会返回这一组中最先解决(fulfilled)或拒绝(rejected)的 Promise 实例的返回值。
Promise.race = function(promiseArr) {
  return new Promise(function(resolve, reject) {
      const length = promiseArr.length;
      if (length === 0) {
          return resolve();
      } 

      for (let item of promiseArr) {
          Promise.resolve(item).then(function(value) {
              return resolve(value);
          }, function(reason) {
              return reject(reason);
          });
      }
  });
}


// Promise.any() 相当于 Promise.all() 的反向操作，同样返回一个合成的 Promise 实例，只要其中包含的任何一个 Promise 实例解决(fulfilled)了，合成的 Promise 就解决(fulfilled)。
// 只有当每个包含的 Promise 都拒绝(rejected)了，合成的 Promise 才拒绝(rejected)。
Promise.any = function(promiseArr) {
  return new Promise(function(resolve, reject) {
      const length = promiseArr.length;
      const result = [];
      let count = 0;
      if (length === 0) {
          return resolve(result);
      } 

      for (let [i, p] of promiseArr.entries()) {
          Promise.resolve(p).then((value) => {
              return resolve(value);
          }, (reason) => {
              result[i] = reason;
              count++;
              if (count === length) {
                  reject(result);
              }
          });
      }
  });
}



// 查考： https://juejin.cn/post/6907673648216145928

