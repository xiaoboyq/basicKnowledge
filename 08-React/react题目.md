react源码解析20.总结&第一章的面试题解答

<!-- https://xiaochen1024.com/courseware/60b1b2f6cf10a4003b634718/60b1b581cf10a4003b63472c -->

总结
至此我们介绍了react的理念，如果解决cpu和io的瓶颈，关键是实现异步可中断的更新

我们介绍了react源码架构（ui=fn(state)），从scheduler开始调度（根据过期事件判断优先级），经过render阶段的深度优先遍历形成effectList（中间会执行reconcile|diff），交给commit处理真实节点（中间穿插生命周期和部分hooks），而这些调度的过程都离不开Fiber的支撑，Fiber是工作单元，也是节点优先级、更新UpdateQueue、节点信息的载体，Fiber双缓存则提供了对比前后节点更新的基础。我们还介绍了jsx是React.createElement的语法糖。Lane模型则提供了更细粒度的优先级对比和计算，这一切都为concurrent mode提供了基础，在这之上变可以实现Suspense和batchedUpdate（16、17版本实现的逻辑不一样），18章context的valueStack和valueCursor在整个架构中运行机制，19章介绍了新版事件系统，包括事件生产、监听和触发

面试题简答
# jsx和Fiber有什么关系

答：mount时通过jsx对象（调用createElement的结果）调用createFiberFromElement生成Fiber update时通过reconcileChildFibers或reconcileChildrenArray对比新jsx和老的Fiber（current Fiber）生成新的wip Fiber树

# react17之前jsx文件为什么要声明import React from 'react'，之后为什么不需要了

<!-- http://www.cncsto.com/article/48927 -->
react runtime:  'classic' 【16】;  runtime: 'automatic'【17】
babel 

答：jsx经过编译之后编程React.createElement，不引入React就会报错，react17改变了编译方式，变成了jsx.createElement

function App() {
  return <h1>Hello World</h1>;
}
//转换后
import {jsx as _jsx} from 'react/jsx-runtime';
   
function App() {
  return _jsx('h1', { children: 'Hello world' });
}
# Fiber是什么，它为什么能提高性能

答：Fiber是一个js对象，能承载节点信息、优先级、updateQueue，同时它还是一个工作单元。

Fiber双缓存可以在构建好wip Fiber树之后切换成current Fiber，内存中直接一次性切换，提高了性能
Fiber的存在使异步可中断的更新成为了可能，作为工作单元，可以在时间片内执行工作，没时间了交还执行权给浏览器，下次时间片继续执行之前暂停之后返回的Fiber
Fiber可以在reconcile的时候进行相应的diff更新，让最后的更新应用在真实节点上
hooks

# 为什么hooks不能写在条件判断中

答：hook会按顺序存储在链表中，如果写在条件判断中，就没法保持链表的顺序

状态/生命周期

# setState是同步的还是异步的

答：legacy模式下：命中batchedUpdates时是异步 未命中batchedUpdates时是同步的

concurrent模式下：都是异步的

# componentWillMount、componentWillMount、componentWillUpdate为什么标记UNSAFE

答：新的Fiber架构能在scheduler的调度下实现暂停继续，排列优先级，Lane模型能使Fiber节点具有优先级，在高优先级的任务打断低优先级的任务时，低优先级的更新可能会被跳过，所有以上生命周期可能会被执行多次，和之前版本的行为不一致。

组件

# react元素$$typeof属性什么

答：用来表示元素的类型，是一个symbol类型

# react怎么区分Class组件和Function组件

答：Class组件prototype上有isReactComponent属性

# 函数组件和类组件的相同点和不同点

答：相同点：都可以接收props返回react元素

不同点：

编程思想：类组件需要创建实例，面向对象，函数组件不需要创建实例，接收输入，返回输出，函数式编程

内存占用：类组建需要创建并保存实例，占用一定的内存

值捕获特性：函数组件具有值捕获的特性 下面的函数组件换成类组件打印的num一样吗

```javascript
export default function App() {
  const [num, setNum] = useState(0);
  const click = () => {
    setTimeout(() => {
      console.log(num);
    }, 3000);
    setNum(num + 1);
  };
   
  return <div onClick={click}>click {num}</div>;
}
   
   
export default class App extends React.Component {
  state = {
    num: 0
  };
   
  click = () => {
    setTimeout(() => {
      console.log(this.state.num);
    }, 3000);
    this.setState({ num: this.state.num + 1 });
  };
   
  render() {
    return <div onClick={this.click}>click {this.state.num}</div>;
  }
}
```
   
   
可测试性：函数组件方便测试

状态：类组件有自己的状态，函数组件没有只能通过useState

生命周期：类组件有完整生命周期，函数组件没有可以使用useEffect实现类似的生命周期

逻辑复用：类组件继承 Hoc（逻辑混乱 嵌套），组合优于继承，函数组件hook逻辑复用

