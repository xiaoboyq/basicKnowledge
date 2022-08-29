
function promiseFN(time, timer) {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      console.log('第',timer)
      resolve(time)
    }, time)
  })
}

function asyncFn(fn){
  let iterator = fn();
  const next = function(data) {
    console.log('next', data)
    const  {
      value, done
    } = iterator.next(data)
    if(done) return;
    value.then(data=>next(data))
  }
  next()
}


asyncFn(function*() {
  const a = yield promiseFN(1000, 1)
  console.log(a)
  
  const b = yield promiseFN(2000, 2)
  console.log(b)
  
})

// async await 是generator的语法糖 利用迭代器的可中断的原理 融合promise  


// async function name(params) {
//   await  xxx
// }

