# ES5实现cons

http://blog.sina.com.cn/s/blog_15a340f5a0102zsh6.html



#  es5 实现 let和const 
https://www.cnblogs.com/bxtfdxg/p/14885568.html


## let 
我们可以通过匿名函数和闭包的形式来模拟let

```javascript

(function(){
  let c = 3;
  console.log(c)
})()

```
如上面的代码，用匿名函数的作用域来模拟块级作用域，将用到let的代码放到匿名函数中，就不会造成变量污染了


## const 

```javascript
function _const(key, value) {
  window[key] = value;
  Object.defineProperty(window, key, {
    writable: false,
    configurable: false,
    enumerbale: false,
    get: function() {
      return value
    },

    set: function(newValue) {
      if(newValue ! == value) {
        throw TypeError('const 变量不可改变')
      } else {
        return value
      }
    }
  })
}
```