跳过更新：shouldComponentUpdate PureComponent，React.memo

发展未来：函数组件将成为主流，屏蔽this、规范、复用，适合时间分片和渲染

开放性问题

# 说说你对react的理解/请说一下react的渲染过程

答：是什么：react是构建用户界面的js库

能干什么：可以用组件化的方式构建快速响应的web应用程序

如何干：声明式（jsx） 组件化（方便拆分和复用 高内聚 低耦合） 一次学习随处编写

做的怎么样： 优缺（社区繁荣 一次学习随处编写 api简介）缺点（没有系统解决方案 选型成本高 过于灵活）

设计理念：跨平台（虚拟dom） 快速响应（异步可中断 增量更新）

性能瓶颈：cpu io fiber时间片 concurrent mode

渲染过程：scheduler render commit Fiber架构

聊聊react生命周期 详见第11章

简述diff算法 详见第9章

# react有哪些优化手段

答：shouldComponentUpdate、不可变数据结构、列表key、pureComponent、react.memo、useEffect依赖项、useCallback、useMemo、bailoutOnAlreadyFinishedWork ...

# react为什么引入jsx

答：jsx声明式 虚拟dom跨平台

解释概念：jsx是js语法的扩展 可以很好的描述ui jsx是React.createElement的语法糖

想实现什么目的：声明式 代码结构简洁 可读性强 结构样式和事件可以实现高内聚 低耦合 、复用和组合 不需要引入新的概念和语法 只写js， 虚拟dom跨平

有哪些可选方案：模版语法 vue ag引入了控制器 作用域 服务等概念

jsx原理：babel抽象语法树 classic是老的转换 automatic新的转换

# 说说virtual Dom的理解

答：是什么：React.createElement函数返回的就是虚拟dom，用js对象描述真实dom的js对象

优点：处理了浏览器的兼容性 防范xss攻击 跨平台 差异化更新 减少更新的dom操作

缺点：额外的内存 初次渲染不一定快

# 你对合成事件的理解

类型	       原生事件	  合成事件
命名方式     	全小写	  小驼峰
事件处理函数	 字符串  	 函数对象
阻止默认行为	返回false	event.preventDefault()
理解：

React把事件委托到document上（v17是container节点上）
先处理原生事件 冒泡到document上在处理react事件
React事件绑定发生在reconcile阶段 会在原生事件绑定前执行
优势：

进行了浏览器兼容。顶层事件代理，能保证冒泡一致性(混合使用会出现混乱)

默认批量更新

避免事件对象频繁创建和回收，react引入事件池，在事件池中获取和释放对象（react17中废弃） react17事件绑定在容器上了

######
我们写的事件是绑定在dom上么，如果不是绑定在哪里？ 答：v16绑定在document上，v17绑定在container上
为什么我们的事件手动绑定this(不是箭头函数的情况) 答：合成事件监听函数在执行的时候会丢失上下文
为什么不能用 return false 来阻止事件的默认行为？ 答：说到底还是合成事件和原生事件触发时机不一样
react怎么通过dom元素，找到与之对应的 fiber对象的？ 答：通过internalInstanceKey对应react源码18.2
解释结果和现象

# 点击Father组件的div，Child会打印Child吗

function Child() {
  console.log('Child');
  return <div>Child</div>;
}
    
    
function Father(props) {
  const [num, setNum] = React.useState(0);
  return (
    <div onClick={() => {setNum(num + 1)}}>
      {num}
      {props.children}
    </div>
  );
}
    
    
function App() {
  return (
    <Father>
      <Child/>
    </Father>
  );
}
    
const rootEl = document.querySelector("#root");
ReactDOM.render(<App/>, rootEl);
答： 不会，源码中是否命中bailoutOnAlreadyFinishedWork

## 打印顺序是什么

function Child() {
  useEffect(() => {
    console.log('Child');
  }, [])
  return <h1>child</h1>;
}
    
function Father() {
  useEffect(() => {
    console.log('Father');
  }, [])
      
  return <Child/>;
}
    
function App() {
  useEffect(() => {
    console.log('App');
  }, [])
    
  return <Father/>;
}
答：Child ，Father ，App ，render阶段mount时深度优先遍历，commit阶段useEffect执行时机

useLayout/componentDidMount和useEffect的区别是什么

class App extends React.Component {
  componentDidMount() {
    console.log('mount');
  }
}
    
useEffect(() => {
  console.log('useEffect');
}, [])
答：他们在commit阶段不同时机执行，useEffect在commit阶段结尾异步调用，useLayout/componentDidMount同步调用

react源码20.1

如何解释demo_4、demo_8、demo_9出现的现象

答：demo_4：useEffect和useLayoutEffect的区别 demo_8：任务的优先级有关，见源码分析视频 demo_9：批量更新有关，见源码分析视频