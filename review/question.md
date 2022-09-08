<!-- 说一说JS实现异步的方法？ -->
  # 得分点: 
  回调函数、事件监听、setTimeout、Promise、生成器Generators/yield、async/await 

  # 标准回答 
  所有异步任务都是在同步任务执行结束之后，从任务队列中依次取出执行。 
    ## 回调函数
    是异步操作最基本的方法，比如AJAX回调，回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间高度耦合，使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。此外它不能使用 try catch 捕获错误，不能直接 return。
    ## Promise
    包装了一个异步调用并生成一个Promise实例，当异步调用返回的时候根据调用的结果分别调用实例化时传入的resolve 和 reject方法，then接收到对应的数据，做出相应的处理。Promise不仅能够捕获错误，而且也很好地解决了回调地狱的问题，缺点是无法取消 Promise，错误需要通过回调函数捕获。 
    ## Generator 
    函数是 ES6 提供的一种异步编程解决方案，Generator 函数是一个状态机，封装了多个内部状态，可暂停函数, yield可暂停，next方法可启动，每次返回的是yield后的表达式结果。优点是异步语义清晰，缺点是手动迭代`Generator` 函数很麻烦，实现逻辑有点绕 
    ## async/awt  是generator的语法糖
    是基于Promise实现的，async/awt使得异步代码看起来像同步代码，所以优点是，使用方法清晰明了，缺点是awt 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 awt 会导致性能上的降低，
    <!-- 代码没有依赖性的话，完全可以使用 Promise.all 的方式。  -->
  
  # 加分回答
    JS 异步编程进化史：callback -> promise -> generator/yield -> async/awt。 
    
    <!-- async/awt函数对 Generator 函数的改进，体现在以下三点：  -->
    - 内置执行器。 Generator 函数的执行必须靠执行器，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
    - 更广的适用性。 yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 awt 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。 
    - 更好的语义。 async 和 awt，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，awt 表示紧跟在后面的表达式需要等待结果。 目前使用很广泛的就是promise和async/awt




<!-- 说一说数组去重都有哪些方法？ -->
# 得分点 对象属性、new Set() 、indexOf、hasOwnProperty、reduce+includes、filter 
# 标准回答 
  第一种方法：利用对象属性key排除重复项：遍历数组，每次判断对象中是否存在该属性，不存在就存储在新数组中，并且把数组元素作为key，设置一个值，存储在对象中，最后返回新数组。这个方法的优点是效率较高，缺点是占用了较多空间，使用的额外空间有一个查询对象和一个新的数组
  
  第二种方法：利用Set类型数据无重复项：new 一个 Set，参数为需要去重的数组，Set 会自动删除重复的元素，再将 Set 转为数组返回。这个方法的优点是效率更高，代码简单，思路清晰，缺点是可能会有兼容性问题 
  
  第三种方法：filter+indexof 去重：这个方法和第一种方法类似，利用 Array 自带的 filter 方法，返回 arr.indexOf(num) 等于 index 的num。原理就是 indexOf 会返回最先找到的数字的索引，假设数组是 [1, 1]，在对第二个1使用 indexOf 方法时，返回的是第一个1的索引0。这个方法的优点是可以在去重的时候插入对元素的操作，可拓展性强。 
  
  第四种方法：这个方法比较巧妙，从头遍历数组，如果元素在前面出现过，则将当前元素挪到最后面，继续遍历，直到遍历完所有元素，之后将那些被挪到后面的元素抛弃。这个方法因为是直接操作数组，占用内存较少。 
  
  第五种方法：reduce +includes去重：这个方法就是利用reduce遍历和传入一个空数组作为去重后的新数组，然后内部判断新数组中是否存在当前遍历的元素，不存在就插入到新数组中。这种方法时间消耗多，内存空间也有额外占用。 方法还有很多，常用的、了解的这些就可以 

  ```javascript
    Array.reduce((pre, cur) => {
      if(!pre.includes[cur]) {
        pre.push(cur)
      }
    }, [])
  ```
  
  ## 加分回答 
  以上五个方法中，在数据低于10000条的时候没有明显的差别，高于10000条，第一种和第二种的时间消耗最少，后面三种时间消耗依次增加，由于第一种内存空间消耗比较多，且现在很多项目不再考虑低版本浏览器的兼容性问题，所以建议使用第二种去重方法，简洁方便。

