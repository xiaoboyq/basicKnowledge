# hoc

## 怎么写一个高阶组件
1. 普通方式
2. 装饰器
3. 多个高阶组件的组合

 装饰器它其实就是接受一个原有的函数， 在装饰器里面做一个类似于劫持的事情， 可以做一些自己的事情， 然后返回一个新的函数。 

## 高阶组件能做什么？
1. 属性代理
 1.1 操作props 【修改或者增加一些新的props】
 1.2 操作组件的实例
2.继承/劫持