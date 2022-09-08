
// 3>2>1 // false      3>2 返回true  true 为1  1>1 false
// 1<2<3 // true

//npm install --global nodemon
//nodemon xxx.js  更新代码 自动刷新页面

//  选择排序 
// 1. 在未排序序列中找到最大（小）的， 将其放在排序序列的起始位置。
// 2. 从剩余未排序元素中继续寻找最大（小）元素，然后放到已排序序列的末尾
// 3. 在重复操作步骤2
// function selectionSort(arr) {
//     var len = arr.length;
//     var temp, minIndex;
//     for(let i = 0; i < len - 1; i++) {
//         minIndex = i;
//         for(let j = i + 1; j < len; j++ ) {
//             if(arr[minIndex] > arr[j]){
//                 minIndex = j;
//             }
//         }
//         temp = arr[minIndex];
//         arr[minIndex] = arr[i];
//         arr[i] = temp;
//     }
//     console.log(arr)
//     return arr;
// }

// selectionSort([22,3,45,13,67,23])


// 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
// 按增量序列个数 k，对序列进行 k 趟排序；
// 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
// function shellSort(arr) {
//     var len = arr.length,
//         temp,
//         gap = 1;
//     while(gap < len/3) {          //动态定义间隔序列
//         gap = gap*3+1;
//         console.log(gap)
//     }
//     for (gap; gap > 0; gap = Math.floor(gap/3)) {
//         for (var i = gap; i < len; i++) {
//             temp = arr[i];
//             for (var j = i-gap; j >= 0 && arr[j] > temp; j -= gap) {
//                 arr[j+gap] = arr[j];
//             }
//             arr[j+gap] = temp;
//         }
//     }
//     console.log(arr)
//     return arr;
// }

// shellSort([12,24,3,45,12,99])

//快速排序
// 1、选择数组中间数作为基数，并从数组中取出此基数；
// 2、准备两个数组容器，遍历数组，逐个与基数比对，较小的放左边容器，较大的放右边容器；
// 3、递归处理两个容器的元素，并将处理后的数据与基数按大小合并成一个数组，返回。

// function Person(age, name) {
//     this.age = age;
//     this.name = name;
// }

// function Student(age,name,grade) {
//     Person.apply(this,arguments);
//     this.grade = grade;
// }


// var student = new Student(24,'称以房','一年级1' );


//分析: Person.apply(this,arguments);
// this:在创建对象在这个时候代表的是student
// arguments:是一个数组,也就是[24,'称以房','一年级1'];
//                    也就是通俗一点讲就是:用student去执行Person这个类里面的内容,在Person这个类里面存在this.name等之类的语句,这样就将属性创建到了student对象里面
// console.log(student.name+'|'+student.age)

// apply 和call 区别在哪
// apply:方法能劫持另外一个对象的方法，继承另外一个对象的属性.
// Function.apply(obj,args)方法能接收两个参数
// obj：这个对象将代替Function类里this对象
// args：这个是类似数组，它将作为参数传给Function（args-->arguments） args 有length 可以按照下标获取值 但不是数组

// call:和apply的意思一样,只不过是参数列表不一样.

//  Function.call(obj,[param1[,param2[,…[,paramN]]]])
// obj：这个对象将代替Function类里this对象
// params：这个是一个参数列表

// call、apply、bind我们要想实现它们首先要知道他们的异同
// 三者都是改变this的指向，把函数内this指向了第一个参数
// 不同点：
// 1、call、apply会执行函数，bind不会立即执行；需要再次调用;
// 2、传参区别，第一个参数都是函数内部this的指向，其余参数call、bind逐个传入，
// apply以数组的形式传入


// call 原理
// Function.prototype.call = function(context) {
//     context = context || window;// 如果context 不为null 不进行操作
// // context就是想要指向的执行环境,上述代码中context为b，否则context = window ，context指向window对象
//     context.fn = this;     // a.add调用call ，此时this 即为 add函数,context.fn 在context中新增一个函数add
//     context.fn();    //执行b.fn()，完成改变指向的作用。
//     delete context.fn; //删除fn
// }


// global.id= '123'
// var obj = {
//     name: 'obj',
//     id: '456',
//     objFunc: function() {
//         console.log(this.id)
//     },
//     objFunc();
// }


//  // 当函数以普通函数的方式调用时，this指向全局变量
// var func = obj.objFunc;
// func(); // 123

// obj.objFunc(); // 456 



