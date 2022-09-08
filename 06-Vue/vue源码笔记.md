# src/platforms/web/entry-runtime-with-compiler.js
入口文件， 覆盖$mount, 执行模版解析和编译工作

# src/platforms/web/runtime/index.js
定义$mount

# src/core/instance/index.js
定义构造函数 Vue 

定义了很多实例方法:
initMixin(Vue) // 混入插件 inintMixin 通过该方法给Vue添加_init方法  在Vue原型上添加_init方法
stateMixin(Vue)   // $set,$delete, $watch
eventsMixin(Vue)  // $emit,$on, $once, $off
lifecycleMixin(Vue) // _update(), $forceUpdate(),$destroy()
renderMixin(Vue) //_render(), $nextTick

# src/core/index.js
定义全局的api

# src/core/instance/init.js
初始化方法定义的地方
  initLifecycle(vm) // $parent, $children, $ref,$root
  initEvents(vm)  // 对父组件传入的事件和回调添加监听
  initRender(vm)  // 声明 $slots， $createElement()
  callHook(vm, 'beforeCreate') // 调用beforeCreate钩子
  initInjections(vm) // 注入数据 reject 
  initState(vm)     // 重要： 数据的初始化， 响应式
  initProvide(vm)  // 提供数据
  callHook(vm, 'created')


# 初始化过程
new Vue() => this._init(options) => $mount            => mountComponent()                      
=> _render() => _update()
调用init   =>  初始化各种属性       =>调用mountComponent => 声明了updateComponent、创建了Watcher  
=> 获取虚拟dom  =>把虚拟dom转化为真实dom


# src/core/instance/state.js
  initData,获取data,设置代理，启动响应式observe

# src/core/observer/index.js  数据响应式





vue 2.0 响应式缺点
1.递归遍历，性能会受影响
2.api 不统一 【对object和array的实现方法不同】




watcher.run() =>componentUpdate()【组件更新函数】=>render()【获取最新的虚拟dom】=> update()【更新】=>patch()【更新或者初始化】 


diff
 是什么
 优点： 性能，跨平台，兼容性
 在什么地方  源码的 patchVnode， 当存在新旧虚拟dom的时候 会使用
 怎么执行：
    深度优先 同级比较【展开， 4种猜测和重排算法】 4个指针目的减少循环操作
