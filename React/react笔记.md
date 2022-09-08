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


# vue和react区别
<!-- // https://zhuanlan.zhihu.com/p/100228073 -->


# React 源码
.new 为一些新功能实验的版本
.old 为我们正常使用的

# react 批量更新机制源码原理  和  unstable_batched  👍
  设置开关 进行批量处理
  <!-- canmerge -->
  <!-- https://zhuanlan.zhihu.com/p/72929556 -->
  <!-- https://liulibin.blog.csdn.net/article/details/124710008?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-124710008-blog-113803273.pc_relevant_downloadblacklistv1&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-124710008-blog-113803273.pc_relevant_downloadblacklistv1&utm_relevant_index=1 -->
  ```javascript

  // setState实现

  setState(newState) {
      if (this.canMerge) {
          this.updateQueue.push(newState)
          return 
      }

      // 下面是真正的更新: dom-diff, lifeCycle...
      ...
  }

  // 然后f方法调用

  g() {
    this.setState({
          age: 18
      })
    this.setState({
        color: 'black'
    })
  }

  f() {
      this.canMerge = true

      this.setState({
          name: 'yank'
      })
      this.g()

      this.canMerge = false
      // 通过this.updateQueue合并出finalState
      const finalState = ...  
      // 此时canMerge 已经为false 故而走入时机更新逻辑
      this.setState(finaleState) 
  }

  // setTimeout 的合成更新实现  调用unstable_batchedUpdates
  class A extends React.Component {
      handleClick = () => {
          this.setState({x: 1})
          this.setState({x: 2})
          this.setState({x: 3})

          setTimeout(() => {
              ReactDOM.unstable_batchedUpdates(() => { // 强制合并
                  this.setState({x: 4})
                  this.setState({x: 5})
                  this.setState({x: 6})
              })
          }, 0)
      }   

      render() {
          return (<div onClick={this.handleClick}></div>)
      }
  }
  ```
  startTransition：
  startTransition 原理特别简单，有点像 React v17 中 batchUpdate 的批量处理逻辑。
  就是通过设置开关的方式，而开关就是 transition = 1 ，然后执行更新，里面的更新任务都会获得 transtion 标志。
  ————————————————
  原文链接：https://blog.csdn.net/weixin_43294560/article/details/121428955

# react 实现无感知的刷新

长时间的刷新 显示loading， 加载完成后隐藏  【Suspense】
短时间的刷新 不显示loading, 用户无感知， 不然loading会闪一下 【 useDeferredValue来实现】
<!-- useDeferredValue的应用： https://www.jb51.net/article/241012.htm -->
	

# redux： 订阅发布模式 【函数式编程】
  是单一的store  是一个状态树【树形结构】

# react-redux

  Provider


  const { useDispatch， selectedState  } = 'react-reudx'
  dispatch = useDispatch()

  subscribe 双向链表 对原有的subscribe进行了增强  next prev cb

  batchedUpdate 进行批量更新


# mobx： 观察者模式 【面向对象编程】
 Observable state 双向的

 mobx 可以允许多个store， 而且这些store里的store 是可以直接修改的，

 常用装饰器 【class组件】
 @observable 将一个变量变得可观察
 @observe 
 @action
 @computed
 @autoRun   与当前组件绑定 一旦任何值发生改变 就forceUpdate



```javascript
// 正常reducer
function reducer = (state) => {
  return {
    ...state,
    new: 1
  };
}

// 这种情况 会触发更新？？   ❌
function reducer = (state) => ({
  state.new = 1;
  return state; // 不会被执行， redux 会判断 当前的state 和 以前的state是否相等， 如果相等， 则不会执行。
})


```

打标记 placement delete  update raf