//   防抖 debounce 间隔多久会触发
//   节流 throttle 相隔一段时间就会触发

//  比如一个mousedown 输入一个数字 一直按 间隔是 1000  连续2000ms按  debounce会输入一个数字  ; throttle会输入三个  开始 1000ms 2000ms


// var 申明的变量会挂载在window上， let和const不会 
// console.log(a)
// var a = 1;

// function testLet() {
//     let test = 2;
//     console.log(test)
// }

// testLet()

// 数组扁平化
//  let arr = [1,[2,2,1,4],1,[1,2,3,4,[123]]];
//  let arr1 = arr.toString().split(',')
//  console.log(arr.toString())
//  console.log(arr1)

// function createPerson(name, sex) {
//     var obj = new Object();
//     obj.name = name;
//     obj.sex = sex;
//     return obj;
// }

// var person1 = createPerson('nan','男')
// var person2 = createPerson('nv','女')

// console.log(person2 instanceof Object)


// function Person (name,age) {
//     this.name  = name                                            
//     this.age = age
//     }
// Person.prototype.saySomethinig = function (name) {
//     this.name = name
// }

// var p1 = new Person('tom',12)
// var p2 = new Person('jack',13)
// console.log(p1,p2)

// console.log('12312' instanceof String)

// var cache = {};
// var mult = function() {
//     var args = Array.prototype.join.call(arguments, ',');
//     console.log(args)
//     if(cache[args]) {
//         return cache[args]
//     }
//     console.log(1)
//     var a = 1;
//     for( var i = 0, l = arguments.length; i < l; i++) {
//         a =a  * arguments[i];
//     }

//     return cache[args] = a;
// }

// console.log(mult(1,2,3))
// console.log(mult(1,2,3))

// 原型链继承
// var Super = function() {
//     this.name = ['qq']
// }

// Super.prototype.getSuperName = function() {
//     return this.name;
// }

// function Sub() { }

// Sub.prototype = new Super();

// var sub1 = new Sub();
// sub1.name.push('nn');

// var sub2 = new Sub();
// sub2.name.push('pp');

// console.log(sub2.getSuperName())
// console.log(sub1.getSuperName())
// let arr = [1,2,3]
// console.log(Object.prototype.toString.call(arr) === '[object Array]')



// 实现一个无限累加函数

// function add(a) {
//     function sum(b) {
//         a = b ? a + b : a;
//         return sum
//     }
//     sum.toString = function() { // 只在最后一次调用
//         return a;
//     }

//     return sum;
// }

// function add(a) {
//     function sum(b) { // 使用闭包
//         a = a + b; // 累加
//         return sum;
//     }
//     sum.toString = function() { // 只在最后一次调用
//         return a;
//     }
//     return sum; // 返回一个函数
// }
//    console.log(add(1)(2)(3)(4));

// let  value = 1;

// Object.defineProperty(global, 'a', {
//     get() {
//        return value++
//     }
// })

// console.log(a===1&&a===2&&a===3)

// let c = [1, 2, 3]
// let d = {a:2}
// Object.prototype.toString = function(){
//     // console.log('Object')
// }
// Array.prototype.toString = function(){
//     console.log('Array')
// }
// Number.prototype.toString = function(){
//     console.log('Number')
// }
// String.prototype.toString = function(){
//     console.log('String')
// }
// console.log(2 + 1)  // 3
// console.log('s')    // 's'
// console.log('s'+2)  // 's2'
// console.log(c < 2)  // false        (一次 => 'Array')
// console.log(c + c)  // "1,2,31,2,3" (两次 => 'Array')
// console.log(d > d)  // false        (两次 => 'Object')


// var num = 3;
// num.len = 4;
// console.log(num.len) //underfined

// ====》 等价于

// var num = 3;

// // num.len = 4
// new Number(3).len = 4;
// delete new Number(3);

// // console.log(num.len)
// console.log(new Number(3).len) // underfined


// setTimeout(()=>{
//     console.log('setTimeout')
//   })
//   let p1 = new Promise((resolve)=>{
//     console.log('Promise1')
//     resolve('Promise2')
//   })
//   p1.then((res)=>{
//     console.log(res)
//   })
//   console.log(1)


// 俩个setTimeout 的比较 顺序
// function fn1(){
//     console.log(111)
//     setTimeout(function(){
//      console.log('wait me 300')
//     },300)
//    }
//    function fn2(){
//     console.log(222)
//     setTimeout(function(){
//         console.log('wait me 100')
//        },100)
//    }
//    fn1();
//    fn2();
//  111 222  wait me 100  wait me 300


