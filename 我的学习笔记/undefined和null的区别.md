`undefined`和`null`的区别： 未定义  空值

如果我们在赋值时，采用的是 `undefined`或者`null`，那会有什么区别呢？



```javascript
{
    let [a, b = '默认值'] = ['a的赋值', undefined]; //b 虽然被赋值为 undefined，但是 b 会采用默认值
    console.log(a + ',' + b); //输出结果：a的赋值,默认值
}

{
    let [a, b = '默认值'] = ['a的赋值', null];  //b 被赋值为 null
    console.log(a + ',' + b); //输出结果：a的赋值,null
}


```

上方代码分析：

- undefined：相当于什么都没有，此时 b 采用默认值。

- null：相当于有值，但值为 null。 null 最好的理解是object的占位符 
//从逻辑角度来看，null值表示一个空对象指针，而这正是使用typeof操作符检测null值时会返回“object”的原因。
//typeof(null)的值是"object"