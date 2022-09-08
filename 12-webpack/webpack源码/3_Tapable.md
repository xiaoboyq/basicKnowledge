Compiler 和 Compilation 都是继承 Tapable
```javascript
class Compiler extends Tapable {}
class Compilation extends Tapable {}
```
Tapable： 发布订阅模式
webpack的本质
webpack可以将其理解： 是一种基于事件流的编程范式，一系列的插件运行。

# Tapable
是一个类似于nodejs中 EvenEmitter的库， 主要是控制钩子函数的发布和订阅， 控制着webpack的插件系统。

Tapable库提供了很多的hook钩子, 为插件提供挂载的钩子， 每个钩子也是代表一个事件的节点
