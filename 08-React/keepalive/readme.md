用处: react中封装对于路由组件保持alive， 类似于vue的keepAlive组件， 在不刷新的情况下， 针对路由跳转， 保持每一个页面的当前的运行状态。

# AliveScope 用于包裹需要保持运行组建的父组件， 建议包裹到根组件，这样可以对全局组件进行使用。

# KeepAlive 用于对需要保持活跃的组件 加上id标记当前组件
<KeepAlive id={window.location.pathname}><div>xxx</div></KeepAlive>;

具体用法见例子