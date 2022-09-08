# webpack_cli 做的哪些事情

## 引入yargs， 对命令行进行定制

## 分析命令行参数 对各个参数进行转化，组成编译配置项

## 引用webpack, 根据配置项进行编译和构建

从NON_COMPLIATION_CMD分析出不需要编译的命令

NON_COMPLIATION_CMD是一个数组， 里面定义了很多不需要编译的命令

```javascript
const NON_COMPLIATION_CMD = [ // 8个命令在命令行输入 并不会实例化webpack，故不需要编译 直接运行
  'init',
  'add',
  'migrate',
  'remove',
  'server',
  'info',
  'generate-loader',
  'generate-plugin'
 ]
```

## 执行CLI结果：
webpack-cli对配置文件和命令行参数进行转换最终生成配置选项参数 options
最终根据配置参数实例化webpack对象【compiler】， 
```javascript
  const compiler = webpack(options) // 调用了webpack.js 其中生成了compiler 将options和默认的参数合并 在compiler上添加了很多属性 包括很多plugin 并返回compiler 
  // 所有的插件都会成为compiler对象上的实例 
  compiler.run()
```
 然后执行构建流程
