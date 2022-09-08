
const urls = [
  {
    info: 'link1',
    priority: 1,
    time: 1000
  },
  {
    info: 'link2',
    priority: 1,
    time: 1000
  },
  {
    info: 'link3',
    priority: 1,
    time: 1000
  },
  {
    info: 'link4',
    priority: 1,
    time: 1000
  },
  {
    info: 'link5',
    priority: 1,
    time: 1000
  },
  {
    info: 'link6',
    priority: 10,
    time: 1000
  },
  {
    info: 'link7',
    priority: 1,
    time: 1000
  },
]

class PromiseQueue {
  constructor(props) {
    this.concurrency = props.concurrency;
    this.pendingQueue = [];
    this.currentCount = 0;
  }
 

  add(task) {
    this.pendingQueue.push(task)
    this.run()
  }

  run() {
    if(this.currentCount === this.concurrency || !this.pendingQueue.length){
      return;
  } 
  // console.log(this.pendingQueue.length)

    const { fn } = this.pendingQueue.sort((a,b)=>b.priority - a.priority).shift()
    const promise = fn()
    this.currentCount++;
    promise
    .then(res=> console.log(res))
    .then(this.completeOne.bind(this))
    .catch((error) => this.completeOne(error, fn,'error'))
  }

  completeOne(reason, fn, type) {
    if(type === 'error') { // 这里是处理出错的请求 再次发送请求 当请求2次错误打印错误
      fn().then(res=>{console.log(res)}, res=>{console.log(res)})
      return
    } 

    this.currentCount--;
    this.run()
  }
}

function loadImg(url) {
  return new Promise((resolve, reject) => {
    if(Math.random() > 0.7) {
      setTimeout(()=>{
        reject('失败' + url.info)
      }, url.time)
    } else {
      setTimeout(()=>{
        resolve('成功' + url.info)
      }, url.time)
    }
  
    })
}


const q = new PromiseQueue({
  concurrency: 3
})

const formatTask = (url) =>{
  return {
    fn: () => loadImg(url),
    priority: url.priority ,
    info: url.info
  }
}

urls.forEach(url => {
  q.add(formatTask(url))
});

const heightPriorityTask = {
  priority: 100,
  info:'high priority',
  time: 1000
}

q.add(formatTask(heightPriorityTask))