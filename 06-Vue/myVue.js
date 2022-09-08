

// 对传入的obj 进行拦截
function defineReactive(obj, key, val) {
  // 递归 嵌套的对象
  observe(val)
  // 创建一个Dep 和当前的key一一对应
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      console.log('get' + val);
      return val
    },
    set(newVal) {
      if(newVal !== val) {
        observe(val) // 新设置的属性也要调用defineReactive 实现响应式
        val = newVal
        console.log('set'+ key + '|' + val)

        // 通知更新
        // watchers.forEach(element => element.update());
        dep.notify()
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
  // Object.keys(obj).forEach(key=> {
  //   defineReactive(obj,key,obj[key])
  // })

  // 创建Observe实例
  new Observe(obj)
}


// 根据对象的类型决定如何进行响应化
class Observe {
  constructor(value) {
    this.value = value;
    // 判断其类型
    if(typeof value === 'object') {
      this.walk(value)
    } 
    // else if (){

    // }
  }
  // 对象数据响应化
  walk(obj) {
    Object.keys(obj).forEach(key=> {
      defineReactive(obj,key,obj[key])
    })
  }
  // 数组数据响应化  待补充
}

 // 代理函数， 方便用户直接访问$data中的数据
 function proxy(vm, key) {
   Object.keys(vm[key]).forEach(item=> {
     // vm.$data中的key代理到vm中 即页面调用的时候 直接可以vm[key]获取
     Object.defineProperty(vm, item, {
       get() {
        return vm[key][item]
       },
       set(newVal) {
        vm[key][item] = newVal
       }
     })
   })
 }


// 创建MyVue构造函数
class MyVue {
  constructor(options) {
    // 保存选项
    this.$options = options;
    this.$data = options.data

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this, '$data')

    // 创建编译器
    new Compiler(options.el, this)
  }
}




// 观察者： 保存更新函数，值发生变化的时候调用更新函数
// const watchers = []
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;
    // watchers.push(this)

    // Dep.target静态属性上设置为当前watcher实例
    Dep.target = this;
    this.vm[this.key] //读取触发了getter
    Dep.target = null  // 收集完就置空
  }

  update() {
    this.updateFn.call(this.vm,this.vm[this.key])
  }

}


//  Dep: 依赖， 管理某个key相关的所有Watcher实例
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify(){
    this.deps.forEach(dep=>dep.update())
  }
}


