// 好多种实现方式
// 1. 基本实现

Promise.allSettled = function(promises) {
  return new Promise(resolve => {
    if(!Array.isArray(promises)) {
      throw new Error('Type error')
    }
    let len = promises.length;
    let res = [];
    let counter = 0;

    for(let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data=> {
        counter++;
        res[i] = { status: 'fulfilled', value: data };
        if(counter === len) {
         return resolve(res)
        }
      }, error => {
        counter++;
        res[i] = { status: 'rejected', reason:  error};;
        if(counter === len) {
          return resolve(res)
        }
      })
    }
  })
}

// 2. 利用promsie.all 来实现

Promise.allSettled = function(promises) {
  return new Promise(resolve => {
    if(!Array.isArray(promises)) {
      throw new Error('Type error')
    }
   return Promise.all(promises.map(v=> Promise.resolve(v).then(data => {
      return { status: 'fulfilled', value: data}
    }, error => {
      return { status: 'rejected', reason: error}
    })))

  })
}


