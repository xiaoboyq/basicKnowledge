//  有一个成功就算成功， 所有都失败才算失败

Promise.any = function(promises) {
  return new Promise((resolve, reject) => {
    if(!Array.isArray(promises)) {
      throw new Error('TypeError')
    }
    let len = promises.length;
    let count = 0;
    let res = []
    for(let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        resolve(res)
      }).catch(err=> {
        count++;
        res[i] = err 
        if(count === len) {
          reject(res)
        }
      })
    }
  })
}