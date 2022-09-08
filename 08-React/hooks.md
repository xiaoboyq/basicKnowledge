
# 什么是react hooks。 有什么优势？
可以在不写class组件的情况下，使用state与其他react特性

# 为什么不写class 而倾向于hooks的写法？ 即 hooks的优势 即 class的缺陷

## class 组件的缺陷
1. 组件间的状态逻辑很难复用。
组件间如果有state的逻辑是相似的，class模式下基本上都是用高阶组件来解决的
虽然能解决问题，但是我们需要在组件外部再包一层元素， 会导致层级非常冗余。
2. 复杂业务的有状态组件会越来越复杂。
3. 定时器的操作， 会被分散在多个区域
例如: 监听或者定时器 相同一个逻辑业务 分割到不同生命周期中。
didMount 中监听
document.addEventListener()
willUnMount中 取消监听
document.removeEventListener()
4. this的指向问题

## hooks的优点
1. 利于业务逻辑的封装和拆分， 可以非常自由的组合各种自定义hooks.【自己封装的用到了reacthooks的公共逻辑】
2. 可以在无需修改组件结构的情况下，复用状态逻辑【不需要高阶组件 多层级包装】
3. 定时器 监听啊 可以被聚合到同一块代码下 useEffect(()=>{} return xxx); 


### hooks使用注意事项
1. 只能在函数内部的最外层调用hooks, 不要在循环，条件判断或者子函数中调用【取值会出现偏移， 跟state实现有关， 标记/游标】。
2. 只能在react的函数组件中调用hooks, 不要在其他的js函数中调用。








# useEffect和 useLayoutEffect 的区别
## useEffect
它跟class组件中的componentDidMount、componentDidUpdate和component WillUnMount具有相同的用途，只不过被合并成了一个API。

异步调度useEffect；同步执行useLayoutEffect

## useLayoutEffect
其与useEffect函数相同，但它内部的更新计划会在浏览器执行绘制之前同步刷新。
使用useLayoutEffect函数的页面更新的比较卡顿，因为useLayoutEffect会阻塞浏览器的渲染。所以我们尽可能使用标准的 useEffect 以避免阻塞视觉更新。
注意：除非要修改DOM并且不让用户看到修改DOM的过程，才考虑使用useLayoutEffect，否则应当使用useEffect。


# createRef 与 useRef 的区别
useRef 在 react hook 中的作用, 正如官网说的, 它像一个变量, 类似于 this , 它就像一个盒子, 你可以存放任何东西. createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。

useRef 不仅仅是用来管理 DOM ref 的，它还相当于 this , 可以存放任何变量.

useRef可以很好的解决闭包带来的不方便性.你可以在各种库中看到它的身影, 比如 react-use 中的 useInterval , usePrevious ……

值得注意的是，当 useRef 的内容发生变化时,它不会通知您。更改.current属性不会导致重新呈现。因为他一直是一个引用 .


# useCallBack useMemo


useCallback 是 类似于 类组件中 使用箭头函数定义函数或者 bind处理this时的结果； class组件状态改变时候只会重新调用render方法以及相关生命周期，箭头和bind处理使得 render里面调用的方法实例化一次【单例模式】；
在函数式组件中， 每次状态更新，都会重新调用本函数；
useCallback可以在多次重渲染中仍然保持函数的引用

在
```javascript
construct() {
  this.xxx.bind(this);
}
// 
const xxx = () => {

}

<==>
const xxx = useCallback(()=>{

},['依赖项'])

```

# useReducer


# useState