<!-- 说一说null 和 undefined 的区别，如何让一个属性变为null -->
解题思路
# 得分点 
操作的变量没有被赋值、全局对象的一个属性、函数没有return返回值、值 `null` 特指对象的值未设置 undefined == null、undefined !== null 
# 标准回答 
 undefind 是全局对象的一个属性，当一个变量没有被赋值或者一个函数没有返回值或者某个对象不存在某个属性却去访问或者函数定义了形参但没有传递实参，这时候都是undefined。undefined通过typeof判断类型是'undefined'。undefined == undefined undefined === undefined 。 null代表对象的值未设置，相当于一个对象没有设置指针地址就是null。null通过typeof判断类型是'object'。null === null null == null null == undefined null !== undefined undefined 表示一个变量初始状态值，而 null 则表示一个变量被人为的设置为空对象，而不是原始状态。在实际使用过程中，不需要对一个变量显式的赋值 undefined，当需要释放一个对象时，直接赋值为 null 即可。 让一个变量为null，直接给该变量赋值为null即可。 

 ## 加分回答 
 null 其实属于自己的类型 Null，而不属于Object类型，typeof 之所以会判定为 Object 类型，是因为JavaScript 数据类型在底层都是以二进制的形式表示的，二进制的前三位为 0 会被 typeof 判断为对象类型，而 null 的二进制位恰好都是 0 ，因此，null 被误判断为 Object 类型。 对象被赋值了null 以后，对象对应的堆内存中的值就是游离状态了，GC 会择机回收该值并释放内存。因此，需要释放某个对象，就将变量设置为 null，即表示该对象已经被清空，目前无效状态。

 <!-- ：1.介绍观察者模式
1条回答
Q：2.介绍中介者模式观察者和订阅-发布的区别，各自用在哪里 -->

<!-- 为什么useState是数组结构的形式返回的，能不能以Object的形式返回 -->
数组的返回形式 解构时按照顺序就可以获取到相应的值， 对象的话，解构时需要用返回相同的名字来获取， 当页面多次定义时候，避免解构的变量重复， 每个都需要重新命名， 这样太麻烦， 不利于开发。
https://cloud.tencent.com/developer/article/1987941

<!-- cors 为什么分简单请求和复杂请求 -->
https://wenku.baidu.com/view/01946f08de36a32d7375a417866fb84ae45cc304.html


<!-- hooks 循环中为什么不能用 -->


<!-- 说说浏览器缓存，强缓存应该设置多久呢 -->


<!-- 说一下浏览器垃圾回收机制？ -->
得分点 栈垃圾回收、堆垃圾回收、新生区老生区、Scavenge算法、标记-清除算法、标记-整理算法、全停顿、增量标记 

