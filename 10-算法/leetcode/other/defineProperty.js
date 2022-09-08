// 来简单实现一个响应式函数，能对一个对象内的所有key添加响应式特性。
//要求输入的代码如下所示

const render = (key, val) =>{
  console.log(`SET key=${key} val=${val}`);  
}

const defineReactive = (obj, key, val) => {
  reactive(val);// 递归遍历子元素
  Object.defineProperty(obj, key, {
    get: function name() {
      return val
    },
    set:function name(newVal) {
      if(newVal === val) {
        return;
      }
      val = newVal
      render(key, newVal)
    }
  })

}

const reactive = (obj) => {
  if(typeof obj === 'object') {
    for (const key in obj) {
      defineReactive(obj,key,obj[key])
    }
  }
}

const data = {
  a: 1,
  b: 2,
  c: {
    c1: {
      c11: 999
    },
    c2: 222
  }
}

reactive(data);

data.a = 5; //SET key=a val=5
data.b = 7; //SET key=b val=7
data.c.c2 = 222; // 
data.c.c1.c11 = 121; //SET key=c11 val=121
