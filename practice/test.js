
/**
 * 1.输出什么
*/
const aa = 21;

function getAa() {
  console.log(typeof aa) // ReferenceError: Cannot access 'aa' before initialization 
  const aa = aa + 'hello'
}

// getAa()

/**
 *  2. 输出什么
 */
const fn = obj => {
  obj.value = 2;
  obj = {
    value: 3
  }
  // console.log(obj) //{ value: 3 }
}
const obj = {
  value: 1
}
fn(obj)
// console.log(obj) // { value: 2 }   const不可被修改 对象的地址不可变;   如果let obj = { xxx} 结果就会变为 { value: 3 }


/**
 * 输出什么
 * 知识点： 
 * 1. await执行完后，会让出线程。async标记的函数会返回一个Promise对象
 * 2. Promise一旦被定义，就会立即执行。
 * 3. Promise的reject和resolve是异步执行的回调【微任务】。所以，resolve()会被放到回调队列中，在主函数执行完和setTimeout前调用。
 * 4. Promise优先于setTimeout宏任务。所以，setTimeout回调会在最后执行。
 * 
*/
async function async1() {
 console.log('async1 start')
 await async2();   // await执行完后，会让出线程。async标记的函数会返回一个Promise对象
 console.log('async1 end')
}


async function async2() {
  console.log('async2')
 }

 setTimeout(function(){
  console.log('timeout')
 },0)

 async1()


 new Promise(function(resolve){
   console.log('promise1');
   resolve();
 }).then(function(){
   console.log('promise2')
 })

 console.log('end')

/**
 *  正确答案
 *  async1 start
 *  async2
 *  promise1
 *  end
 *  async1 end
 *  promise2
 *  timeout
*/


// async function async1() {
//   console.log('async1 start')
//   await async2();   // await执行完后，会让出线程。async标记的函数会返回一个Promise对象
//   console.log('async1 end')
//  }
// 其中，async1函数可以写成以下方式（便于理解）：
// async function async1(){
//   console.log('async1 start')
//   async2().then( _ => {
//     console.log( 'async1 end ')
//   })
// }


// 扩展 async的扩展 https://blog.csdn.net/qq_34629352/article/details/104937801

var a = 0

var b = async () => {
  console.log(a)
  a = a + await 10;
  console.log('async:'+a)
} 

b();
a++
console.log('a:'+a)

// a: 1
// async: 10





// let promise = new Promise((resolve, reject)=>{
//   throw new Error();
//   reject()

// })

// promise.catch(err=>{
//   console.log('错误')
//   console.log(err)
// })



/**
 * 输出
 * **/
//  https://blog.csdn.net/fang_ze_zhang/article/details/83419022?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.no_search_link&spm=1001.2101.3001.4242
 let len = 10;
 function fn1() {
   console.info(this.len)
 }
 fn1(); // undefined
 let Person = {
   len: 5,
   say: function(){
     fn1(); // undefined
     console.log(this.len) // 5
     arguments[0](); // undefined   arguments中没有len属性 所以 undefined
   }
 }
 Person.say(fn1);
