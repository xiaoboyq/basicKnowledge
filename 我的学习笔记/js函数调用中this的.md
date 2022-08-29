
函数调用方法-- this指向 


#  四种函数调用方法
```javascript

//1. 一般形式的函数调用
func(p1, p2) 

//2. 作为对象的方法调用
 obj.child.method(p1, p2)

//3. 使用 call 和 apply 动态调用
func.call(context, p1, p2) // 先不讲 apply

//4. 使用构造函数调用函数
// 构造函数:
function MyFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}
// This    creates a new object
var x = new MyFunction("John","Doe");
x.firstName;  

```



# 问题 执行的obj.foo()和bar()的this指向为什么不一样
```javascript
    var obj = {
    foo: function(){
        console.log(this)
    }
    }

    var bar = obj.foo
    obj.foo() // 打印出的 this 是 obj
    bar() // 打印出的 this 是 window
```

# 