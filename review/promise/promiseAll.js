Promise.all = function(promises) {
  return new Promise((resolve, reject)=> {
    if(!Array.isArray(promises)) {
      throw new Error('Type error')
    }
    let len = promises.length;
    let res = []
    let count = 0;

    for(let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data=> {
        count++;
        res[i] = data
        if(count === len) {
          resolve(res)
        }
      }).catch(error => reject(error))
    }
  })
}