## 标准回答 浏览器垃圾回收机制根据数据的存储方式分为栈垃圾回收和堆垃圾回收。 
 栈垃圾回收的方式非常简便，当一个函数执行结束之后，JavaScript 引擎会通过向下移动 ESP 来销毁该函数保存在栈中的执行上下文，遵循先进后出的原则。 
 堆垃圾回收，当函数直接结束，栈空间处理完成了，但是堆空间的数据虽然没有被引用，但是还是存储在堆空间中，需要垃圾回收器将堆空间中的垃圾数据回收。为了使垃圾回收达到更好的效果，根据对象的生命周期不一样，使用不同的垃圾回收的算法。
   在 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。新生区中使用Scavenge算法，老生区中使用标记-清除算法和标记-整理算法。
   
  ## 加分回答 
   Scavenge算法： 1. 标记：对对象区域中的垃圾进行标记 2. 清除垃圾数据和整理碎片化内存：副垃圾回收器会把这些存活的对象复制到空闲区域中，并且有序的排列起来，复制后空闲区域就没有内存碎片了 3. 角色翻转：完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域，这样就完成了垃圾对象的回收操作，同时这种角色翻转的操作还能让新生代中的这两块区域无限重复使用下去 
    
  标记-清除算法： 1. 标记：标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。 2. 清除：将垃圾数据进行清除。 3. 产生内存碎片：对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存。 
  
  标记-整理算法 1. 标记：和标记 - 清除的标记过程一样，从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素标记为活动对象。 2. 整理：让所有存活的对象都向内存的一端移动 3. 清除：清理掉端边界以外的内存 V8 是使用副垃圾回收器和主垃圾回收器处理垃圾回收的，
  不过由于 JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做全停顿。 为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为增量标记（Incremental Marking）算法

<!-- React生命周期的各个阶段是什么？ -->
  得分点： constructor、componentDidMount、componentDidUpdate、componentWillUnmount、getDerivedStateFromProps、shouldComponentUpdate、getSnapshotBeforeUpdate、componentWillUpdate。 
  
  ## 标准回答 
  React的生命周期中常用的有：constructor，负责数据初始化。render，将jsx转换成真实的dom节点。componentDidMount，组件第一次渲染完成时触发。componentDidUpdate，组件更新完成时触发。componentWillUnmount，组件销毁和卸载时触发。不常用的有：getDerivedStateFromProps，更新state和处理回调。shouldComponentUpdate，用于性能优化。getSnapshotBeforeUpdate，替代了componentWillUpdate。 加分回答 React的生命周期中有常用的和不常用的。 常用的有： - constructor()： 完成了数据的初始化。注意：只要使用了constructor()就必须写super()，否则this指向会出错。 - render()： render()函数会将jsx生成的dom插入到目标节点中。在每次组件更新时，react通过diff算法比较更新前和更新之后的dom节点，找到最小的有差异的dom位置并更新，花费最小的开销。 - componentDidMount()： 组件第一次渲染完成，此时dom节点已经生成，在这里调用接口请求，返回数据后使用setState()更新数据后重新渲染。 - componentDidUpdate(prevProps,prevState)： 组件更新完成。每次react重新渲染之后都会进入这个生命周期，可以拿到更新之前的props和state。 - componentWillUnmount()： 在这个生命周期完成组件的数据销毁和卸载，移除所有的定时器和监听。 不常用的有： - getDerivedStateFromProps(nextProps,prevState)： 代替老版的componentWillReceiveProps()。官方将更新state与触发回调重新分配到了componentWillReceiveProps()中，让组件整体的更新逻辑更加清晰，并且在当前生命周期中，禁止使用this.props，强制让开发者们通过比较nextProps和PrevState去保证数据的正确行为。 - shouldComponentUpdate()： return true可以渲染，return false不重新渲染。为什么会出现这个SCU生命周期？主要用于性能优化。也是唯一可以控制组件渲染的生命周期，在setState之后state发生改变组件会重新渲染，在当前生命周期内return false会阻止组件的更新。因为react中父组件重新渲染导致子组件也重新渲染，这时在子组件的当前生命周期内做判断是否真的需要重新渲染。 - getSnapshotBeforeUpdate(prevProps,prevState)： 代替componentWillUpdate()，核心区别在于getSnapshotBeforeUpdate()中读取到的dom元素状态是可以保证和componentDidUpdate()中的一致。


<!-- 链接：https://www.zhihu.com/question/343414547/answer/2161764988 -->
  会修改浏览器地址栏的方法（仅修改了地址栏显示,不会触发页面刷新）： 会添加到浏览器路由记录里面
  history.pushState() //H5添加的 用于在浏览历史中添加记录
  history.replaceState() //H5添加的 用于在浏览历史中修改记录
  location.hash //包含块标识符的DOMString，开头有一个“#”。

