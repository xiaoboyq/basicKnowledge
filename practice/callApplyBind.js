
/***
* call, apply 原理 利用对象内部的函数的this指向 是指向对象本身的
* call 和apply 除了传入的参数不同，其他一样
* call、apply会执行函数， 但bind 不会执行，要单独调用函数
* call和bind 是一个个单独的传参数【即参数列表】；apply是数组形式传递参数
* bind 方法不会立即执行，需要返回一个待执行的函数；（闭包）
***/


// call 
//es6实现
Function.prototype.callES6 = function (context, ...args) {
  let cxt = context || window;
  fn = Symbol()
  cxt[fn] = this;
  args = args ? args : []
  let res = args.length > 0 ? cxt[fn](...args) : cxt[fn]();
  delete cxt[fn];
  return res
}

// es5  
/** 1、call是可以被所有方法调用所以需要定义在函数的原型上；
 *  Function.prototype;
 *  2、函数接收参数被调用时只接受第二个及以后的参数；
 *  这里的问题在于把arguments类数组转换为数组获取第二个后的参数，并且如何把数组想es6那样用扩展运算符，再不更换类型的情况下，把数组展开，传入要调用的函数中；
 * （1）：类数组转换数组，定义新数组；使用for循环push类数组的每一项；
 * （2）：展开数组？
 *  如果用join会把数组元素的类型变为字符串（不可取）；
 *  在字符串拼接时会展开数组如果在加上eval解析（nice可取）；
 * 3、如何绑定this 【将函数添加到对象的属性，再以对象方法调用，即this指向对象】
 * 第一个参数为要绑定this的对象，给这个对象的属性添加要要用的方法，之后在进行删除；（nice思路明确，开整）
 * **/
// https://blog.csdn.net/weixin_39684228/article/details/110650672
Function.prototype.callES5 = function(context) {
  let ctx = context || window;
  ctx.fn = this;
  let args = []
  for(let i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]"); // 这里传入数组的是一个个变量，而不是值， 目的是利用下面的eval对 args数组展开作为参数进行铺垫
    //里因为 args 是数组，需要将它作为参数展开 如果使用join等方法，会把参数类型全部变为字符串，所以这里使用eval；
  }
  let result =  eval('ctx.fn('+args+')'); // 在字符串拼接时会展开数组  
  delete ctx.fn;
  return result
}

// apply 
Function.prototype.apply = function (context, ...args) {
  let cxt = context || window;
  fn = Symbol();
  cxt[fn] = this;
  let res = args.length > 0 ? cxt[fn](...args) : cxt[fn]()
  delete ctx.fn;
  return res
}


// 少了一种情况 bind返回的函数 被当作构造函数执行的时候， this的指向应该是以其实例对象为准

// bind : bind并不是立即执行，而是返回一个新函数，且新函数的this无法再次被修改，
// bind 方法不会立即执行，需要返回一个待执行的函数；（闭包）
// 实现作用域绑定（apply）
// 参数传递（apply 的数组传参）
// 当作为构造函数的时候，进行原型继承 

Function.prototype.bind = function (context, ...args) {
  //新建一个变量赋值为this，表示当前函数
  const fn = this
  //判断有没有传参进来，若为空则赋值[]
  bindArgs = args ? args : []
  //返回一个newFn函数，在里面调用fn
  // 旧函数调用bind函数返回的新函数new出的实例化对象的constructor是旧函数, 利用圣杯模式继承的方式
  // 圣杯模式继承 为了son继承father原型上的东西，还可以修改自己原型上的东西，对father原型不影响。
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...bindArgs, ...newFnArgs])
  }
}


// 或者
Function.prototype.bind_ = function (obj) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  };
  // 旧函数调用bind函数返回的新函数new出的实例化对象的constructor是旧函数, 利用圣杯模式继承的方式
  // 圣杯模式继承 为了son继承father原型上的东西，还可以修改自己原型上的东西，对father原型不影响。
  var args = Array.prototype.slice.call(arguments, 1);
  var fn = this;
  //创建中介函数
  var F = function () { }; // 函数F作为一个中间层，上连father，下连Son，使两函数互不干扰
  var bound = function () {
    var params = Array.prototype.slice.call(arguments);
    //通过constructor判断调用方式，为true this指向实例，否则为obj
    fn.apply(this.constructor === fn ? this : obj, args.concat(params));
    console.log(this);
  };
  F.prototype = fn.prototype;
  bound.prototype = new F();
  return bound;
};


let name = '小王',age =17;
let obj = {
    name:'小张',
    age: this.age,
    myFun: function(from,to){
        console.log(this.name + ' 年龄 ' + this.age+'来自 '+from+'去往'+ to)
    }
}
let db = {
    name: '德玛',
    age: 99
}

//结果
// obj.myFun.myCall(db,'成都','上海');     // 德玛 年龄 99  来自 成都去往上海
// obj.myFun.apply(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海
// obj.myFun.bind_(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海
// obj.myFun.bind(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海
// obj.myFun.bind_(db,['成都','上海'])();    //德玛 年龄 99来自 成都,上海去往undefined
// obj.myFun.bind(db,['成都','上海'])();    //德玛 年龄 99来自 成都,上海去往undefined
// let fn = obj.myFun.bind(db,['成都','上海'])
// obj.myFun.prototype.name = 222 
// new fn()


function es5Fn() {
  let total = 0;
  for (let index = 0,  l =arguments.length; index < l; index++) {
    total += arguments[index]
  }
  console.log(total)
}

const  objes5 = {
  namees5: 'qqyu'
}

es5Fn.callES5(objes5, 111,222,"333")