```javascript
 // react 的副作用抽离  异步可中断的逻辑  
function getName(user) {
  // 抽离出effect 这里try handle借鉴了 trycatch   这里的perform 类似throw new Error() 触发catch【不同点在于这里需要等待handle的返回值再继续执行 而catch 直接就终断了】
  name = perform user.name; // 这里perform 触发 handle 等到handle 执行结束 返回name 再继续执行
  return name 
}

function excuteFn(user) {
  myFriends.add(getName(user))
}

 try {
   excuteFn({name: '章三', id: xx})
 } handle(effect) {
   // 这里处理一些副作用 【不管是同步还是异步的请求】 返回后
   switch (effect) {
     case '章三':
       resume with 200;
       break;
    case '里斯':
       resume with 2000;
       break;
     default:
       break;
   }

 }

```

oldFiber 
 a b c d

vdom
b c d a

const lastPlacedIndex = 0;
b
1 > 0
lastPlacedIndex = 1;

c
2 > 1
lastPlacedIndex = 2

d 
3 > 2
lastPlacedIndex = 3

a 
0

0 < 3

a  ---> 3


# fiber的树的构建和挂载到dom树上的过程
老得fiber【current】和新的jsx的比较生成新的fiber【workinprogress】

beiginWork 创建此fiber树 递
completeWork 创建fiber节点的真实dom节点 stateNode， 并且构建effectList 【firstEffect、lastEffect, nextEffect】 归

commitRoot 处理effectList 根据effect的effectTag 【Placement, update， delete...】 进行处理相应的effect 


### 此处提到的effect 是副作用相关，
###  hostComponent 即表示将要对一个dom元素进行操作【增删查改】 
### functionComponent 表示 useEffect 和useLayoutEffect等hooks


# react 流程
render阶段
主要工作是构建Fiber树和生成effectList，我们知道react入口的两种模式会进入performSyncWorkOnRoot或者performConcurrentWorkOnRoot，而这两个方法分别会调用workLoopSync或者workLoopConcurrent

commit阶段
在render阶段的末尾会调用commitRoot(root);进入commit阶段，这里的root指的就是fiberRoot，然后会遍历render阶段生成的effectList，effectList上的Fiber节点保存着对应的props变化。之后会遍历effectList进行对应的dom操作和生命周期、hooks回调或销毁函数.


# 生命周期执行
  mount时： 
      首先会按照深度优先的方式，依次构建wip Fiber节点然后切换成current Fiber，
      在render阶段会依次执行各个节点的constructor、getDerivedStateFromProps/componnetWillMount、render，深度优先遍历的捕获阶段 【执行render 返回vdom  和currentfiber比较生成新的fiber】
      
      在commit阶段，也就是深度优先遍历向上冒泡的时候依次执行节点的componnetDidMount【根据EffectList构建真实的dom】


  update时：
    同样会深度优先构建wip Fiber树，在构建的过程中会diff子节点，
    在render阶段，如果返现有节点的变化，，那就标记这个节点Update Flag，然后执行getDerivedStateFromProps和render，
    
    在commit阶段会依次执行节点的getSnapshotBeforeUpdate、componnetDidUpdate

fiber的异步可中断会导致组件可能被重复渲染， 而异步可中断 实在render阶段才可触发， 所以render阶段的三个生命周期不推荐使用，
<!-- componentWillMount → UNSAFE_componentWillMount
componentWillReceiveProps → UNSAFE_componentWillReceiveProps
componentWillUpdate → UNSAFE_componentWillUpdate -->

<!-- 为什么 constructor、getDerivedStateFromProps还是推荐使用 或者会被重新调用？？？ -->

# 在react中触发状态更新的几种方式：
  ReactDOM.render
  this.setState
  this.forceUpdate
  useState
  useReducer

  HostRoot或者ClassComponent触发更新后，会在函数createUpdate中创建update，并在后面的render阶段的beginWork中计算Update。
  对于HostRoot或者ClassComponent会在mount的时候使用initializeUpdateQueue创建updateQueue，然后将updateQueue挂载到fiber节点上
  <!-- https://xiaochen1024.com/courseware/60b1b2f6cf10a4003b634718/60b1b36ecf10a4003b634724 -->
  FunctionComponent对应的Update，它和HostRoot或者ClassComponent的Update结构有些不一样： 



