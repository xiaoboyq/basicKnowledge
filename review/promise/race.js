// 只要有一个完成就算完成了 不管结果本身是是失败还是成功

Promise.race = function(promises) {
  return new Promise((resole, reject) => {
    if(!Array.isArray(promises)) {
      throw new Error('Type Error，')
    }

    let len = promises.length;

    for(let i = 0 ; i < len; i++) {
      Promise.resolve(promises[i]).then(res=> {
        resole(res)
      }).catch(err=> {
        reject(err)
      })
    }
  })
}
