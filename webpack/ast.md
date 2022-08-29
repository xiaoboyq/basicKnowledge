<!-- https://juejin.cn/post/6845166891015602190 -->
<!-- 解析：将代码转换成 AST
词法分析：将代码(字符串)分割为token流，即语法单元成的数组语法分析：分析token流(上面生成的数组)并生成 AST
转换：访问 AST 的节点进行变换操作生产新的 AST

Taro就是利用 babel 完成的小程序语法转换
生成：以新的 AST 为基础生成代码 -->

ast 树上的每一个节点都表示源代码中的一种结构
ast 中的节点都是继承自 Node 节点，Node 节点有 type 和 loc 两个属性，分别代表类型和位置，


1. 词法分析 分词token 形成tokens 【一般tokens是一个扁平化的数组，包含很多token信息】
形成的tokens 形如 
```javascript

//扁平化的数组
[
  {type: 'paren', value: 'xxx'},
  {type: 'name', value: 'xxx'},
  {type: 'number', value: 'xxx'},
  {type: 'number', value: 'xxx'},
  ...
  ]
```

2. 语法分析 形成ast 
ast是将tokens扁平化数组转化为树形结构

```javascript
{
  type: "Program",
  body: [
    {
      type: "Express",
      params: [
        {
          type: "CallFunction",
          name: 'add',
          params: [
            {
            type: "Number",
             value: '11',
            },
            {
            type: "Number",
             value: '11',
            }
          ]
        }
      ]
    }
  ]
}
```

3. 将ast转化为新规则的newAst  [DFS]

4. 将新的newAst转化为正常语句 
递归 switch



# 工作原理描述
  1. babel的工作过程分为三个阶段：parsing(解析)、transforming（转化）、printing（生成）
  2. parsing阶段babel内部的 babylon 负责将es6代码进行语法分析和词法分析后转换成抽象语法树
  3. transforming阶段内部的 babel-traverse 负责对抽象语法树进行变换操作

  printing阶段内部的 babel-generator 负责生成对应的代码
  其中第二步的转化是重中之重，babel的插件机制也是在这一步发挥作用的，plugins在这里进行操作，转化成新的AST，再交给第三步的babel-generator。

# babel将ECMAScript 2015+ 版本的代码分为了两种情况处理:
  语法层： let、const、class、箭头函数等，这些需要在构建时进行转译，是指在语法层面上的转译
  api方法层：Promise、includes、map等，这些是在全局或者Object、Array等的原型上新增的方法，它们可以由相应es5的方式重新定义


@babel/polyfil是由core-js2和regenerator-runtime组成的一个集成包。

