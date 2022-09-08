function asyncFn(fn) {
  let iterator = fn();
  
  const next = (data) => {
    const { value, done } = iterator.next(data)
    if(done) return;
    value.then((res)=> next(res))
  }
  next()

}

asyncFn(function*(){
  let a = yield getData(1, 3000)
  console.log(a)
  console.log('xxxx')
  let b = yield getData(22, 2000)
  console.log(b)
})


function getData(value, time) {
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve(value)
    }, time)
  })
}