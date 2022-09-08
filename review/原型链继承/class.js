class Animal { 
  say11 = () => {
    throw new Error('xx')
  }
};

class Monkey extends Animal { 
  say() {console.log('xxxx')
}
}

const monkey = new Monkey()
console.log(monkey)

monkey.say()

// 在class组件中， 定义在class中的函数分为普通函数和箭头函数， 普通函数会被放在原型对象上， 箭头函数会被放到实例对象上
// constructor中绑定了this后， 普通函数也会被复制到实例对象上， 即继承了原形对象上的方法




var abc = (a, b, c) => {
return [a, b, c]
}
const curried = curry(abc)
// console.log(curried(1)(2)(3))
// console.log(curried(1,2)(3))
console.log(curried(1,2,3))

function curry(fn) {
  let len = fn.length;
  let arg = []
  const curryFn = (...args)=> {
    arg = arg.concat(args)
    if(arg.length < len) {
      return curryFn;
    } else {
     return  fn(...arg)
    }

  }

  return curryFn
}


