// https://www.jianshu.com/p/aa3d8b3adde3

async function async1() {
  await async2()
  console.log('async1 end')
}

async function async2() {
  return Promise.resolve().then(() => {
    console.log('async2 end1')
  })
}

async1()


new Promise(resolve => {
  resolve()
}).then(function () {
  console.log('promise1')
}).then(function () {
  console.log('promise2')
})

// async function async3() {
//   await async4()
//   console.log('async3 end')
// }

// async function async4() {
//   return Promise.resolve().then(() => {
//     console.log('async4 end1')
//   })
// }

//  function async3() {
//    async4().then(()=>{
//     console.log('async3 end')
//    })
// }

function async3() {
  Promise.resolve().then(() => {
    console.log('async4 end1')
  }).then(()=>{
    console.log('async3 end')
  })
}

// async function async4() {
//   return Promise.resolve().then(() => {
//     console.log('async4 end1')
//   })
// }

async3()


//async2 end1
// promise1
// async4 end1
// promise2
// async1 end
// async3 end


//script start
// async2 end
// Promise
// async4 end
// script end
// async2 end1
// promise1
// async4 end1
// promise2
// async1 end
// async3 end
// setTimeout

// new Promise((resolve, reject) => {
//   console.log("log: 外部promise");
//   resolve();
// })
//   .then(() => {
//     console.log("log: 外部第一个then");
//     new Promise((resolve, reject) => {
//       console.log("log: 内部promise");
//       resolve();
//     })
//       .then(() => {
//         console.log("log: 内部第一个then");
//       })
//       .then(() => {
//         console.log("log: 内部第二个then");
//       });
//   })
//   .then(() => {
//     console.log("log: 外部第二个then");
//   });