// 回调函数
// function fn(callback) {
//     setTimeout(()=>{
//         msg = '2020 ye'
//         console.log(123);
//         callback(msg)
//     }, 1000)
// }

// fn((mgs)=> {
//     console.log(msg)
// })
// 123   2020 ye

// function fn() {
//     setTimeout(()=>{
//         console.log(100)
//     })
//     return new Promise((res,rej)=>{
//         setTimeout(()=> {
//             msg= '2323';
//             res(msg)
//         })
//     })
// }
// fn().then((res)=>{
//     console.log(res)
// })
// console.log(111)



// 将一维数组改为树结构 【数组中都有一个父亲节点id】
// let oldList = [
//     {pid: null, id: 0, name: '根层级',},
//     {pid: 0, id: 1, name: '第一层级',},
//     {pid: 0, id: '02', name: '第一层级',},
//     {pid: 0, id: '03', name: '第一层级',},
//     {pid: 0, id: '04', name: '第一层级',},
//     {pid: 1, id: 2, name: '第2层级',},
//     {pid: 1, id: 12, name: '第2层级',},
//     {pid: 1, id: 13, name: '第2层级',},
//     {pid: 1, id: 14, name: '第2层级',},
//     {pid: 0, id: '05', name: '第一层级',},
//     {pid: 0, id: '06', name: '第一层级',},
//     {pid: 0, id: '07', name: '第一层级',},
//     {pid: 0, id: '08', name: '第一层级',},
//     {pid: 0, id: '09', name: '第一层级',},
//     {pid: 2, id: 3, name: '第一层级',},
//     {pid: 2, id: 23, name: '第一层级',},
//     {pid: 2, id: 24, name: '第一层级',},
//     {pid: 2, id: 25, name: '第一层级',},
//     {pid: 2, id: 26, name: '第一层级',},
// ]


// let  newTree = []; // 存放过滤后的数据， 将找到父节点的项逐渐加入到数组中
// let  needCache = []; //  存放最新饿的newTree的叶子结点，用来遍历


// function getNoParentList(list) {
//     newTree = list.filter(item => item.pid === null);
//     oldList = list.filter(item => item.pid !== null);
// }

// function inintTree(newList, oldList) {
//     newList.forEach(itemNew => {
//         oldList.forEach((itemOld, index) => {
//           // 如果找到父节点，则将旧项设置为Null
//           if (itemOld&&itemOld.pid === itemNew.id) {
//             if (!itemNew.children) {
//               itemNew.children = []
//             }
//             itemNew.children.push(itemOld )
//             oldList[index] = null
//           }
//         })

//      oldList =  oldList.filter(item=> item !== null)
//     })
//     if(oldList.length > 0) {
//         needCache = [];
//         getNeed(newList); // 获取新数组所有的叶子节点   || oldList中剩余的数据都是newList中叶子节点的子节点或者后代
//         inintTree(needCache, oldList)
//     }
// }

// function getNeed(list) {
//     list.map(item=> {
//         if(Array.isArray(item.children)&& item.children.length> 0) {
//             getNeed(item.children)
//         } else {
//             needCache.push(item)
//         }
//     })
// }



// getNoParentList(oldList)
// inintTree(newTree, oldList)
// console.log(newTree)


// Array.from()对现有数组执行浅复制
// const a1 = [1, 2, 3, 4];
// const a2 = Array.from(a1);
// a2[0] = 99

// console.log(a1);        // [1, 2, 3, 4]
// console.log(a2);        // [1, 2, 3, 4]
// console.log(a1 === a2); // false


// const  obj = {
//     a: 1,
//     b: 2,
//     c: [true, false]
// }
// const obj1 = obj;
// obj1.a =3
// obj.b = 4
// console.log(obj)
// console.log(obj1)

// function* genDemo() {
//     console.log("开始执行第一段")
//     yield 'generator 2'
//     console.log("开始执行第二段")
//     yield 'generator 2'
//     console.log("开始执行第三段")
//     yield 'generator 2'
//     console.log("执行结束") 
//     return 'generator 2'
// } 
// console.log('main 0')
// let gen = genDemo() 
// console.log(gen)
// console.log(gen.next().value) 
// console.log('main 1')
// console.log(gen.next().value)
// console.log('main 2')
// console.log(gen.next().value)
// console.log('main 3')
// console.log(gen.next().value)
// console.log('main 4')

