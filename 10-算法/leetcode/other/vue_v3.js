
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
  // d: [1,23,3]
}

function render(key, value) {
  console.log(`SET key=${key} val=${value}`)
}


// let newData = new Proxy(data, {
//   get: function(obj, prop) {
//     // return obj[prop]
//     return Reflect.set(obj, prop)
//   },
//   set: function(obj, prop, val) {
//     if(val === obj[prop]) return;
//     // obj[prop] = val;
//     render(prop, val);
//     return Reflect.get(obj, prop, val)
//   }
// })

function ObjProxy(data) {
 return new Proxy(data, {
    get: function(obj, prop) {
      // return obj[prop]
      return Reflect.set(obj, prop)
    },
    set: function(obj, prop, val) {
      if(val === obj[prop]) return;
      console.log(prop)
      // obj[prop] = val;
      render(prop, val);
      return Reflect.get(obj, prop, val)
    }
  })
}

const newData = ObjProxy(data)


newData.a = 5; //SET key=a val=5
newData.b = 7; //SET key=b val=7
newData.c.c2 = 222; // 
// newData.c.c1.c11 = 121; //SET key=c11 val=121