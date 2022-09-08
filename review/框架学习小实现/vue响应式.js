
// 来简单实现一个响应式函数，能对一个对象内的所有key添加响应式特性。
//要求输入的代码如下所示
const data = {
  a: 1,
  b: 2,
  c: {
    c1: {
      c11: 999
    },
    c2: 222
  },
  d: [1,23,3]
}


function defineReactive(obj, key, val) {
  observe(value)
  Object.defineProperty(obj, key, {
    get: function() {
      return obj[key]
    },
    set: function(newVal){
      if(newVal === val) {
        return
      }
      value = newVal;
      render(key, newValue)
      
    }
  })
}

function render(key, value) {
  console.log(`SET key=${key} val=${value}`)
}


function observe(obj) {
  if(Object.prototype.toString.call(obj) === '[object Object]') {
    for(let key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}

observe(data);

data.a = 5; //SET key=a val=5
data.b = 7; //SET key=b val=7
data.c.c2 = 222; // 
data.c.c1.c11 = 121; //SET key=c11 val=121