// async function foo() { 
//     console.log(1) 
//     let a = await 100 
//     console.log(a) 
//     console.log(2)
// }
// console.log(0)
// foo()
// console.log(3)



// let callback = function(index){
//     console.log(index)
//     console.log('i am do homework')
// }
// function doWork(cb) {
//     console.log('start do work')
//     for(let i = 0; i < 6; i ++) {
//       setTimeout(()=>cb(i), Math.random()*1000)
//     }
//     console.log('end do work')
// }
// doWork(callback)


// async 和await 是基于generator和promsie完成等

// async function foo() { 
//     console.log(1) 
//     let a = await 100
//      console.log(a) 
//      console.log(2)
//     }
// console.log(0)
//     foo()
// console.log(3)



// var myName = '我的'
// function foo() {
//     var myName = "极客时间"
//     let test1 = 1
//     const test2 = 2
//     var innerBar = { 
//         setName:function(newName){
//             console.log(this)
//             console.log(myName)
//             myName = newName
//         },
//         getName:function(){
//             console.log(test1)
//             return myName
//         }
//     }
//     return innerBar
// }
// var bar = foo()
// let func = bar.setName
// func("极客邦")
// bar.getName()
// console.log(bar.getName())



// function onload(){
//     return new Promise(function(resolve, reject) {
//         if(true) {
//             resolve(123)
//         }
//     })
// }
// const result = onload()
// result.then(res=>{
//     console.log(res)
//     let re = res+1231
//     return re
// }).then(res=>{
//     console.log(res)
// })

// result.then(res=>{
//     console.log(res)
// })


// function MyPromise(executor) {
//     var onResolve_ = null;
//     var onReject_ = null;
//     this.then = function(resolve, reject){
//         onResolve_ = resolve;
//     }
//     function resolve(value) {
//         //这里其实是一个微任务 暂且用setTimeout替代 延迟获取onResolve_ 回调函数延迟绑定
//         setTimeout(
//            ()=> onResolve_(value), 0
//         )       
//     }
//     executor(resolve, null);
// }
// let demo = new MyPromise(function(resolve, reject){
//     resolve(100)
// })
// demo.then(function(value){
//     console.log(value)

// })

// class Promise {
//     constructor(fn) {
//       this.state = Promise.PENDING;
//       this.value = undefined;
//       this.reason = null;
//       this.onFulfilledCallbacks = [];
//       this.onRejectedCallbacks = [];
//       fn(this.resolve.bind(this), this.reject.bind(this));
//     }

//     then(onFulfilled, onRejected) {
//       if (this.state === Promise.FULFILLED) {
//         onFulfilled(this.value);
//       } else if (this.state === Promise.REJECTED) {
//         onRejected(this.reason);
//       } else {
//         this.onFulfilledCallbacks.push(onFulfilled);
//         this.onRejectedCallbacks.push(onRejected);
//       }
//       return this;
//     }

//     resolve(value) {
//       this.state = Promise.FULFILLED;
//       this.value = value;
//       if (value.constructor === this.constructor) {
//         value.onFulfilledCallbacks = [...this.onFulfilledCallbacks];
//         value.onRejectedCallbacks = [...this.onRejectedCallbacks];
//       } else {
//         this.onFulfilledCallbacks.forEach((item) => {
//           if (typeof item === 'function') {
//             item(value);
//           }
//         });
//       }
//     }

//     reject(reason) {
//       this.state = Promise.REJECTED;
//       this.reason = reason;
//       this.onRejectedCallbacks.forEach((item) => {
//         if (typeof item === 'function') {
//           item(reason);
//         }
//       });
//     }
//   }

//   Promise.PENDING = 'pending';
//   Promise.FULFILLED = 'fulfilled';
//   Promise.REJECTED = 'rejected';
//   module.exports = Promise;


// function c1(){
//     this.p1 = 1;
//     this.p2 = function(){
//         console.log(this.p1);
//     }
// } 
// var o1 = new c1;
// o1.p2();

// function c2(){
// }
// c2.prototype.p1 = 1;
// c2.prototype.p2 = function(){
//     console.log(this.p1);
// }
// var o2 = new c2;
// o2.p2();


