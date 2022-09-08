// 响应式
// var obj = {};

// 对传入的obj 进行拦截
function defineReactive(obj, key, val) {
  // 递归 嵌套的对象
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('get' + val);
      return val
    },
    set(newVal) {
      if(newVal !== val) {
        observe(val) // 新设置的属性也要调用defineReactive 实现响应式
        val = newVal
        console.log('set'+ key + '|' + val)
      }
    } 
  })
}


// 对data进行遍历 不用一个个去手动调用响应式
function observe(obj) {
  if(typeof obj !== 'object' || obj === null) {
    // 希望传入的是object
    return
  } 
  Object.keys(obj).forEach(key=> {
    defineReactive(obj,key,obj[key])
  })

}

const obj = {foo: 'foo', baz: {a: 1}}

observe(obj)

obj.foo
obj.foo = 'foooooo'
obj.baz.a = 10

// defineReactive(obj, 'foo', 'foo');
// obj.foo; // get
// obj.foo = 'foooooo' // set  