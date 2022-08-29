// Promise.allSettled() 方法也是返回一个合成的 Promise，不过只有等到所有包含的每个 Promise 实例都返回结果落定时，不管是解决(fulfilled)还是拒绝(rejected)，合成的 Promise 才会结束。一旦结束，状态总是 fulfilled。
// 其返回的是一个对象数组，每个对象表示对应的 Promise 结果。

Promise.allSettled = function(promiseArr) {
  return new Promise(function(resolve) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;

    if (length === 0) {
      return resolve(result);
    } else {
      for (let [i, p] of promiseArr.entries()) {
        Promise.resolve(p).then((value) => {
            result[i] = { status: 'fulfilled', value: value };
            count++;
            if (count === length) {
                return resolve(result);
            }
        }, (reason) => {
            result[i] = { status: 'rejected', reason: reason };
            count++;
            if (count === length) {
                return resolve(result);
            }
        });
      }
    }
  });
}

// 使用 Promise.all 实现
Promise.allSettled = function(promises) {
    // 也可以使用扩展运算符将 Iterator 转换成数组
    // const promiseArr = [...promises]
    const promiseArr = Array.from(promises)
    return Promise.all(promiseArr.map(p => Promise.resolve(p).then(res => {
      return { status: 'fulfilled', value: res }
    }, error => {
      return { status: 'rejected', reason: error }
    })));
};

// 使用 Promise.prototype.finally 实现
Promise.allSettled = function(promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises]
  const promiseArr = Array.from(promises)
  return new Promise(resolve => {
      const result = []
      const len = promiseArr.length;
      let count = len;
      if (len === 0) {
        return resolve(result);
      }
      for (let i = 0; i < len; i++) {
          Promise.resolve(promiseArr[i]).then((value) => {
              result[i] = { status: 'fulfilled', value: value };
          }, (reason) => {
              result[i] = { status: 'rejected', reason: reason };
          }).finally(() => { 
              if (!--count) {
                  resolve(result);
              }
          });
      }
  });
}