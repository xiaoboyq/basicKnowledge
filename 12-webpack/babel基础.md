# babel @bable/core 

1、babel-cli （babel命令行的一个工具）
2、babel-preset-env （内置包，能把ECMAScript进行转换为es5）
3、browserify （打包工具，比webpack简单）


babel是webpack和babel的沟通桥梁
# @babel/preset-env 
preset-env会把es6转化为es5 【是面向未来的】

 <!-- 因为runtime不做这些语法的转换，它只能算是一个转换帮助类、一个自动添加polyfill的工具，es6语法转换我们用preset-env，所以我们把preset-env加上，然后把polyfill去掉,最后runtime配置还原到默认配置， -->

# @babel/polifill @babel/plugin-transform-runtime
@babel/polifill会将一些高级语法 比如promise转化为window.promise 将高级语法放到全局变量中
 polifill 体积很大 一般设置 "useBuiltIns": "usage", // 按需加载   来自动引入需要的polifill
    <!-- // npm i @babel/polyfill -D  来兼容es高级的语法 es6以上的  
      // @babel/polyfill 是以全局变量的方式注入的 例如Promise   ==> window.Promise
      // 从而让低端浏览器认识高级语法，  也因此@babel/polyfill 会造成全局对象的污染 -->

@babel/plugin-transform-runtime 
      <!-- //@babel/plugin-tansform-runtime 对比@babel/polyfill  
      //【 优点：】 不会造成全局污染， 【缺点：】因此也不会对类似Array.prototype.includes()进行polifill   用transform-runtime插件添加的polyfill都是带有 "_"符号的变量（可以看成局部变量），是不会污染全局变量的
      //npm i @babel/plugin-transform-runtime -D   npm i@babel/runtime -S -->
  <!-- import _Promise from "@babel/runtime-corejs2/core-js/promise"; -->
```javascript
// .babelrc 文件
{
  "presets": [
    [
      "@babel/preset-env" , {
        "useBuiltIns": "usage",  //有了按需加载 会自动引入polyfill
        "corejs": 2
      }
    ]
  ],
  "plugins": [["@babel/plugin-transform-runtime", {
    
  }]]
}
```


@babel/parser 
parser.parse(content, {}) 

@babel/traverse 可以用来遍历更新@babel/parser生成的AST


@babel/generator