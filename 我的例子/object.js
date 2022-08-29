// object的 属性
// var person = {
//     // age: 18   在此直接创建定义一个新的属性时候 configurable enumerable writable默认为true
// };
//  Object.defineProperty(person, 'name', { 
//     //   当用 Object.defineProperty 来创建定义一个新的属性【如name】时，
//     //  如果不指定 configurable enumerable writable 的属性都将是false
//     //  当然如果不是新定义的 只是修改对象中已经存在的属性的特性时候， 不会由此限制 即不会都是false
//      value: 'nuli'
//  })

//  console.log(person.name); // nuli
//  delete person.name
//  console.log(person.name) // nuli 


var str = 'Hello World';
console.log(str.length);
str.length=2; // 原始字符串会转换成对象字符串new String("Hello World"),然后赋值length属性值为2
console.log(str) // 'hello World'
console.log(str.length) // 11

// 这是要因为当我们在为str赋值属性值的时候，原始字符串会转换成对象字符串new String("Hello World"),然后赋值length属性值为2，
// 就会产生一个截串，之后就将这个字符串对象给删除，当我们再次访问console.log(str)的时候，就会输出原来的"Hello World"字符串！
// 而且我们也可以再次输出str.length属性验证，值应该为11，而不是2，当然这个str.length实际上是new String("Hello World").length值为11；
