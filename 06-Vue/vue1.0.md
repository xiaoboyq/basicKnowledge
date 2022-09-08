vue1.0  会有大量的watcher出现，每一个数据都有一个wathcer绑定 
 当程序太大时候就会崩了。 性能问题

所以 2.0  出现虚拟dom 一个组件只有一个watcher