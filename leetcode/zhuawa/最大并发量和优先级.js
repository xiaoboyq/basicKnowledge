// 前端代码⾥有什么⽅式能控制最⼤并发量吗?
// 如果任务有优先级的概念, 需要允许⾼优任务的插⼊呢?

import { loadImg } from './mock';

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
]

class PromiseQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.pendingQueue = [];
    this.currentCount = 0;
  }

  add(task) {
    this.pendingQueue.push(task);
    this.run()
  }

  run() {
    if(this.concurrency === this.currentCount || !this.pendingQueue.length) {
      return
    }
   const { fn } = this.pendingQueue.sort((a,b)=>b.priority - a.priority).shift()
   const promise = fn();
   promise
   .then(this.completeOne.bind(this))
   .catch(this.completeOne.bind(this))
  }

  completeOne() {
    this.currentCount--;
    this.run()
  }

}

const q = new PromiseQueue({
  concurrency: 3
})

const formatTask = (url) =>{
  return {
    fn: ()=>loadImg(url),
    priority: url.priority 
  }
}

urls.forEach(url => {
  p.add(formatTask(url))
});

const heightPriorityTask = {
  priority: 10,
  info:'high priority',
  time: 2000
}

q.add(formatTask(heightPriorityTask))