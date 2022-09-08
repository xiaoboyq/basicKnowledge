// 
function _instanceof(L, R) {
  let O = L.__proto__;
  let R = R.prototype;

  while(ture) {
    if(L === O) return true
    if(L === null) return false
    L = L.__proto__;
  }
}

// 1. Array.isArray方法
// <!-- Array.isArray(value) -->
// 2. Object.prototype.toString.call() 方法 :
//    <!-- Object.prototype.toString.call(arr) == '[object Array]' // es3语法 所有浏览器都支持 -->
// 3. instanceof : 
//    <!-- arr instanceof Array // true 但是一般js不用instanceof来检测数组  -->
//    <!-- instanceof 运算符可以用来判断某个构造函数的prototype属性所指向的对象是否存在于另外一个要检测对象的原型链， instanceof 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 Array 构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数-->