<!-- https://xiaochen1024.com/courseware/60b1b2f6cf10a4003b634718/60b1b36ecf10a4003b634724 -->
fiber.updateQueue.shared会同时存在于workInprogress Fiber和current Fiber，目的是为了防止高优先级打断正在进行的计算而导致状态丢失



# 优先级
<!-- https://xiaochen1024.com/courseware/60b1b2f6cf10a4003b634718/60b1b556cf10a4003b634727 -->
  ## schedule: 小顶堆
  <!-- 在Scheduler中使用MessageChannel实现了时间切片，然后用小顶堆排列任务优先级的高低，达到了异步可中断的更新 -->
  在Scheduler中有两个函数可以创建具有优先级的任务
      runWithPriority：以一个优先级执行callback，如果是同步的任务，优先级就是ImmediateSchedulerPriority
      scheduleCallback：以一个优先级注册callback，在适当的时机执行，因为涉及过期时间的计算，所以scheduleCallback比runWithPriority的粒度更细。

      在scheduleCallback中优先级意味着过期时间，优先级越高priorityLevel就越小，过期时间离当前时间就越近，var expirationTime = startTime + timeout;例如IMMEDIATE_PRIORITY_TIMEOUT=-1，那var expirationTime = startTime + (-1);就小于当前时间了，所以要立即执行。
      scheduleCallback调度的过程用到了小顶堆，所以我们可以在O(1)的复杂度找到优先级最高的task，不了解可以查阅资料，在源码中小顶堆存放着任务，每次peek都能取到离过期时间最近的task。
      scheduleCallback中，未过期任务task存放在timerQueue中，过期任务存放在taskQueue中。
      ​ 新建newTask任务之后，判断newTask是否过期，没过期就加入timerQueue中，如果此时taskQueue中还没有过期任务，timerQueue中离过期时间最近的task正好是newTask，则设置个定时器，到了过期时间就加入taskQueue中。

      ​ 当timerQueue中有任务，就取出最早过期的任务执行。

 
  ## Lane模型：
    Lane的和Scheduler是两套优先级机制，相比来说Lane的优先级粒度更细，Lane的意思是车道，类似赛车一样，在task获取优先级时，总是会优先抢内圈的赛道，Lane表示的优先级有以下几个特点。
  可以表示不同批次的优先级
  ​ 从代码中中可以看到，每个优先级都是个31位二进制数字，1表示该位置可以用，0代表这个位置不能用，从第一个优先级 NoLanes到OffscreenLane优先级是降低的，优先级越低1的个数也就越多（赛车比赛外圈的车越多），也就是说含多个1的优先级就是同一个批次。
    在Lane模型中如果一个低优先级的任务执行，并且还在调度的时候触发了一个高优先级的任务，则高优先级的任务打断低优先级任务，此时应该先取消低优先级的任务，因为此时低优先级的任务可能已经进行了一段时间，Fiber树已经构建了一部分，所以需要将Fiber树还原，这个过程发生在函数prepareFreshStack中，在这个函数中会初始化已经构建的Fiber树


# batchedUpdate 批量运行 合并处理setstate
  之前的版本 在react的合成事件和生命周期中会批量合并， 在原生和setTimeout中不会

  在Concurrent mode下，都会合并为一次更新，根本原因在如下一段简化的源码，如果多次setState，会比较这几次setState回调的优先级，如果优先级一致，则先return掉，不会进行后面的render阶段。


<!-- ???? -->
  ​ 那为什么在Concurrent mode下，在setTimeout回调多次setState优先级一致呢，因为在获取Lane的函数requestUpdateLane，只有第一次setState满足currentEventWipLanes === NoLanes，所以他们的currentEventWipLanes参数相同，而在findUpdateLane中schedulerLanePriority参数也相同（调度的优先级相同），所以返回的lane相同。

