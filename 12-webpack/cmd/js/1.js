define([
  './js/2.js',
], function(m2) {
  // './2.js' =>document.createElement('script')
  // define 动态创建jsonp来异步获取数据
  // 而在commonjs中是通过同步获取数据的 nodejs的fs 可以获取数据 浏览器没有fs模块

  // 提示：exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。
  console.log(m2)
});