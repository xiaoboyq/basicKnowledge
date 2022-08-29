console.log(123)
queueMicrotask(()=>{  // 微任务
  console.log('queueMicrotask')
  console.log('queueMicrotask')
  console.log('queueMicrotask')
  console.log('queueMicrotask')
})

console.log(222)


