function Parent(name, age) {
  this.name = name
  this.age = age
}


function Child(...args) {
  const [name, age, size] = args
  Parent.apply(this, [name, age])
  this.body = size
}

const child1 = new Child('章三', 19, 'big')
const child2 = new Child('里斯', 29, 'middle')

console.log(child1)
console.log(child2)

// 问题
// 属性或者方法想被继承的话，只能在构造函数中定义。而如果方法在构造函数内定义了，那么每次创建实例都会创建一遍方法，多占一块内存。
