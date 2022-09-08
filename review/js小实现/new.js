// new 实现的过程
// 1. 创建一个对象 
// 2. 将改对象的__ptoto__ 指向函数的原型对象上 绑定原型
// 3. 利用call或者apply来改变this的指向 来获取属性
// 4. 返回 新的对象obj
function _new() {
  let obj = {};
  const Constrctor = [].shift.call(arguments)
  obj.__proto__ = Constrctor.prototype;
  let ret = Constrctor.apply(obj, arguments)
  return  typeof ret === "object" && ret !== null ? ret : obj
}