# Suspense
  ​ Suspense可以在请求数据的时候显示pending状态，请求成功后展示数据，原因是因为Suspense中组件的优先级很低，而离屏的fallback组件优先级高，当Suspense中组件resolve之后就会重新调度一次render阶段，此过程发生在updateSuspenseComponent函数中。


  <!-- Fiber为concurrent架构提供了数据层面的支持。
      Scheduler为concurrent实现时间片调度提供了保障。
      Lane模型为concurrent提供了更新的策略
      上层实现了batchedUpdates和Suspense -->



在fiber的生成和更新中 如果节点子节点只有文本节点的时候， 不会执行beginWork和completeWork【优化性能】
 节点子节点只有文本节点的时候 isDirectTextChild 为true
efftectList 其实也是优化， 只把有变化的节点形成链表， 在commit阶段只遍历effectList链表， 不需要整个feiber树遍历


<!-- ???? -->
为什么有了schedule优先级 还需要lane优先级更细粒度的概念。 批的概念


# concurrent 并发模式

什么因素制约快速响应？ 计算能力【cpu瓶颈 长任务超过16.6ms会阻塞布局和渲染】 和网络延迟【IO瓶颈  】
 16.6ms js脚本执行-》 样式布局-》样式绘制

cpu瓶颈: 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。

IO瓶颈: 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

 ===》 异步可中断 带有优先级解决     io==》 Suspense解决

 schedule 产生更新 reconciler 决定需要更新什么组件【diff】 renderer 将更新的组件渲染到页面 


进程 线程 协程 纤程【纤程 fiber也是协程的一种实现】 js中协程的实现还有generator
 <!-- 为什么异步可中断不使用generator 来实现异步可中断呢 ？ -->
react的异步可中断有2个目的： 1. 异步可中断 2. 优先级【高优先级可以打断低优先级】

1. generator 和asycn await一样 的使用会有传染性的
2. generator可以达到异步可中断， 但是不可以实现优先级的概念 。


首屏的时候 首先会创建FiberRootNode 【createFiber】
  首次执行ReactDOM.render会创建fiberRootNode（源码中叫fiberRoot）和rootFiber。其中fiberRootNode是整个应用的根节点，rootFiber是<App/>所在组件树的根节点。
  之所以要区分fiberRootNode与rootFiber，是因为在应用中我们可以多次调用ReactDOM.render渲染不同的组件树，他们会拥有不同的rootFiber。但是整个应用的根节点只有一个，那就是fiberRootNode。

  renderRootSync
  performSyncWorkOnRoot | performConcurrentWorkOnRoot
  performUnitOfWork
  beiginWork --> reconcileChildren  --> createFiber
  completeWork -->  createInstance 【保存在stateNode中】 --> appendAllChildren【将所有子节点已经构建好的dom合并到父身上，这样当completeWork到App的时候已经有了一颗完整的dom树】

<!-- 我们知道，mount时，fiber.stateNode === null，且在reconcileChildren中调用的mountChildFibers不会为Fiber节点赋值effectTag。那么首屏渲染如何完成呢？
fiber.stateNode会在completeWork中创建
这个问题的答案十分巧妙：假设mountChildFibers也会赋值effectTag，那么可以预见mount时整棵Fiber树所有节点都会有Placement effectTag。那么commit阶段在执行DOM操作时每个节点都会执行一次插入操作，这样大量的DOM操作是极低效的。
为了解决这个问题，在mount时只有rootFiber会赋值Placement effectTag，在commit阶段只会执行一次插入操作。 -->

