// react利用requestAnimationFrame 和MessageChannel【宏任务】 来pollify requestIdleCallback

// 问题1: 为什么不直接使用requestIdleCallback； 因为requestIdleCallback兼容性不够好， 再者有50ms的时间问题。
//问题2: 为什么用MessageChannel 而不是setTimeout, 都是宏任务， MessageChannel更先执行， 并且setTimeout多层次 有4ms延迟问题；
// 在不支持MessageChannel的浏览器中， react用setTimeout来实现。
const { port1, port2 } = new MessageChannel();

let activeFrameTime  = 1000 / 60; // 一帧的时间
let frameDeadTime; // 当前帧的结束时间
let pendingCallback;
let timeRemaining = () =>  frameDeadTime - performance.now(); // 剩余时间

// 会在绘制之后执行，此时可以看是否空闲
port2.onmessage = function(e) {
  console.log(e.data)// 获取到port1的数据
  let currentTime =  performance.now();
  let didTimeout = currentTime > frameDeadTime
  if(didTimeout ||  timeRemaining() >0) {
    !!pendingCallback && pendingCallback({didTimeout,timeRemaining})
  }
}

window.requestIdleCallback = function(callback, options) {
 requestAnimationFrame((rafTime) => {
  frameDeadTime = rafTime + activeFrameTime;
  pendingCallback = callback
  // 发消息后相当于添加了一个宏任务
  port1.postMessage('开始一个宏任务');
 })
}