// null undefined "" 0 false
// console.log(null == false) // false
// console.log(undefined == 0); // false
// console.log(""==0); // true
// console.log("" === 0); // false
// console.log(null == 0); // false

   // apply call
    // /*定义一个人类*/  
    // function Person(name,age)  
    // {  
    //     this.name=name;  
    //     this.age=age;  
    // }  
    // /*定义一个学生类*/  
    // function Student(name,age,grade)  
    // {  
    //     Person.apply(this,arguments);  
    //     this.grade=grade;  
    // }  
    // //创建一个学生类  
    // var student=new Student("zhangsan",21,"一年级");  
    // //测试  
    // console.log("name:"+student.name+"\n"+"age:"+student.age+"\n"+"grade:"+student.grade);  
    // //大家可以看到测试结果name:zhangsan age:21  grade:一年级  
    // //学生类里面我没有给name和age属性赋值啊,为什么又存在这两个属性的值呢,这个就是apply的神奇之处. 


/**
 * 一些操作有参数列表的使用，但没有数组的使用时候，可以用apply来将数组转化为参数列表实现同样的功能
 * **/

//  let maxNum = Math.max(1,2,3,6,4); // Math获取最大值， 支持Math.max(param1,param2,param3…)，但不支持数组形式 Math.max([param1,param2,param3…])
//  let maxNumApply = Math.max.apply(null, [1,2,3,4,5,6]) // 故使用apply来转化 apply会将一个数组装换为一个参数接一个参数的传递给方法
//  console.log(maxNumApply);

//  数组的push方法没有提供push一个数组，但是提供push(param1, param2,param3,...paramn) 所以可以用apply来实现
//     var arr1=new Array("1","2","3");  
//     var arr2=new Array("4","5","8");  
//    let newArr =  Array.prototype.push.apply(arr1,arr2);  
//    console.log(arr1);
//    console.log(newArr);


// //函数柯里化
// function fn(x, y) {
//     return function (y) {
//         console.log(x + y);
//     };
// };
// var fn_ = fn(1);
// fn_(1); //2

// fn(1)(1) //2

// var age = 100;
// // age = 100
// const obj = { 
//     name: 'qqyu',
//     age: 90,
//     getInfo: function() {
//         // console.log(age)
//         console.log(this.age)
//     }
// }

// obj.getInfo();

// let getAge = obj.getInfo;
// console.log(age)
// console.log(global) 
// /* undefined  node的机制与webpack其实是类似的，每个文件都有自己的独自的作用域;所以var声明的变量其实并没有挂在全局，而是在当前文件的作用域中
// *想创建全局变量，你需要去掉那个var，此时这个变量就自动隐式声明为全局，这个时候使用global才会看到它 // 模块作用域
// */
// getAge()





// function  fn() {
//   return {
//     add: function(value) {
//       console.log(`add ${value}`)
//       return {
//         sleep: function(time) {
//           return {
//              min: function(k) { 
//                 setTimeout(function(v) {
//                   console.log(`min ${k}`)
//               },time) 
//             }
//         }
//         }
//       }
//     }
//   }

// }

// fn().add('add').sleep(300).min('min')
  

// function fn(data) {
//   let res = true;
//   let arr = [];
//   let left = '({[';
//   let right =')}]';
//   let dataArr =  data.split('');
//   dataArr.forEach(item => {
//     if(left.includes(item)) {
//       arr.push(item)
//     } else if(right.includes(item)){
//       if(left[right.indexOf(item)] !== arr[arr.length-1]) {
//         res = false;
//         return false;
//       }
//       arr.pop();
//     }
    
//   });
//   if(arr.length) {
//     res = false
//   }
//   console.log(arr)
//   console.log(res)
//   return res;

// }

// fn('()()[{]}')


// const a = await 1;
// console.log(999)

// var removeElement = function(nums, val) {

// };

var s = "aaa1 bbb2 ccc3";
var reg = /(\w+)(\d{1})/g;
var rs_match1 = s.match(reg);
var rs_match2 = s.match(reg);
var rs_exec1 = reg.exec(s);
var rs_exec2 = reg.exec(s);
var rs_exec3 = reg.exec(s);
var rs_exec4 = reg.exec(s);
// console.log("match1:",rs_match1);
// console.log("match2:",rs_match1);
console.log("exec1:",rs_exec1);
console.log("exec2:",rs_exec2);
console.log("exec3:",rs_exec3);
console.log("exec4:",rs_exec4);
// console.log(s)

window.addEventListener('click',function(e){
    if(banner===true) {
        e.stopPropagation()
    }
}, true)