# commitRoot
    commitBerforeMutationEffects 【beforeMuation阶段】 执行DOM操作前  【此时还没页面可见的更新】
      处理DOM节点渲染/删除后的 autoFocus、blur 逻辑。
      调用getSnapshotBeforeUpdate生命周期钩子。
      调度useEffect【异步调度】useEffect需要先调度，在Layout阶段完成后再异步执行。
      <!-- https://react.iamkasong.com/renderer/beforeMutation.html#%E8%B0%83%E5%BA%A6useeffect -->

    commitMutationEffects  【mutation阶段】执行DOM操作
      遍历EffectList 判断effectTag 对节点进行更新，  
      调用useEffect的销毁函数， 即useEffect中的return
      执行componentWillUnmount【此时这里面还是可以获取老的fiber数据】
      解绑ref 增删改查节点
      mutation阶段会执行useLayoutEffect hook的销毁函数。

    【mutation 之后 layout 之前】
   ## root.current = finishedWork   此时fiber树双缓存的切换 即将workinProgress树变为current

    commitLayoutEffect 【layout阶段】 执行DOM操作后 
      执行useLayoutEffect【同步执行】 即调用useLayoutEffect hook的回调函数，调度useEffect的销毁与回调函数
      赋值ref
      调用componentDidMount componentDidUpdate【同步执行】
      this.setState(updater, [callback]) 第二个参数callback会在layout阶段被执行，我们可以用该函数来监听渲染是否完成：

<!-- 与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。 可见，useEffect异步执行的原因主要是防止同步执行时阻塞浏览器渲染。-->

# jsx 
babel 本身是识别不了的 需要依靠插件来识别： 
@babel/plugin-transform-react-jsx 
@babel/plugin-transform-react-jsx 将jsx转换为React.createElement(type, config, children )

  比如如下信息就不包括在JSX中：
  组件在更新中的优先级
  组件的state
  组件被打上的用于Renderer的标记
 --- 这些内容都包含在Fiber节点中。

<!--  什么是 ReactElement 什么是ReactComponent??? -->
ReactElement是调用React.createElement()方法的结果
ReactComponent对于class组件来说是class组件本身， fun组件也是func本身, 是React.createElement()方法的第一个参数, 即type参数


```javascript
React.createElement(type, key, config, children) {
// type ==> div p span CompName
// config ==> props
// children ==> 孩子节点

return ReactElement(type, config)
}

ReactElement(type, key, ref, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE, // 依照次来判断是否合法reactElement
    type: type,
    ref: ref,
    props: props
  }
  return element
}
```

 
打标记使用二进制来保存 ？？？
const NoEffect  =             0b0000000000000000
const Placement =             0b0000000000000010;
const Update =                0b0000000000000100;
const PlacementAndUpdate =    0b0000000000000110;

<!-- 为什么使用二进制来保存标记呢？ -->
原因是当一个节点需要插入到dom中， 同时又需要进行属性的更新时候，  这时候次节点就需要Placement,Upadate这2个tag, 使用二进制可以更好的计算出最终的tag【PlacementAndUpdate】
Placement |= Update  


<!-- ???? -->
completeWork  ？？？
FunctionComponent 和很多的是么有completeWork的逻辑的 不做处理直接return
```javascript
unction completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent: {
      // ...省略
      return null;
    }
    case HostRoot: { // 原生DOM组件对应的Fiber节点
      // ...省略
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      // ...省略
      return null;
    }
  // ...省略
  }
}

```

HostRoot和ClassComponent是有completeWork的逻辑的



# update 更新流程

```javascript
 function createWorkInProgress(current, pendingProps) {
   var workInProgress = current.alternate; // 首屏不存在
   if(workInProgress === null) {
     // 首次
   } else {
     // 更新
   }
 }
// createWorkInProgress(root.current, null) 首次调用 root.current tag:3 即currentfiber
```

beginWork  tag3 rootFiber

updateFunctionComponent  返回jsx对象

renderWithHooks

reconcileChildren

renconcileChildFibers

completeWork 


performUnitOfWork  打标记 形成effectList



