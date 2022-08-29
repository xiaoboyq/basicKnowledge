# useEffect( )
相当于componentDidmount, componentDidupdate, componentWillUnmount的集合

# setState
1.setState在合成事件和生命周期中是异步的，这里说的异步其实是批量更新，达到了优化性能的目的
2.setState在setTimeout和原生事件【操作dom】中是同步的 
3.回调事件中可以获取最新的值，callback是更新之后才执行
批量更新合并执行 执行最后一条更新
## 如果想要链式更新state 可以让setState接受一个函数
this.setState((state)=>({counter: state.counter + 1}))
this.setState((state)=>({counter: state.counter + 2}))


# react history
  用history.push,和history.go或者replace其他方式去改变当前的location有什么特别的区别
  history.push 这个方法会向history栈里面添加一条新记录，这个时候用户点击浏览器的回退按钮可以回到之前的路径。
  history.go 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)
  history.replace 跟 history.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

# react 中生命周期 componentWillReceiveProps


# hoc  Hoc Order Component 高阶组件就是组件返回组件

<!-- 页面复用
权限控制
组件渲染性能追踪 -->
定义：
  1. 是一个函数
  2. 入参， 是一个组件
  3. 返回值， 一个新的组件
  4. 最好是一个纯函数， 不应该有任务的副作用。

作用：
1. 属性代理： 
  1.1 操作props 
  1.2 操作组件实例 ref={(instance)=>this.ref=instance} // 可以获取实例state props 等 console.log(this.ref.state)

2. 继承/劫持
公共的组件 不好修改里面的内容， 通过hoc去劫持修改 方法啊或者内容

装饰器模式 就近原则 

装饰器： 接受一个函数， 然后类似劫持在这个函数上去做一些自己的事情， 返回一个新的函数
