Function.prototype._bind = function(context, ...args) {

  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }
  let fn = this; // 保留原有的函数
  let Bridge = function(){};
  const resutFn = function(...newArgs){
    console.log('this', this) // 如果是普通函数调用 this指向全局； new时候 this指向实例对象
    console.log('this', Object.prototype.toString.call(this)) //new 时候 打印 this [object Object]  说明为对象
    console.log('instanceof', this instanceof Bridge)
    fn.apply(this instanceof Bridge ? this: context, [...args,...newArgs])
  }

  if(this.prototype) {
    Bridge.prototype = this.prototype
  }

  resutFn.prototype = new Bridge()

  return resutFn
}

function fnn() {
  console.log(this.a)
}
const obj = {
  a: 111
}

const fn = fnn._bind(obj, 123)
const fn1 = new fn() 
// console.log('fn1', fn1)
// console.log(fn())

// 因为new 本来是针对原始的函数fnn进行的 即 new fnn()； 而现在fnn进行了_bind，现在的new 就是对已经bind过的函数fn进行new, 所以要保持原有的构造函数内容，
// 需要利用继承来 使得fn继承所有fnn的内容， 这里使用寄生继承 

// 因为使用了继承
// new的时候Bridge 肯定是在实例对象的__proto__的原型链上 故 实例对象 this instanceof Bridge true