状态更新： 创建Update对象， 从fiber到root 调度更新 render commit
Update是在某个fiber节点上的 而优先级是全局的 
dispatchAction -> 
<!-- 每次状态更新都会创建一个保存更新状态相关内容的对象，我们叫他Update。在render阶段的beginWork中会根据Update计算新的state。
state的变化在render阶段产生与上次更新不同的JSX对象，通过Diff算法产生effectTag，在commit阶段渲染在页面上。
渲染完成后workInProgress Fiber树变为current Fiber树，整个更新流程结束。 -->

# Update的计算
react中有3种组件可以触发update更新,
    1. HostRoot -- ReactDom.render()
    2. ClassComponent -- this.setState  | this.forceUpdate
    3. FunctionComponent -- useState | useReducer

  这三种不同的组件存在2种不同的Update结构： ClassComponent和HostRoot共用一套， FunctionComponent 单独使用一套。
  ## update ClassComponent和HostRoot 
  结构
  ```javascript
  const update: Update<*> = {
    eventTime,
    lane,
    suspenseConfig,
    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  };
  ```
  update 存放在fiber的updateQueue中
  ```javascript
  const queue: UpdateQueue<State> = {
      baseState: fiber.memoizedState, // 本次更新前该Fiber节点的state，Update基于该state计算更新后的state
      baseUpdate: null, // 低于当前优先级，所以他及其后面的所有Update会被保存在baseUpdate中作为下次更新的Update, 即遍历找到的第一个的update的优先级不足再本次更新的以及他后面的所有upadte都会放入baseUpdate用来保证状态依赖的连续性
      //  A1 B2 C1 D2    ==|  
      // 第一次： baseState: A1     memoizedState: A1 C1  因为B2优先级比较低 在第一次的渲染中被中断， 故将B2以及后面的update全部放入baseUpdate, 供下次的更新， 下次更新的优先级会下降到2 即会执行B2 C1 D2;  这里面的C1会执行2次， 未来防止更新之间的依赖问题。
      // 第二次： baseState: A1 B2 C1 D2   memoizedState: A1 B2 C1 D2 

      // 更新过程中react并不会保证渲染的状态的过程

      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { // 新的更新
        pending: null, // 触发更新时，产生的Update会保存在shared.pending中形成单向环状链表。当由Update计算state时这个环会被剪开并连接在lastBaseUpdate后面。
      },
      effects: null, // 数组。保存update.callback !== null的Update
    };
  ```
   当遍历完成后获得的state，就是该Fiber节点在本次更新的state（源码中叫做memoizedState）。

 注意： 每次更新的时候 UpdateQueue 在workInProgress fiber上保存一份，同时也会在currentFiber节点上保存一份
 <!-- 在workInProgress.alternate = UpdateQueue -->
 这是为了防止第优先级的任务被中断的时候会丢失， 有了双层的fiber， 当被打断时候，可以从currentFiber节点上复制当前Update, 恢复低优先级的Update后, 先更新高优先级的Update。
 即：实际上shared.pending会被同时连接在workInProgress updateQueue.lastBaseUpdate与current updateQueue.lastBaseUpdate后面。
 当render阶段被中断后重新开始时，会基于current updateQueue克隆出workInProgress updateQueue。由于current updateQueue.lastBaseUpdate已经保存了上一次的Update，所以不会丢失。
<!-- https://react.iamkasong.com/state/priority.
html#%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E7%8A%B6%E6%80%81%E6%AD%A3%E7%A1%AE -->

 react 并不保证中间状态是正确的【不同设备中间页面展示也许不一样】， 但最终结果一样



 # useRef
 ## 用法： 1. 对象 ref.current  2. 函数 ref=(dom => console.log(dom))  3. string【被废弃】
 ## 实现 
 ```javascript
 const ref = { current: initialValue}
 hook.memoizedState =  ref
 ```


# useCallback useMemo的实现
 ```javascript
 useCallback hook.memoizedState = [callback, nextDeps]
 useMemo    hook.memoizedState = [nextValue, nextDepts]
 ```
